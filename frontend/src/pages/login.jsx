import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  signInWithEmailAndPassword
} from "firebase/auth";

import {
  doc,
  getDoc
} from "firebase/firestore";

import {
  auth,
  db
} from "../firebase/firebase";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();

    if (!email.trim()) {
      alert("Silakan masukkan email.");
      return;
    }

    if (!password.trim()) {
      alert("Silakan masukkan password.");
      return;
    }

    try {

      setLoading(true);

      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user = userCredential.user;

     const userDoc = await getDoc(
  doc(db, "users", user.uid)
);

const userData = userDoc.data();

localStorage.setItem(
  "user",
  JSON.stringify({
    uid: user.uid,
    email: user.email,
    name: userData?.name || "Pengguna"
  })
);

      alert("Login berhasil.");

      navigate("/analyze");

    } catch (error) {

  console.log(error.code);
  console.log(error.message);
  console.error(error);

  switch (error.code) {

    case "auth/user-not-found":
      alert("Email belum terdaftar. Silakan daftar akun terlebih dahulu.");
      break;

    case "auth/invalid-credential":
      alert("Email atau password salah.");
      break;

    case "auth/wrong-password":
      alert("Password yang dimasukkan salah.");
      break;

    case "auth/invalid-email":
      alert("Format email tidak valid.");
      break;

    case "auth/too-many-requests":
      alert("Terlalu banyak percobaan login. Silakan coba lagi beberapa saat.");
      break;

    default:
      alert(`${error.code}\n${error.message}`);
  }

} finally {

      setLoading(false);

    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Login ClarifAI
        </h1>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Masukkan Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 mb-4"
          />

          <input
            type="password"
            placeholder="Masukkan Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 mb-4"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl"
          >
            {loading ? "Memproses..." : "Login"}
          </button>

        </form>

        <div className="mt-5 flex justify-between text-sm">

          <Link
            to="/register"
            className="text-blue-700"
          >
            Daftar Akun
          </Link>

          <Link
            to="/forgot-password"
            className="text-blue-700"
          >
            Lupa Password?
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;