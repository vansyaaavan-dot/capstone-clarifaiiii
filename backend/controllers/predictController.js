const axios = require("axios");

const predictHoax = async (req, res) => {
    try {
        const { text } = req.body;

        // Validasi input dari frontend
        if (!text) {
            return res.status(400).json({
                message: "Teks wajib diisi"
            });
        }

        // 1. Ambil URL FastAPI dari .env, jika tidak ada pakai default http://127.0.0.1:8000
        // Pastikan endpoint-nya sudah sesuai (misal: '/predict' atau '/' tergantung setup FastAPI-mu)
        const fastapiUrl = process.env.AI_API_URL || "http://127.0.0.1:8000/predict";

        // 2. Request ke AI FastAPI (Mengirimkan teks ke Python)
        const response = await axios.post(fastapiUrl, {
            text: text
        });

        // 3. Ambil data hasil prediksi dari FastAPI
        const aiData = response.data;

        // 4. Kirim data yang sudah diolah ke Frontend
        // CATATAN: Sesuaikan properti 'aiData.prediction', 'aiData.confidence', dll. 
        // dengan key JSON yang dihasilkan oleh return di FastAPI-mu.
        return res.status(200).json({
            status: aiData.prediction === "HOAX" ? "Hoaks" : "Fakta",
            confidence: aiData.confidence, 
            explanation: aiData.explanation || "Analisis berdasarkan model AI service.",
            text,
            date: new Date().toLocaleString("id-ID")
        });

    } catch (error) {
        // Log error di terminal backend untuk mempermudah debugging
        console.error("AI Service Error:", error.message);

        return res.status(500).json({
            message: "Gagal menyambungkan atau memproses data di layanan AI (FastAPI)"
        });
    }
};

module.exports = {
    predictHoax
};