import { useNavigate } from "react-router-dom";
import homeImage from "../assets/home.jpg";

function Home() {

  const navigate = useNavigate();

  const handleAnalyze = () => {

    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/login");
      return;
    }

    navigate("/analyze");
  };

  return (
    <div className="px-8 py-16">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        <div>

          <h1 className="text-5xl font-bold text-blue-800 leading-tight">
            Deteksi Hoaks COVID-19 dengan Explainable AI
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            ClarifAI membantu Anda memverifikasi informasi terkait
            COVID-19 menggunakan Artificial Intelligence dan
            Explainable AI. Dapatkan hasil analisis yang akurat
            beserta penjelasan yang mudah dipahami sebelum
            mempercayai atau membagikan informasi.
          </p>

          <button
            onClick={handleAnalyze}
            className="mt-8 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl"
          >
            Mulai Analisis
          </button>

        </div>

        <div>

          <img
            src={homeImage}
            alt="ClarifAI"
            className="w-full max-w-lg mx-auto rounded-3xl shadow-xl"
          />

        </div>

      </div>

    </div>
  );
}

export default Home;