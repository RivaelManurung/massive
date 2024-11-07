import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Menyimpan pesan error
  const [successMessage, setSuccessMessage] = useState(""); // Menyimpan pesan sukses
  const navigate = useNavigate(); // Hook untuk navigasi

  // Fungsi untuk handle registrasi
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    setSuccessMessage(""); // Reset success message

    // Validasi form
    if (!name || !email || !password) {
      setError("Semua field harus diisi!");
      return;
    }

    // Validasi email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError("Email tidak valid!");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      // Cek apakah status response OK
      if (response.ok) {
        setSuccessMessage("Registrasi berhasil! Silahkan login.");
        // Setelah berhasil registrasi, langsung arahkan ke dashboard
        setTimeout(() => {
          navigate("/dashboard"); // Arahkan ke halaman dashboard setelah 2 detik
        }, 2000); // Delay 2 detik sebelum navigasi
      } else {
        // Menangani kesalahan spesifik berdasarkan response dari API
        if (data.errors) {
          setError(data.errors.map(err => err.msg).join(", ")); // Jika ada error khusus dari API
        } else {
          setError(data.message || "Terjadi kesalahan, coba lagi.");
        }
      }
    } catch (error) {
      setError("Terjadi kesalahan pada server, coba lagi.");
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-3/4 max-w-4xl rounded-lg shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Bagian Kiri */}
        <div className="bg-green-800 p-10 text-white flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold">Selamat Datang</h1>
          <p className="mt-4 text-center">
            Silahkan masuk dengan akun anda untuk mendapatkan informasi terbaru!
          </p>
        </div>

        {/* Bagian Kanan */}
        <div className="bg-white p-10">
          <h2 className="text-2xl text-center text-black font-bold mb-5">Buat Akun</h2>

          {/* Tampilkan notifikasi sukses */}
          {successMessage && (
            <div className="bg-green-500 text-white p-3 mb-4 rounded">
              {successMessage}
            </div>
          )}

          {/* Tampilkan notifikasi error */}
          {error && (
            <div className="bg-red-500 text-white p-3 mb-4 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister}>
            <div className="form-control mb-4">
              <input
                type="text"
                placeholder="Nama"
                className="input bg-white input-bordered w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
                type="password"
                placeholder="Kata sandi"
                className="input bg-white input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center mb-6">
              <span>Sudah memiliki akun?</span>
              <a href="/login" className="text-green-600">
                Masuk
              </a>
            </div>
            <button type="submit" className="btn btn-success w-full">
              Daftar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
