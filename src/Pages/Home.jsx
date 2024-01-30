import React, { useState, useEffect } from "react";
import "../styles/home.scss";
import PostZikrs from "../Components/PostZikrs";
import { FaWindowClose } from "react-icons/fa";

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [zikrData, setZikrData] = useState([]);
  const [newZikrText, setNewZikrText] = useState("");
  const [newZikrCategory, setNewZikrCategory] = useState("");
  const [newZikrMeaning, setNewZikrMeaning] = useState("");
  const [newZikrCount, setNewZikrCount] = useState("");
  const [selectedZikrId, setSelectedZikrId] = useState(null);
  const [showMeaningModal, setShowMeaningModal] = useState(false);

  const handleCardClick = (zikrId) => {
    setZikrData((prevZikrData) =>
      prevZikrData.map((zikr) =>
        zikr.id === zikrId ? { ...zikr, zikrCount: zikr.zikrCount + 1 } : zikr
      )
    );
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
      zikrData = zikrData.map((zikr) => ({ ...zikr, zikrCount: 0 }));
      setZikrData(zikrData);
    } catch (error) {
      console.error("Error fetching Zikr data:", error);
    }
  };
  // const handleCreateZikr = async () => {
  //   try {
  //     const token = localStorage.getItem("authToken");
  //     const response = await fetch("http://127.0.0.1:8000/api/v1/zikrs/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         text: newZikrText,
  //         category: newZikrCategory,
  //         meaning: newZikrMeaning,
  //         count: newZikrCount,
  //       }),
  //     });

  //     if (!response.ok) {
  //       console.error("Failed to create Zikr");
  //       return;
  //     }

  //     fetchZikrData();

  //     setNewZikrText("");
  //     setNewZikrCategory("");
  //     setNewZikrMeaning("");
  //     setNewZikrCount("");
  //   } catch (error) {
  //     console.error("Error creating Zikr:", error);
  //   }
  // };

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
                {zikr.zikrCount}/{zikr.count}
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
