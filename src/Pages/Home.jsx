// import React, { useEffect, useState } from "react";

// const Home = () => {
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         // Fetch the authentication token from wherever you have stored it (e.g., localStorage)
//         const token = localStorage.getItem("authToken");

//         // Make a request to get the authenticated user data
//         const response = await fetch("http://127.0.0.1:8000/api/v1/home/", {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           // Handle error, e.g., redirect to login page
//           console.error("Failed to fetch user data");
//           window.location.href = "/signin";
//           return;
//         }

//         // Parse the response data
//         const userData = await response.json();

//         // Set the user data in the state
//         setUserData(userData);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     // Invoke the fetchUserData function
//     fetchUserData();
//   }, []); // Empty dependency array means this effect runs once when the component mounts

//   return (
//     <div>
//       <h1>Welcome to the Home Page</h1>
//       <p>Welcome {userData?.response}</p>
//       {userData ? <div></div> : <p>Loading user data...</p>}
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from "react";

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [zikrData, setZikrData] = useState([]);
  const [newZikrText, setNewZikrText] = useState("");
  const [newZikrCategory, setNewZikrCategory] = useState("");
  const [newZikrMeaning, setNewZikrMeaning] = useState("");
  const [newZikrCount, setNewZikrCount] = useState("");

  // Fetch user data
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
        console.error("Error fetching user data:", error);
      }
    };

    // Fetch Zikr data

    // Invoke the fetchUserData and fetchZikrData functions
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

      // Refresh the Zikr data after creating a new one
      fetchZikrData();

      // Clear the form fields
      setNewZikrText("");
      setNewZikrCategory("");
      setNewZikrMeaning("");
      setNewZikrCount("");
    } catch (error) {
      console.error("Error creating Zikr:", error);
    }
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>Welcome {userData?.response}</p>

      {/* Zikr Form */}
      <h2>Create a New Zikr</h2>
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

      {/* Display Zikr List */}
      <h2>Your Zikrs</h2>
      <ul>
        {zikrData.map((zikr) => (
          <li key={zikr.id}>
            {zikr.text} - {zikr.category} - {zikr.meaning} - {zikr.count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
