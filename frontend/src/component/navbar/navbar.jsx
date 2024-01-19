import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../../assets/logo.png";
import axios from "../../lib/axios";
import style from "./navbar.module.css";
import "./hamburger.css";

function Navbar() {
  const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
  const [menu_class, setMenuClass] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/getRole")
      .then((response) => setRole(response.data.role));
  }, []);

  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass("burger-bar clicked");
      setMenuClass("menu visible");
    } else {
      setBurgerClass("burger-bar unclicked");
      setMenuClass("menu hidden");
    }
    setIsMenuClicked(!isMenuClicked);
  };

  return (
    <>
      <div className={style.navbar}>
        <div className={style.navbar_container}>
          {role === "regular" && (
            <>
              <Link to="/homepage" className={style.navbar_logo}>
                <img
                  src={logo}
                  alt="logo"
                  style={{ width: "50px", height: "auto" }}
                />
              </Link>
              <Link to="/homepage" className={style.navbar_armanent}>
                ARMANENT DEPOT
              </Link>
            </>
          )}

          {role === "admin" && (
            <>
              <Link to="/admin" className={style.navbar_logo}>
                <img
                  src={logo}
                  alt="logo"
                  style={{ width: "50px", height: "auto" }}
                />
              </Link>
              <Link to="/admin" className={style.navbar_armanent}>
                ARMANENT DEPOT
              </Link>
            </>
          )}

          {role === "guard" && (
            <>
              <Link to="/guard" className={style.navbar_logo}>
                <img
                  src={logo}
                  alt="logo"
                  style={{ width: "50px", height: "auto" }}
                />
              </Link>
              <Link to="/guard" className={style.navbar_armanent}>
                ARMANENT DEPOT
              </Link>
            </>
          )}

          {role === "guard" && (
            <Link to="/profile" className={style.navbar_guard}>
              GUARD
            </Link>
          )}

          {role === "admin" && (
            <Link to="/profile" className={style.navbar_guard}>
              admin
            </Link>
          )}

          {role === "regular" && (
            <Link to="/profile" className={style.navbar_guard}>
              regular
            </Link>
          )}
          <div>
            <nav>
              <div className="burger-menu" onClick={updateMenu}>
                <div className={burger_class}></div>
                <div className={burger_class}></div>
                <div className={burger_class}></div>
              </div>
            </nav>

            <div className={menu_class}>
              {role === "regular" && (
                <Link to="/homepage" className="navbar_slide">
                  HOME
                </Link>
              )}

              {role === "admin" && (
                <Link to="/admin" className="navbar_slide">
                  HOME
                </Link>
              )}

              {role === "guard" && (
                <Link to="/guard" className="navbar_slide">
                  HOME
                </Link>
              )}

              <Link to="/profile" className="navbar_slide">
                PROFILE
              </Link>
              <Link to="/logout" className="navbar_slide">
                LOG OUT
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Navbar;
