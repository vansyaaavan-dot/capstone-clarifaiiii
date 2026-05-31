import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SplashScreen from "./components/SplashScreen";

import Home from "./pages/Home";
import Analyze from "./pages/Analyze";
import Education from "./pages/Education";
import About from "./pages/About";
import History from "./pages/History";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);

  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <BrowserRouter>

      <div className="min-h-screen flex flex-col bg-slate-50">

        <Navbar />

        <div className="flex-grow">

          <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/analyze" element={<Analyze />} />

            <Route path="/education" element={<Education />} />

            <Route path="/about" element={<About />} />
           
            <Route path="/history" element={<History />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route path="/history" element={<History />} />
            <Route
              path="/forgot-password"
              element={<ForgotPassword />}
            />

          </Routes>

        </div>

        <Footer />

      </div>

    </BrowserRouter>
  );
}

export default App;