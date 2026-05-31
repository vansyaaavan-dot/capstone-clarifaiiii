import { Navigate, Link } from "react-router-dom";
import { useState } from "react";
import { analyzeNews } from "../services/api"; // 1. Import fungsi API yang baru dibuat

function Analyze() {
  const user = localStorage.getItem("user");
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false); // State untuk efek loading

  if (!user) {
    return <Navigate to="/login" />;
  }

  // 2. Ubah fungsi menjadi async
  const handleAnalyze = async () => {
    if (!text.trim()) {
      alert("Masukkan teks terlebih dahulu");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      // 3. Panggil API Backend Node.js asli
      const realResult = await analyzeNews(text);

      setResult(realResult);

      // Simpan ke riwayat lokal (localStorage)
      const history = JSON.parse(localStorage.getItem("analysisHistory")) || [];
      history.unshift(realResult);
      localStorage.setItem("analysisHistory", JSON.stringify(history));

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Terjadi kesalahan saat menghubungi server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-800">Analisis Informasi</h1>
        <p className="mt-3 text-gray-600">
          Tempelkan teks berita atau informasi yang ingin dianalisis.
        </p>

        <textarea
          className="mt-6 w-full h-52 border border-gray-300 rounded-2xl p-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Masukkan teks..."
          disabled={loading}
        />

        <div className="flex gap-4 mt-5">
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className={`text-white px-6 py-3 rounded-xl transition ${
              loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800"
            }`}
          >
            {loading ? "Sedang Menganalisis..." : "Analisis Sekarang"}
          </button>

          <Link to="/history">
            <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-300 transition">
              Lihat Riwayat
            </button>
          </Link>
        </div>

        {result && (
          <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg border animate-fadeIn">
            <h2 className="text-2xl font-bold text-blue-700">Hasil Analisis</h2>

            <p className="mt-4">
              <strong>Status:</strong>{" "}
              <span
                className={
                  result.status === "Hoaks" ? "text-red-600 font-semibold" : "text-green-600 font-semibold"
                }
              >
                {result.status}
              </span>
            </p>

            <p className="mt-2">
              <strong>Tingkat Keyakinan:</strong> {result.confidence}%
            </p>

            <div className="mt-4 bg-blue-50 p-4 rounded-xl">
              <h3 className="font-semibold text-blue-900">Penjelasan Explainable AI</h3>
              <p className="mt-2 text-gray-700 leading-relaxed">{result.explanation}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Analyze;