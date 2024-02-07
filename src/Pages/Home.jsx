import React, { useState, useEffect } from "react";
import "../styles/home.scss";
import { FaWindowClose } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import EditModal from "../Components/EditModal";

const Home = ({ api }) => {
  const [userData, setUserData] = useState(null);
  const [zikrData, setZikrData] = useState([]);
  const [update, setUpdate] = useState(false);

  const [selectedZikrId, setSelectedZikrId] = useState(null);
  const [showMeaningModal, setShowMeaningModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCardId, setEditCardId] = useState(null);

  const handleShowEditModal = (id) => {
    setShowEditModal(!showEditModal);
    setEditCardId(id);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${api}/api/v1/zikrs/delete/${id}/`, {
        method: "DELETE", // Specify the DELETE method
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error(`Failed to delete Zikr with ID ${id}`);
        return;
      }
      window.location.reload();
      // Handle successful deletion, e.g., refresh data
    } catch (error) {
      console.error(`Error deleting Zikr with ID ${id}:`, error);
    }
  };
  const handleCardClick = async (zikrId, e) => {
    try {
      if (
        e.target.tagName !== "path" &&
        !e.target.classList.contains("edit-btn")
      ) {
        const token = localStorage.getItem("authToken");
        const response = await fetch(
          `${api}/api/v1/zikrs/update/${zikrId}/inc/`,
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
      }
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
        const response = await fetch(`${api}/api/v1/home/`, {
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
  }, [update]);

  const fetchZikrData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${api}/api/v1/zikrs/`, {
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
      <div
        className={`overlay ${showMeaningModal || showEditModal ? "show" : ""}`}
      ></div>
      <div className="zikr-cards">
        {zikrData.map((zikr) => (
          <div
            onClick={(e) => handleCardClick(zikr.id, e)}
            className="card"
            key={zikr.id}
          >
            <div className="zikr-header">
              <h4 className="zikr-title">{zikr.category}</h4>
              <div className="zikr-del-upd">
                <MdEditSquare
                  className="edit-btn"
                  onClick={() => handleShowEditModal(zikr.id)}
                />
                <MdDelete
                  onClick={() => handleDelete(zikr.id)}
                  className="del-btn"
                />
              </div>
            </div>
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
      {showEditModal && (
        <EditModal
          api={api}
          setShowEditModal={setShowEditModal}
          zikrId={editCardId}
          setUpdate={setUpdate}
        />
      )}
      {/* <PostZikrs /> */}
    </main>
  );
};

export default Home;
