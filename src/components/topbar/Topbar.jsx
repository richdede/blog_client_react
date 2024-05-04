import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./topbar.css";

export default function Topbar({ currentUser }) {
  const PF = "http://localhost:8000";
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/");
    window.location.reload();
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>
      <div className={`topCenter ${mobileMenuOpen ? "hidden" : ""}`}>
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">ABOUT</li>
          <li className="topListItem">CONTACT</li>
          {currentUser && (
            <>
              <li className="topListItem">
                <Link className="link" to="/write">
                  WRITE
                </Link>
              </li>
              <li className="topListItem" onClick={handleLogout}>
                LOGOUT
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="topRight">
        <i className="topSearchIcon fas fa-search"></i>
        {currentUser ? (
          <Link className="link" to="/settings">
            {currentUser.profilePic ? (
              <img
                className="topImg"
                src={PF + currentUser.profilePic}
                alt=""
              />
            ) : (
              <img
                className="topImg"
                src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
              />
            )}
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
      <i className="topMenuIcon fas fa-bars" onClick={toggleMobileMenu}></i>
      </div>
      {mobileMenuOpen && (
        <div className="mobileMenu">
          <ul className="topList mobile">
            <li className="topListItem">
              <Link className="link" to="/">
                HOME
              </Link>
            </li>
            <li className="topListItem">ABOUT</li>
            <li className="topListItem">CONTACT</li>
            {currentUser && (
              <>
                <li className="topListItem">
                  <Link className="link" to="/write">
                    WRITE
                  </Link>
                </li>
                <li className="topListItem" onClick={handleLogout}>
                  LOGOUT
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
