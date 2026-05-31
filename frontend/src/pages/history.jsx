import { Navigate } from "react-router-dom";
import { useState } from "react";

function History() {

  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate to="/login" />;
  }

  const historyData =
    JSON.parse(localStorage.getItem("analysisHistory")) || [];

  const [search, setSearch] = useState("");

  const [selectedItems, setSelectedItems] = useState([]);

  const [manageMode, setManageMode] = useState(false);

  const filteredHistory = historyData.filter((item) =>
    item.text.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (index) => {

    if (selectedItems.includes(index)) {

      setSelectedItems(
        selectedItems.filter((i) => i !== index)
      );

    } else {

      setSelectedItems([
        ...selectedItems,
        index
      ]);

    }

  };

  const deleteSelected = () => {

    if (selectedItems.length === 0) {
      alert("Pilih riwayat yang ingin dihapus.");
      return;
    }

    const confirmDelete = window.confirm(
      `Hapus ${selectedItems.length} riwayat yang dipilih?`
    );

    if (!confirmDelete) return;

    const newHistory = historyData.filter(
      (_, index) => !selectedItems.includes(index)
    );

    localStorage.setItem(
      "analysisHistory",
      JSON.stringify(newHistory)
    );

    window.location.reload();

  };

  return (

    <div className="px-8 py-12">

      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

          <h1 className="text-4xl font-bold text-blue-800">
            Riwayat Analisis
          </h1>

          <div className="flex gap-3">

            {!manageMode ? (

              <button
                onClick={() => setManageMode(true)}
                className="bg-blue-700 text-white px-5 py-2 rounded-lg hover:bg-blue-800 transition"
              >
                Kelola
              </button>

            ) : (

              <>
                <button
                  onClick={deleteSelected}
                  className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Hapus
                  {selectedItems.length > 0 &&
                    ` (${selectedItems.length})`}
                </button>

                <button
                  onClick={() => {
                    setManageMode(false);
                    setSelectedItems([]);
                  }}
                  className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition"
                >
                  Batal
                </button>
              </>

            )}

          </div>

        </div>

        <div className="mt-6">

          <input
            type="text"
            placeholder="Cari riwayat berdasarkan isi teks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        <p className="mt-4 text-gray-600">
          Ditemukan {filteredHistory.length} riwayat
        </p>

        {filteredHistory.length === 0 ? (

          <div className="mt-8 bg-white p-6 rounded-xl shadow">

            Tidak ada riwayat yang ditemukan.

          </div>

        ) : (

          <div className="mt-8 space-y-4">

            {filteredHistory.map((item, index) => (

              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow border border-gray-100"
              >

                <div className="flex justify-between items-start gap-4">

                  <div className="flex-1">

                    <p className="text-sm text-gray-500">
                      {item.date}
                    </p>

                    <p className="mt-3 text-gray-700 break-words">
                      {item.text}
                    </p>

                    <div className="mt-4">

                      <span
                        className={`font-bold ${
                          item.status === "Hoaks"
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {item.status}
                      </span>

                      <span className="ml-3 text-gray-600">
                        ({item.confidence}%)
                      </span>

                    </div>

                  </div>

                  {manageMode && (

                    <input
                      type="checkbox"
                      checked={selectedItems.includes(index)}
                      onChange={() =>
                        handleSelect(index)
                      }
                      className="w-5 h-5 mt-1"
                    />

                  )}

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );
}

export default History;