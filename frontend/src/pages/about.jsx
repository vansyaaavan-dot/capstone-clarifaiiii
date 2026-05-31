function About() {
  return (
    <div className="px-8 py-12 max-w-5xl mx-auto">

      <h1 className="text-4xl font-bold text-blue-800">
        Tentang ClarifAI
      </h1>

      <p className="mt-6 text-gray-700 leading-8 text-justify">
        ClarifAI merupakan platform deteksi dan analisis hoaks berbasis
        Artificial Intelligence (AI) yang dikembangkan untuk membantu
        masyarakat meningkatkan literasi digital serta memahami
        kebenaran informasi yang beredar di media sosial dan platform
        digital lainnya.
      </p>

      <p className="mt-4 text-gray-700 leading-8 text-justify">
        Proyek ini berfokus pada analisis informasi terkait COVID-19
        menggunakan teknologi Natural Language Processing (NLP) dan
        Explainable AI (XAI). Selain memberikan hasil klasifikasi
        apakah suatu informasi termasuk hoaks atau bukan, sistem juga
        menyajikan penjelasan yang transparan sehingga pengguna dapat
        memahami alasan di balik setiap prediksi yang dihasilkan.
      </p>

      <p className="mt-4 text-gray-700 leading-8 text-justify">
        ClarifAI dikembangkan sebagai bagian dari Capstone Project
        Coding Camp 2026 powered by DBS Foundation dengan tema
        <strong> Inclusive & Resilient Communities</strong>. Melalui
        solusi ini, kami berharap dapat membantu masyarakat menjadi
        lebih kritis, bijak, dan tangguh dalam menghadapi penyebaran
        disinformasi, khususnya hoaks kesehatan yang dapat memengaruhi
        pengambilan keputusan sehari-hari.
      </p>

    </div>
  );
}

export default About;