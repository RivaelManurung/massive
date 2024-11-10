import React, { useState } from "react";
import imgprofile from "../assets/images-1.jpg";

function Profile() {
  const [profile, setProfile] = useState({
    name: "Rivael Manurung",
    email: "rivael123@gmail.com",
    gender: "L",
    birthDate: "2004-03-31",
    address: "Pematang Siantar",
    profilePic: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      profilePic: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile saved!");
  };

  return (
    <div className="card w-full max-w-md mx-auto bg-base-100 shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>
      <div className="flex flex-col items-center gap-6">
        <div className="avatar w-24 h-24">
          <img
            src={profile.profilePic ? URL.createObjectURL(profile.profilePic) : imgprofile}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nama</span>
            </label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Jenis Kelamin</span>
            </label>
            <div className="flex items-center gap-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="L"
                  checked={profile.gender === "L"}
                  onChange={handleChange}
                  className="radio"
                />
                <span className="ml-2">L</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="P"
                  checked={profile.gender === "P"}
                  onChange={handleChange}
                  className="radio"
                />
                <span className="ml-2">P</span>
              </label>
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Tanggal Lahir</span>
            </label>
            <input
              type="date"
              name="birthDate"
              value={profile.birthDate}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Alamat</span>
            </label>
            <input
              type="text"
              name="address"
              value={profile.address}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Foto Profile</span>
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="file-input file-input-bordered w-full"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full mt-6">
            SIMPAN
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
