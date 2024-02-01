import { Outlet } from "react-router-dom";
import Header from "../../Components/Header";
import { useEffect, useState } from "react";

function GlobalLayout({ api }) {
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
    <div>
      <Header userInfo={userInfo} />
      <Outlet />
    </div>
  );
}

export default GlobalLayout;
