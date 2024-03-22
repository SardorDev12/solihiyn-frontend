import React, { useState, useRef, useEffect } from "react";
import "../styles/home.scss";
import { FaWindowClose } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import EditModal from "../Components/EditModal";
import { GrPowerReset } from "react-icons/gr";
import { CiMenuKebab } from "react-icons/ci";

const Home = ({ api }) => {
  const [userData, setUserData] = useState(null);
  const [zikrData, setZikrData] = useState([]);
  const [update, setUpdate] = useState(false);

  const [selectedZikrId, setSelectedZikrId] = useState(null);
  const [showMeaningModal, setShowMeaningModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCardId, setEditCardId] = useState(null);
  const [showCardMenu, setShowCardMenu] = useState(true);
  const cardMenuRef = useRef(null);

  const handleShowCardMenu = (zikrId) => {
    setShowCardMenu((prevState) => ({
      [zikrId]: !prevState[zikrId],
    }));
  };

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (!e.target.classList.contains("card-menu__icon")) {
        setShowCardMenu(false);
      }
    });
  }, []);

  const handleShowEditModal = (id, e) => {
    e.stopPropagation();
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
    } catch (error) {
      console.error(`Error deleting Zikr with ID ${id}:`, error);
    }
  };
  const handleCardClick = async (zikrId, e) => {
    try {
      if (
        e.target.tagName !== "path" &&
        !e.target.classList.contains("edit-btn") &&
        !e.target.classList.contains("reset-btn") &&
        !e.target.classList.contains("card-menu__icon") &&
        !e.target.classList.contains("card-menu__item")
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

  const handleReset = async (zikrId, e) => {
    e.stopPropagation();
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${api}/api/v1/zikrs/update/${zikrId}/reset/`,
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
      window.location.reload();
    } catch (error) {}
  };

  const handleMeaningClick = (zikrId, e) => {
    e.stopPropagation();

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
              <CiMenuKebab
                onClick={() => handleShowCardMenu(zikr.id)}
                className="card-menu__icon"
              />
              {showCardMenu[zikr.id] ? (
                <div className="card-menu">
                  <div
                    className="card-menu__item edit-icon"
                    onClick={(e) => handleShowEditModal(zikr.id, e)}
                  >
                    <MdEditSquare className="card-menu__icon" />
                    <span>Update</span>
                  </div>
                  <div
                    className="card-menu__item"
                    onClick={(e) => handleReset(zikr.id, e)}
                  >
                    <GrPowerReset className="card-menu__icon" />
                    <span>Reset</span>
                  </div>
                  <div
                    className="card-menu__item"
                    onClick={() => handleDelete(zikr.id)}
                  >
                    <MdDelete className="card-menu__icon" />
                    <span>Delete</span>
                  </div>
                </div>
              ) : (
                ""
              )}
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
