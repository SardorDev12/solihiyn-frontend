import React, { useEffect, useState } from "react";
import "../styles/editModal.scss";
import { FaWindowClose } from "react-icons/fa";

function EditModal({ setUpdate, zikrId, api, setShowEditModal }) {
  const [editItem, setEditItem] = useState({
    category: "",
    count: 0,
    text: "",
    meaning: "",
  });
  const handleShowEditModal = () => {
    setShowEditModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditItem((prevVal) => {
      return { ...prevVal, [name]: value };
    });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${api}/api/v1/zikrs/update/${zikrId}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editItem),
      });
      if (!response.ok) {
        console.error(`Failed to update Zikr count for ID ${zikrId}`);
        return;
      }

      setUpdate(true);
      setShowEditModal(false);
    } catch (error) {
      console.error(`Error updating Zikr count for ID ${zikrId}:`, error);
    }
  };

  useEffect(() => {
    const handleEdit = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`${api}/api/v1/zikrs/update/${zikrId}/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          console.error(`Failed to update Zikr count for ID ${zikrId}`);
          return;
        }

        const zikrInfo = await response.json();
        setEditItem(zikrInfo);
      } catch (error) {
        console.error(`Error updating Zikr count for ID ${zikrId}:`, error);
      }
    };

    handleEdit();
  }, []);

  return (
    <div className="edit-modal">
      <div className="edit-modal__header">
        <h2 className="modal-title">Edit</h2>
        <FaWindowClose
          className="edit-modal__close"
          onClick={handleShowEditModal}
        />
      </div>
      <form>
        <div className="form-inputs">
          <div className="cat-count">
            <div className="form-input">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                autoComplete="off"
                name="category"
                id="category"
                value={editItem.category}
                placeholder="Zikrlar"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-input">
              <label htmlFor="count">Count</label>
              <input
                type="number"
                name="count"
                id="count"
                autoComplete="off"
                value={editItem.count}
                placeholder="33"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-input">
            <label htmlFor="text">Text</label>
            <textarea
              type="text"
              name="text"
              id="text"
              placeholder="Alhamdulillah"
              value={editItem.text}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-input">
            <label htmlFor="meaning">Meaning</label>
            <textarea
              type="text"
              name="meaning"
              id="meaning"
              placeholder="Allohga hamdlar bo'lsin!"
              value={editItem.meaning}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button className="update-btn" type="button" onClick={handleUpdate}>
          Update
        </button>
      </form>
    </div>
  );
}

export default EditModal;
