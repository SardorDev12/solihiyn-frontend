import React, { useState } from "react";
import prayingBoy from "../Images/praying boy.png";
import "../styles/add.scss";

function Add({ api }) {
  const [newZikrText, setNewZikrText] = useState("");
  const [newZikrCategory, setNewZikrCategory] = useState("");
  const [newZikrMeaning, setNewZikrMeaning] = useState("");
  const [newZikrCount, setNewZikrCount] = useState("");

  const handleCreateZikr = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${api}/api/v1/zikrs/`, {
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
    <main className="add-page">
      <form className="add-form">
        <h1 className="form-title">Add</h1>
        <div className="form-inputs">
          <div className="cat-count">
            <div className="form-input">
              <label htmlFor="newZikrCategory">Category</label>
              <input
                type="text"
                autoComplete="off"
                id="newZikrCategory"
                placeholder="Zikrlar"
                value={newZikrCategory}
                onChange={(e) => setNewZikrCategory(e.target.value)}
              />
            </div>
            <div className="form-input">
              <label htmlFor="newZikrCount">Count</label>
              <input
                type="number"
                autoComplete="off"
                id="newZikrCount"
                placeholder="33"
                value={newZikrCount}
                onChange={(e) => setNewZikrCount(e.target.value)}
              />
            </div>
          </div>
          <div className="form-input">
            <label htmlFor="newZikrText">Text</label>
            <textarea
              type="text"
              id="newZikrText"
              placeholder="Alhamdulillah"
              value={newZikrText}
              onChange={(e) => setNewZikrText(e.target.value)}
            />
          </div>
          <div className="form-input">
            <label htmlFor="newZikrMeaning">Meaning</label>
            <textarea
              type="text"
              id="newZikrMeaning"
              placeholder="Allohga hamdlar bo'lsin!"
              value={newZikrMeaning}
              onChange={(e) => setNewZikrMeaning(e.target.value)}
            />
          </div>
        </div>
        <button className="add-btn" type="button" onClick={handleCreateZikr}>
          Create Zikr
        </button>
      </form>
      <div className="add-page__img">
        <img src={prayingBoy} alt="praying boy" />
      </div>
    </main>
  );
}

export default Add;
