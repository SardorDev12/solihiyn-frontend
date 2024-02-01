import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Add from "./Pages/Add";
import Edit from "./Pages/Edit";
import Signin from "./Pages/Signin";
import Profile from "./Pages/Profile";
import Global from "./Pages/Layouts/Global";
import { APIContext } from "./Components/Context";
import { useContext } from "react";

function App() {
  const api = useContext(APIContext);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Global api={api} />}>
          <Route index element={<Home api={api} />} />
          <Route path="/add" element={<Add api={api} />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/signup" element={<Signup api={api} />} />
        <Route path="/signin" element={<Signin api={api} />} />
      </Routes>
    </Router>
  );
}

export default App;
