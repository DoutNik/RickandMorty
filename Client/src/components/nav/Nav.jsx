import React from "react";
import SearchBar from "../searchBar/SearchBar.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

import logo from "../../assets/logos/Rick-Morty.gif";
import "./Nav.css";

export default function Nav({ setAuth, onSearch }) {
  const { logout } = useAuth0();

  const allLogOut = () => {
    Swal.fire({
      text: "¿Estás seguro que quieres cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6495ed",
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove("token");
        setAuth(false);
        localStorage.setItem("alertShown", "false");
        logout({ returnTo: `${window.location.origin}/login` });
      }
    });
  };

  const vibrateDevice = () => {
    window.navigator?.vibrate?.(20);
  };

  return (
    <div className="navbar">
        <Link to="/home">
          <img src={logo} className="logo" alt="logo"></img>
        </Link>
      <div className="directAccess">
        <ul>
          <li>
            <Link className="text" to="/home">
              Home
            </Link>
          </li>

          <li>
            <Link className="text" to="/About">
              About
            </Link>
          </li>

          <li>
            <Link className="text" to="/favorites">
              Favorites
            </Link>
          </li>

          <li>
            <span className="text">
              <span
                className="logout"
                onClick={() => {
                  allLogOut();
                  vibrateDevice();
                }}
              >
                Logout
              </span>
            </span>
          </li>
        </ul>
      </div>
      <div>
        <SearchBar onSearch={onSearch} />
      </div>
    </div>
  );
}
