import React, { useState } from "react";
import "../styles/profile.scss";

function Profile({ userInfo, api }) {
  const [formData, setFormData] = useState({
    firstName: userInfo.first_name,
    lastName: userInfo.last_name,
    profilePhoto: null,
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      profilePhoto: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("first_name", formData.firstName);
    formDataToSend.append("last_name", formData.lastName);
    formDataToSend.append("profile_photo", formData.profilePhoto);

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${api}/api/v1/profile/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formDataToSend),
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="profile-page">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
        <input type="file" name="profilePhoto" onChange={handleImageChange} />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default Profile;
