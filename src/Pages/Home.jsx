import React, { useState, useEffect } from "react";
import "../styles/home.scss";
import PostZikrs from "../Components/PostZikrs";

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [zikrData, setZikrData] = useState([]);
  const [newZikrText, setNewZikrText] = useState("");
  const [newZikrCategory, setNewZikrCategory] = useState("");
  const [newZikrMeaning, setNewZikrMeaning] = useState("");
  const [newZikrCount, setNewZikrCount] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch("http://127.0.0.1:8000/api/v1/home/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.error("Failed to fetch user data");
          window.location.href = "/signin";
          return;
        }

        const userData = await response.json();
        setUserData(userData);
      } catch (error) {
        window.location.href = "/signin";
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
    fetchZikrData();
  }, []);

  const fetchZikrData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://127.0.0.1:8000/api/v1/zikrs/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch Zikr data");
        return;
      }

      const zikrData = await response.json();
      setZikrData(zikrData);
    } catch (error) {
      console.error("Error fetching Zikr data:", error);
    }
  };
  const handleCreateZikr = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://127.0.0.1:8000/api/v1/zikrs/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          text: newZikrText,
          category: newZikrCategory,
          meaning: newZikrMeaning,
          count: newZikrCount,
        }),
      });

      if (!response.ok) {
        console.error("Failed to create Zikr");
        return;
      }

      fetchZikrData();

      setNewZikrText("");
      setNewZikrCategory("");
      setNewZikrMeaning("");
      setNewZikrCount("");
    } catch (error) {
      console.error("Error creating Zikr:", error);
    }
  };

  return (
    <main className="home container">
      <div className="zikr-cards">
        {zikrData.map((zikr) => (
          <div className="card" key={zikr.id}>
            <h4 className="zikr-title">{zikr.category}</h4>
            <p className="zikr-text">{zikr.text}</p>
            <div className="zikr-info">
              <p className="zikr-meaning">Meaning</p>
              <p className="zikr-count">{zikr.count}</p>
            </div>
          </div>
        ))}
      </div>
      {/* <PostZikrs /> */}
    </main>
  );
};

export default Home;
