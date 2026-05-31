import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase";

function ForgotPassword() {

  const [email, setEmail] = useState("");

  const handleReset = async (e) => {

    e.preventDefault();

    try {

      await sendPasswordResetEmail(
        auth,
        email
      );

      alert(
        "Link reset password berhasil dikirim ke email."
      );

    } catch (error) {

      console.error(error);

      alert(error.message);

    }

  };

  return (

    <div className="flex justify-center items-center min-h-[80vh]">

      <div className="bg-white shadow-lg p-8 rounded-2xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          Reset Password
        </h1>

        <form onSubmit={handleReset}>

          <input
            type="email"
            placeholder="Masukkan email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full border p-3 rounded-xl mb-4"
          />

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-3 rounded-xl"
          >
            Kirim Link Reset
          </button>

        </form>

      </div>

    </div>

  );
}

export default ForgotPassword;