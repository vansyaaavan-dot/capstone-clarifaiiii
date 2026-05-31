import axios from "axios";

const API = axios.create({
  // Ubah port ke 3000 sesuai server.js milikmu
  baseURL: "http://localhost:3000", 
});

// Fungsi untuk melakukan hit ke endpoint prediksi
export const analyzeNews = async (textData) => {
    // Sesuaikan endpoint-nya dengan yang ada di server.js
    const response = await API.post("/api/detect-hoax", { text: textData });
    return response.data; // Mengembalikan hasil olahan backend ke UI React
};

export default API;