const express = require('express');
const axios = require('axios');
const cors = require('cors'); // 1. Tambahkan cors
const app = express();

// Middleware wajib agar tidak diblokir oleh browser (CORS)
app.use(cors()); 

// Middleware wajib agar Express bisa membaca JSON dari Frontend
app.use(express.json());

// Jalur Endpoint di Express.js yang akan dipanggil oleh Frontend
app.post('/api/detect-hoax', async (req, res) => {
    try {
        const { text } = req.body;

        // Validasi input data teks kosong
        if (!text) {
            return res.status(400).json({ error: "Teks tidak boleh kosong" });
        }

        // Tembak langsung ke server FastAPI Anda (Menggunakan localhost:8000/predict)
        const fastApiResponse = await axios.post('http://localhost:8000/predict', {
            text: text
        });

        // Ambil data hasil prediksi dari FastAPI
        const { prediction, confidence, explanation } = fastApiResponse.data;

        // Kirimkan balik hasilnya ke Frontend dengan format yang seragam
        return res.json({
            status: prediction === "HOAX" ? "Hoaks" : "Fakta", // Kita seragamkan ke teks "Hoaks" / "Fakta"
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
app.listen(3000, () => {
    console.log('Server Express berjalan di http://localhost:3000');
});