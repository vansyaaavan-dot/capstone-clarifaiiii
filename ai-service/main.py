from fastapi import FastAPI
from pydantic import BaseModel
import json
import tensorflow as tf
import numpy as np
import re
from nltk.corpus import stopwords
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.preprocessing.text import tokenizer_from_json, Tokenizer

# =========================
# FASTAPI
# =========================
app = FastAPI()

MAX_LENGTH = 100

# =========================
# CLEANING
# =========================
stop_words = set(stopwords.words('english'))

def clean_text(text):
    text = text.lower()
    text = re.sub(r'http\S+|www\S+', '', text)
    text = re.sub(r'@\w+|#\w+', '', text)
    text = re.sub(r'[^a-z\s]', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    tokens = text.split()
    tokens = [w for w in tokens if w not in stop_words]
    return ' '.join(tokens)

# =========================
# CUSTOM ATTENTION LAYER
# =========================
@tf.keras.utils.register_keras_serializable()
class AttentionLayer(tf.keras.layers.Layer):
    def __init__(self, **kwargs):
        super(AttentionLayer, self).__init__(**kwargs)

    def build(self, input_shape):
        self.W = self.add_weight(
            name='attention_weight',
            shape=(input_shape[-1], 1),
            initializer='random_normal',
            trainable=True
        )
        self.b = self.add_weight(
            name='attention_bias',
            shape=(input_shape[1], 1),
            initializer='zeros',
            trainable=True
        )
        super(AttentionLayer, self).build(input_shape)

    def call(self, x):
        e = tf.keras.backend.tanh(tf.keras.backend.dot(x, self.W) + self.b)
        a = tf.keras.backend.softmax(e, axis=1)
        output = x * a
        return tf.keras.backend.sum(output, axis=1), a

# =========================
# LOAD MODEL (SUDAH BERSIH)
# =========================
model = tf.keras.models.load_model(
    "hoax_detector_xai.keras",
    custom_objects={"AttentionLayer": AttentionLayer}
)

# =========================
# LOAD TOKENIZER ASLI
# =========================
try:
    with open('tokenizer.json', 'r', encoding='utf-8') as f:
        tokenizer_data = json.load(f)
    tokenizer = tokenizer_from_json(tokenizer_data)
    print("✅ Tokenizer asli berhasil dimuat!")
except Exception as e:
    print(f"⚠️ Gagal memuat tokenizer asli, menggunakan dummy. Error: {e}")
    tokenizer = Tokenizer(num_words=10000, oov_token="<unk>")

class TextRequest(BaseModel):
    text: str

@app.get("/")
def home():
    return {"message": "AI Service Running"}

@app.post("/predict")
def predict(data: TextRequest):
    cleaned = clean_text(data.text)
    seq = tokenizer.texts_to_sequences([cleaned])
    padded = pad_sequences(seq, maxlen=MAX_LENGTH, padding='post', truncating='post')

    outputs = model.predict(padded)
    
    # Antisipasi jika output berbentuk list [pred, att_weights] akibat inference_model
    if isinstance(outputs, list):
        prediction_val = outputs[0]
    else:
        prediction_val = outputs

    confidence = float(prediction_val[0][0])
    label = "REAL" if confidence > 0.5 else "HOAX"

    return {
        "prediction": label,
        "confidence": confidence
    }
