import React, { useEffect, useState } from "react";

function PostZikrs() {
  const [newZikrText, setNewZikrText] = useState("");
  const [newZikrCategory, setNewZikrCategory] = useState("");
  const [newZikrMeaning, setNewZikrMeaning] = useState("");
  const [newZikrCount, setNewZikrCount] = useState("");

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

      setNewZikrText("");
      setNewZikrCategory("");
      setNewZikrMeaning("");
      setNewZikrCount("");
    } catch (error) {
      console.error("Error creating Zikr:", error);
    }
    useEffect(() => {
      handleCreateZikr();
    }, []);
  };
  return (
    <form>
      <label htmlFor="newZikrText">Text:</label>
      <input
        type="text"
        id="newZikrText"
        value={newZikrText}
        onChange={(e) => setNewZikrText(e.target.value)}
      />

      <label htmlFor="newZikrCategory">Category:</label>
      <input
        type="text"
        id="newZikrCategory"
        value={newZikrCategory}
        onChange={(e) => setNewZikrCategory(e.target.value)}
      />

      <label htmlFor="newZikrMeaning">Meaning:</label>
      <input
        type="text"
        id="newZikrMeaning"
        value={newZikrMeaning}
        onChange={(e) => setNewZikrMeaning(e.target.value)}
      />

      <label htmlFor="newZikrCount">Count:</label>
      <input
        type="text"
        id="newZikrCount"
        value={newZikrCount}
        onChange={(e) => setNewZikrCount(e.target.value)}
      />

      <button type="button" onClick={handleCreateZikr}>
        Create Zikr
      </button>
    </form>
  );
}

export default PostZikrs;
