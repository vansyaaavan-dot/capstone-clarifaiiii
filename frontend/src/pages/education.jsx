function Education() {

  const news = [

    {
      title: "Waspada Varian Baru COVID-19",
      image:
        "https://i.ytimg.com/vi/Z2tbklAvCTQ/maxresdefault.jpg",
      link:
        "https://www.youtube.com/watch?v=Z2tbklAvCTQ"
    },

    {
      title: "Pemerintah Tingkatkan Kewaspadaan COVID-19",
      image:
        "https://i.ytimg.com/vi/J2Kibw2O3rg/maxresdefault.jpg",
      link:
        "https://www.youtube.com/watch?v=J2Kibw2O3rg"
    },

    {
      title: "Pentingnya Verifikasi Informasi Kesehatan",
      image:
        "https://images.unsplash.com/photo-1584515933487-779824d29309",
      link:
        "https://www.kemkes.go.id"
    },

    {
      title: "Kenali Hoaks Kesehatan di Media Sosial",
      image:
        "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144",
      link:
        "https://cekfakta.tempo.co"
    },

    {
      title: "Tips Mengenali Informasi Palsu COVID-19",
      image:
        "https://images.unsplash.com/photo-1600959907703-125ba1374a12",
      link:
        "https://covid19.go.id"
    },

    {
      title: "Cara Memastikan Informasi Medis Valid",
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
      link:
        "https://www.kemkes.go.id"
    },

    {
      title: "Literasi Digital untuk Mencegah Hoaks",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
      link:
        "https://literasidigital.id"
    },

    {
      title: "Pentingnya Cek Fakta Sebelum Membagikan Informasi",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
      link:
        "https://cekfakta.com"
    },

    {
      title: "Masyarakat Diminta Tetap Waspada COVID-19",
      image:
        "https://images.unsplash.com/photo-1584118624012-df056829fbd0",
      link:
        "https://www.kemkes.go.id"
    }

  ];

  return (

    <div className="px-8 py-12">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-blue-800">
          Edukasi & Fakta COVID-19
        </h1>

        <p className="mt-4 text-gray-600 max-w-3xl">
          Kumpulan berita fakta, klarifikasi hoaks,
          dan informasi kesehatan COVID-19 dari
          media serta sumber terpercaya Indonesia.
          Klik berita untuk membaca informasi lengkap.
        </p>

        <div className="mt-10 grid md:grid-cols-3 gap-8">

          {news.map((item, index) => (

            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
            >

              <img
                src={item.image}
                alt={item.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-5">

                <h2 className="font-semibold text-gray-800 leading-7">
                  {item.title}
                </h2>

              </div>

            </a>

          ))}

        </div>

      </div>

    </div>

  );
}

export default Education;