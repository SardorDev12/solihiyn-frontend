import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Add from "./Pages/Add";
import Edit from "./Pages/Edit";
import Signin from "./Pages/Signin";
import Profile from "./Pages/Profile";
import Global from "./Pages/Layouts/Global";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Global />}>
          <Route index element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </Router>
  );
}

export default App;
