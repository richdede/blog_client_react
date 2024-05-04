import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = JSON.parse(localStorage.getItem("userData"));
      setCurrentUser({ token, ...userData }); 
    }
  }, []);

  const handleUserLogin = (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData));
    setCurrentUser(userData);
  };

  const handleUserLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setCurrentUser(null);
  };

  return (
    <BrowserRouter>
      <Topbar currentUser={currentUser} onUserLogout={handleUserLogout} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/register"
          element={<Register onUserLogin={handleUserLogin} />}
        />
        <Route
          path="/login"
          element={<Login onUserLogin={handleUserLogin} />}
        />
        <Route path="/write" element={<Write />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/post/:postId" element={<Single />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
