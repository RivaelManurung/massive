import React, { useState, useEffect } from 'react';
import imgprofile from "../assets/images-1.jpg"; // Placeholder image

function Profile({ userId }) { // Assuming userId is passed as a prop
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    gender: '',
    birthDate: '',
    address: '',
    profilePicture: null,
  });
  
  const [isEditable, setIsEditable] = useState(false); // Track edit mode
  const [loading, setLoading] = useState(true); // Track loading state

  // Simulating fetching user profile data from API
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Simulating an API response (replace with your actual fetch logic)
        const response = await fetch(`/api/getProfile/${userId}`); // Fetch the profile based on user ID
        const data = await response.json();

        setProfileData(data); // Assuming API returns the profile data
      } catch (error) {
        console.error("Error fetching profile data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]);

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData({ ...profileData, profilePicture: URL.createObjectURL(file) });
    }
  };

  // Handle Edit button click
  const handleEditClick = () => {
    setIsEditable(true);
  };

  // Handle Save button click
  const handleSaveClick = async () => {
    setIsEditable(false);

    // Here, send the updated data to your backend API
    try {
      const response = await fetch(`/api/updateProfile/${userId}`, { // Include user ID in URL
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData), // Send updated profile data
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Profile updated successfully', data);
        // Handle successful update (e.g., show a success message)
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading state while fetching data
  }

  return (
    <div className="max-w-4xl mx-auto my-6 p-6 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      <div className="flex items-center gap-6">
        {/* Profile Picture */}
        <div className="avatar">
          <div className="w-24 h-24 ring ring-primary ring-offset-2">
            <img src={profileData.profilePicture || imgprofile} alt="Profile" />
          </div>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col space-y-4 w-full">
          <div className="flex items-center gap-4">
            <label className="text-lg w-1/3">Nama</label>
            <input
              type="text"
              className="input input-bordered w-2/3"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              disabled={!isEditable}
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="text-lg w-1/3">Email</label>
            <input
              type="email"
              className="input input-bordered w-2/3"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              disabled={!isEditable}
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="text-lg w-1/3">Jenis Kelamin</label>
            <div className="flex gap-2">
              <input
                type="radio"
                name="gender"
                value="L"
                checked={profileData.gender === 'L'}
                onChange={() => setProfileData({ ...profileData, gender: 'L' })}
                disabled={!isEditable}
              />
              <label>Laki-laki</label>
              <input
                type="radio"
                name="gender"
                value="P"
                checked={profileData.gender === 'P'}
                onChange={() => setProfileData({ ...profileData, gender: 'P' })}
                disabled={!isEditable}
              />
              <label>Perempuan</label>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="text-lg w-1/3">Tanggal Lahir</label>
            <input
              type="date"
              className="input input-bordered w-2/3"
              value={profileData.birthDate}
              onChange={(e) => setProfileData({ ...profileData, birthDate: e.target.value })}
              disabled={!isEditable}
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="text-lg w-1/3">Alamat</label>
            <input
              type="text"
              className="input input-bordered w-2/3"
              value={profileData.address}
              onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
              disabled={!isEditable}
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="text-lg w-1/3">Foto Profile</label>
            <input
              type="file"
              className="file-input file-input-bordered w-2/3"
              onChange={handleFileChange}
              disabled={!isEditable}
            />
          </div>

          <div className="mt-6">
            {isEditable ? (
              <button className="btn btn-primary w-full" onClick={handleSaveClick}>
                SIMPAN
              </button>
            ) : (
              <button className="btn btn-secondary w-full" onClick={handleEditClick}>
                EDIT
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
