const express = require('express');
const axios = require('axios');
const cors = require('cors'); 
const app = express();


app.use(cors()); 

app.use(express.json());

// Jalur Endpoint di Express.js yang akan dipanggil oleh Frontend
app.post('/api/detect-hoax', async (req, res) => {
    try {
        const { text } = req.body;

        // Validasi input data teks kosong
        if (!text) {
            return res.status(400).json({ error: "Teks tidak boleh kosong" });
        }

        const fastApiResponse = await axios.post('https://capstone-clarifaiiii-production.up.railway.app/', {
            text: text
        });

        // Ambil data hasil prediksi dari FastAPI
        const { prediction, confidence, explanation } = fastApiResponse.data;


        return res.json({
            status: prediction === "HOAX" ? "Hoaks" : "Fakta",
            confidence: confidence || 0,  
            explanation: explanation || "Sistem mendeteksi pola bahasa dan kata kunci pada informasi ini.",
            text,
            date: new Date().toLocaleString("id-ID")
        });

    } catch (error) {
        console.error("Gagal terhubung ke FastAPI:", error.message);
        return res.status(500).json({ 
            message: "Gagal memproses data di AI Service (FastAPI)" 
        });
    }
});

// Jalankan server Express di port 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server Express berjalan di port ${PORT}`);
});