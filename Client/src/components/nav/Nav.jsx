import React, { useState } from "react";
import SearchBar from "../searchBar/SearchBar.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import home from "../../assets/icons/navBar/home.png";
import heart from "../../assets/icons/navBar/heart.png";
import about from "../../assets/icons/navBar/about.png";
import salir from "../../assets/icons/navBar/salir.png";

import logo from "../../assets/logos/Rick-Morty.gif";
import style from "./Nav.module.css";

export default function Nav({ setAuth, onSearch }) {
  const { logout } = useAuth0();

  const [isActive, setIsActive] = useState();

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

  const handleActive = (e) => {
    setIsActive(e);
  };

  return (
    <div className={style.navbar}>
      <Link to="/home" className={style.toHome}>
        <div className={style.logo}>
          <img src={logo} alt="logo"></img>
        </div>
      </Link>
      <div className={style.search}></div>

      <div className={style.directAccess}>
        <Link to="/home">
          <button
            onClick={() => {
              vibrateDevice();
              handleActive(1);
            }}
            className={isActive === 1 ? style.active : ""}
          >
            <img width="28" height="28" src={home} alt="home" />
          </button>
        </Link>

        <Link to="/favorites">
          <button
            onClick={() => {
              vibrateDevice();
              handleActive(2);
            }}
            className={isActive === 2 ? style.active : ""}
          >
            <img width="28" height="28" src={heart} alt="favoritos" />
          </button>
        </Link>

        <Link to="/About">
          <button
            onClick={() => {
              vibrateDevice();
              handleActive(3);
            }}
            className={isActive === 3 ? style.active : ""}
          >
            <img width="28" height="28" src={about} alt="about" />
          </button>
        </Link>

        <button
          onClick={() => {
            vibrateDevice();
            handleActive(4);
            allLogOut();
          }}
          className={isActive === 4 ? style.active : ""}
        >
          <img width="28" height="28" src={salir} alt="salir" />
        </button>
      </div>
    </div>
  );
}
