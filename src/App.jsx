import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Add from "./Pages/Add";
import Edit from "./Pages/Edit";
import Signin from "./Pages/Signin";
import HowToUse from "./Pages/HowToUse";
import Global from "./Pages/Layouts/Global";
import { APIContext } from "./Components/Context";
import { useContext, useEffect, useState } from "react";

function App() {
  const api = useContext(APIContext);

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`${api}/api/v1/home/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);
  if (!userInfo) {
    return <p>Loading</p>;
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Global userInfo={userInfo} />}>
          <Route index element={<Home api={api} />} />
          <Route path="/add" element={<Add api={api} />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/use" element={<HowToUse />} />
        </Route>
        <Route path="/signup" element={<Signup api={api} />} />
        <Route path="/signin" element={<Signin api={api} />} />
      </Routes>
    </Router>
  );
}

export default App;
