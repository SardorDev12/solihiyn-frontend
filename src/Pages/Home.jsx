import React, { useState, useEffect } from "react";
import "../styles/home.scss";
import PostZikrs from "../Components/PostZikrs";
import { FaWindowClose } from "react-icons/fa";

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [zikrData, setZikrData] = useState([]);

  const [selectedZikrId, setSelectedZikrId] = useState(null);
  const [showMeaningModal, setShowMeaningModal] = useState(false);

  const handleCardClick = async (zikrId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/zikrs/update/${zikrId}/inc/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        console.error(`Failed to update Zikr count for ID ${zikrId}`);
        return;
      }

      const updatedZikr = await response.json();

      setZikrData((prevZikrData) =>
        prevZikrData.map((zikr) =>
          zikr.id === zikrId
            ? { ...zikr, count_val: updatedZikr.count_val }
            : zikr
        )
      );
    } catch (error) {
      console.error(`Error updating Zikr count for ID ${zikrId}:`, error);
    }
  };

  const handleMeaningClick = (zikrId, event) => {
    event.stopPropagation();
    setSelectedZikrId(zikrId);
    setShowMeaningModal(!showMeaningModal);
  };

  const closeMeaningModal = () => {
    setShowMeaningModal(false);
  };

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

      let zikrData = await response.json();
      setZikrData(zikrData);
    } catch (error) {
      console.error("Error fetching Zikr data:", error);
    }
  };
  

  return (
    <main className="home container">
      <div className={`overlay ${showMeaningModal ? "show" : ""}`}></div>
      <div className="zikr-cards">
        {zikrData.map((zikr) => (
          <div
            onClick={() => handleCardClick(zikr.id)}
            className="card"
            key={zikr.id}
          >
            <h4 className="zikr-title">{zikr.category}</h4>
            <p className="zikr-text">{zikr.text}</p>
            <div className="zikr-info">
              <p
                className="zikr-meaning__link"
                onClick={(event) => handleMeaningClick(zikr.id, event)}
              >
                Meaning
              </p>
              <div
                onClick={(e) => e.stopPropagation()}
                className={`zikr-meaning__modal${
                  selectedZikrId === zikr.id && showMeaningModal ? " show" : ""
                }`}
              >
                <FaWindowClose
                  onClick={closeMeaningModal}
                  className="zikr-meaning__close"
                />
                <p className="zikr-meaning">{zikr.meaning}</p>
              </div>
              <p className="zikr-count">
                {zikr.count_val}/{zikr.count}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* <PostZikrs /> */}
    </main>
  );
};

export default Home;
