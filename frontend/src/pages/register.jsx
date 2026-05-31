import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  createUserWithEmailAndPassword
} from "firebase/auth";

import {
  doc,
  setDoc
} from "firebase/firestore";

import { auth, db } from "../firebase/firebase";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleRegister = async () => {

    try {

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user = userCredential.user;

      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          name,
          email,
          createdAt: new Date()
        }
      );

      alert("Akun berhasil dibuat");

      navigate("/login");

    } catch (error) {

      alert(error.message);

    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Daftar Akun
        </h1>

        <input
          type="text"
          placeholder="Nama Lengkap"
          className="w-full border p-3 rounded mb-4"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-blue-700 text-white py-3 rounded"
        >
          Daftar
        </button>

        <p className="mt-4 text-center">

          Sudah memiliki akun?

          <Link
            to="/login"
            className="text-blue-700 ml-2"
          >
            Login
          </Link>

        </p>

      </div>
    </div>
  );
}

export default Register;