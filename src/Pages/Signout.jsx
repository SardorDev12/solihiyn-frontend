import { useContext } from "react";
import { APIContext } from "../Components/Context";

const Logout = () => {
  const api = useContext(APIContext);
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${api}/api/v1/logout/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log("Logout successful");
        localStorage.removeItem("authToken");
        window.location.href = "/signin";
      } else {
        console.log("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
      <button className="logout-btn" type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
