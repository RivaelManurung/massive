import React from "react";
import editIcon from "../../assets/edit.png";
import deleteIcon from "../../assets/delete.png";

const AdminForum = () => {
    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            {/* Header */}
            <div
                style={{
                    width: "100%", // Lebar penuh tabel
                    maxWidth: "1150px", // Batas ukuran maksimum tabel
                    backgroundColor: "#055941",
                    color: "#fff",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "auto", // Memindahkan elemen ke sebelah kanan
                }}
            >
                <h2 style={{ margin: 0, fontSize: "22px" }}>Forum</h2> {/* Ukuran font diperbesar menjadi 22px */}
            </div>

            {/* Search */}
            <div style={{ margin: "20px 0", display: "flex", justifyContent: "flex-end" }}>
            <div style={{ position: "relative", width: "250px" /* Lebar disesuaikan */ }}>
                <input
                type="text"
                placeholder="" // Kosongkan placeholder
                style={{
                    width: "100%",
                    height: "45px", // Tinggi lebih ramping
                    padding: "10px 15px 10px 45px", // Tambahkan ruang untuk ikon
                    borderRadius: "25px", // Lebih melengkung
                    border: "2px solid #000", // Warna border hitam
                    fontSize: "16px",
                    outline: "none",
                    color: "#333",
                    backgroundColor: "#fff", // Pastikan background tetap putih
                }}
                />
                <span
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "15px", // Posisi kiri untuk ikon
                    transform: "translateY(-50%)",
                    color: "#000", // Warna ikon hitam
                }}
                >
                <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    style={{ width: "20px", height: "20px", color: "#000" }} // Pastikan warna hitam
                >
                    <path
                    fillRule="evenodd"
                    d="M12.9 14.32a8 8 0 111.42-1.42l3.85 3.86a1 1 0 11-1.42 1.42l-3.85-3.86zM8 14a6 6 0 100-12 6 6 0 000 12z"
                    clipRule="evenodd"
                    />
                </svg>
                </span>
            </div>
            </div>

            {/* Tabel */}
            <table
                style={{
                    width: "100%", // Lebar penuh tabel
                    maxWidth: "1150px", // Batas ukuran maksimum tabel
                    borderCollapse: "collapse",
                    backgroundColor: "#fff",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    overflow: "hidden",
                    margin: "20px 0", // Menempatkan tabel di kiri tanpa margin auto
                }}
            >
                <thead>
                    <tr style={{ backgroundColor: "#055941", color: "#fff" }}>
                        <th style={{ padding: "10px", textAlign: "left", color: "#fff" }}>No</th>
                        <th style={{ padding: "10px", textAlign: "left", color: "#fff" }}>Nama</th>
                        <th style={{ padding: "10px", textAlign: "left", color: "#fff" }}>Topik Diskusi</th>
                        <th style={{ padding: "10px", textAlign: "left", color: "#fff" }}>Isi</th>
                        <th style={{ padding: "10px", textAlign: "center", color: "#fff" }}>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {[1, 2, 3].map((item, index) => (
                        <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
                            <td style={{ padding: "10px", color: "#000" }}>{item}</td>
                            <td style={{ padding: "10px", color: "#000" }}>
                                {item === 1 ? "Teknik Budidaya Padi" : item === 2 ? "Nita" : "Rivael"}
                            </td>
                            <td style={{ padding: "10px", color: "#000" }}>Lorem ipsum dolor sit amet.</td>
                            <td style={{ padding: "10px", color: "#000" }}>Lorem ipsum dolor sit amet.</td>
                            <td
                                style={{
                                    padding: "10px",
                                    textAlign: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: "10px",
                                }}
                            >
                                <button>
                                    <img src={editIcon} alt="Edit" style={{ width: "24px", height: "24px" }} />
                                </button>
                                <button>
                                    <img src={deleteIcon} alt="Delete" style={{ width: "24px", height: "24px" }} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminForum;
