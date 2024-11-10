import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png"; 

function LoginPage({ setIsLoggedIn, setIsAdmin }) {
  const [email, setEmail] = useState(""); // Change name to email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggle visibility
  const navigate = useNavigate();

  // Function for login handling
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) { // Cek jika response status bukan 200 OK
        setError(data.message || "Something went wrong, please try again.");
        return;
      }
  
      // Jika login berhasil, lanjutkan
      localStorage.setItem("token", data.token); // Simpan token
      setIsLoggedIn(true);
      setIsAdmin(data.role === "admin");
  
      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      setError("Something went wrong, please try again.");
      console.error(error); // Tampilkan error di konsol untuk debugging
    }
  };
  
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-11/12 max-w-4xl rounded-lg shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left section */}
        <div style={{ backgroundColor: '#055941' }} className="p-10 text-white flex flex-col items-center justify-center">
          <img src={logo} alt="Logo" className="mb-6 w-48" />
          <h1 className="text-3xl font-bold mb-4">Selamat Datang</h1>
          <p className="text-center">Silahkan masuk dengan akun anda untuk mendapatkan informasi terbaru!</p>
        </div>

        {/* Right section */}
        <div className="bg-white p-10">
          <h2 className="text-2xl text-center text-black font-bold mb-5">Masuk</h2>
          {error && <div className="text-red-600 mb-4">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="form-control mb-4">
              <input
                type="email"
                placeholder="Email"
                className="input bg-white input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control mb-4">
              <input
                type={showPassword ? "text" : "password"} // Toggle visibility
                placeholder="Kata Sandi"
                className="input bg-white input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center mb-4">
              <input 
                type="checkbox" 
                id="showPassword" 
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)} // Toggle visibility
                className="mr-2"
              />
              <label htmlFor="showPassword" className="text-sm text-gray-600">Tampilkan Password</label>
            </div>
            <div className="flex justify-end items-center mb-6 text-sm text-black">
              <span>Belum memiliki akun?</span>
              <a href="/register" className="text-blue-600 ml-1">Daftar</a>
            </div>
            <button type="submit" className="btn btn-success w-full bg-[#16A34A] text-white">
              Masuk
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
