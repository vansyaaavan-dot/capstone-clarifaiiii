import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {

  const location = useLocation();

  const navigate = useNavigate();

  const user = localStorage.getItem("user");

  const handleLogout = () => {

    localStorage.removeItem("user");

    navigate("/");

    window.location.reload();

  };

  const activeClass =
    "text-blue-700 font-bold relative";

  const normalClass =
    "text-gray-700 hover:text-blue-700 transition";

  return (

    <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center sticky top-0 z-50">

      <h1
        onClick={() => navigate("/")}
        className="text-2xl font-bold text-blue-700 cursor-pointer"
      >
        ClarifAI
      </h1>

      <div className="flex items-center gap-8">

        <Link
          to="/"
          className={
            location.pathname === "/"
              ? activeClass
              : normalClass
          }
        >
          Beranda

          {location.pathname === "/" && (
            <span className="absolute left-0 -bottom-2 h-1 w-full bg-blue-700 rounded-full animate-pulse"></span>
          )}

        </Link>

        {user && (

          <Link
            to="/analyze"
            className={
              location.pathname === "/analyze"
                ? activeClass
                : normalClass
            }
          >
            Analisis

            {location.pathname === "/analyze" && (
              <span className="absolute left-0 -bottom-2 h-1 w-full bg-blue-700 rounded-full animate-pulse"></span>
            )}

          </Link>

        )}

        {user && (

          <Link
            to="/history"
            className={
              location.pathname === "/history"
                ? activeClass
                : normalClass
            }
          >
            Riwayat

            {location.pathname === "/history" && (
              <span className="absolute left-0 -bottom-2 h-1 w-full bg-blue-700 rounded-full animate-pulse"></span>
            )}

          </Link>

        )}

        <Link
          to="/education"
          className={
            location.pathname === "/education"
              ? activeClass
              : normalClass
          }
        >
          Edukasi

          {location.pathname === "/education" && (
            <span className="absolute left-0 -bottom-2 h-1 w-full bg-blue-700 rounded-full animate-pulse"></span>
          )}

        </Link>

        <Link
          to="/about"
          className={
            location.pathname === "/about"
              ? activeClass
              : normalClass
          }
        >
          Tentang

          {location.pathname === "/about" && (
            <span className="absolute left-0 -bottom-2 h-1 w-full bg-blue-700 rounded-full animate-pulse"></span>
          )}

        </Link>

        {!user ? (

          <Link
            to="/login"
            className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-xl transition"
          >
            Login
          </Link>

        ) : (

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition"
          >
            Logout
          </button>

        )}

      </div>

    </nav>

  );
}

export default Navbar;