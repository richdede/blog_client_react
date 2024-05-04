import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import "./settings.css";

export default function Settings() {
  const [userData, setUserData] = useState({
    id: "",
    username: "",
    email: "",
    profilePic: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const userDataFromLocalStorage = localStorage.getItem("userData");
    if (userDataFromLocalStorage) {
      const parsedUserData = JSON.parse(userDataFromLocalStorage);
      setUserData(parsedUserData);
    }
  }, []);

  const PF = "http://localhost:8000";
  const defaultImage =
    "https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500";

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await axios.delete(`http://localhost:8000/api/profile/${userData.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        navigate("/");
        window.location.reload();
        toast.success("Your account has been deleted successfully.");
      } catch (error) {
        console.error("Error deleting account:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Failed to delete account. Please try again later.");
        }
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    toast.info("Update functionality coming soon!");
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete" onClick={handleDelete}>
            Delete Account
          </span>
        </div>
        <form className="settingsForm" onSubmit={handleUpdate}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            {userData.profilePic && userData.profilePic !== "null" ? (
              <img src={PF + userData.profilePic} alt="profile" />
            ) : (
              <img src={defaultImage} alt="profile" />
            )}
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            name="name"
            value={userData.username}
            onChange={(e) =>
              setUserData((prevUserData) => ({
                ...prevUserData,
                username: e.target.value,
              }))
            }
          />
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={(e) =>
              setUserData((prevUserData) => ({
                ...prevUserData,
                email: e.target.value,
              }))
            }
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={(e) =>
              setUserData((prevUserData) => ({
                ...prevUserData,
                password: e.target.value,
              }))
            }
          />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
        </form>
      </div>
      <Sidebar />
      <ToastContainer />
    </div>
  );
}
