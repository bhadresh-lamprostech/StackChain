import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import "../styles/Navbar/navbar.scss";
const Navbar = ({ setOpenWalletOption }) => {
  const cookie = new Cookies();
  const [address, setAddress] = useState(cookie.get("account"));
  const location = useLocation();

  useEffect(() => {
    const addr = cookie.get("account");
    if (addr) {
      setAddress(addr);
    }
  }, [cookie]);

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  return (
    <>
      <div className="navbar-main">
        <div className="navbar-left">
          <div className="navbar-logo">Ask2Web3</div>
        </div>
        <div className="navbar-middle">
          {/* <div className="searchbar">
            <input type="text" />
          </div> */}
        </div>
        <div className="navbar-right">
          <ul>
            <li className={window.location.pathname === "/" ? "active" : null}>
              <Link to="/">Home</Link>
            </li>
            <li
              className={window.location.pathname === "/info" ? "active" : null}
            >
              <Link to="/info">Crypto News</Link>
            </li>
            {address ? (
              <>
                <li
                  className={
                    window.location.pathname === "/ask-question"
                      ? "active"
                      : null
                  }
                >
                  <Link to="/ask-question">Ask Question</Link>
                </li>
                <li
                  className={
                    window.location.pathname === "/find-question"
                      ? "active"
                      : null
                  }
                >
                  <Link to="/find-question">All Questions</Link>
                </li>
                <li
                  className={
                    window.location.pathname === "/add-article"
                      ? "active"
                      : null
                  }
                >
                  <Link to="/add-article">Add Article</Link>
                </li>
                <li
                  className={
                    window.location.pathname === "/message" ? "active" : null
                  }
                >
                  <Link to="/message">Messages</Link>
                </li>
                <li
                  className={
                    window.location.pathname === "/find-profile"
                      ? "active"
                      : null
                  }
                >
                  <Link to="/find-profile">All Users</Link>
                </li>
                <li
                  className={
                    window.location.pathname === "/profile" ? "active" : null
                  }
                >
                  <Link to="profile">Profile</Link>
                </li>
              </>
            ) : (
              <li>
                <button
                  className="connect-btn"
                  onClick={() => {
                    setOpenWalletOption(true);
                  }}
                >
                  Connect
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
