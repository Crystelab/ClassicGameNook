// Navbar.jsx
import React, { useEffect } from "react";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import Dropdown from "./Dropdown/Dropdown";
import DropdownItem from "./Dropdown/DropdownItem";

function Navbar() {
  const themes = ["Default", "Dark"];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.body.className = savedTheme;
    }
  }, []);

  const handleThemeChange = (theme) => {
    if (theme === 'Dark') {
      document.body.className = 'dark-theme';
    } else {
      document.body.className = '';
    }
    localStorage.setItem("theme", document.body.className);
  };

  return (
    <div className="navbar">
      <div className="leftSide">
        <Logo className="navbar-logo" />
        <h2>Classic Game Nook</h2>
      </div>
      <div className="rightSide">
        <Link to="/">Games</Link>
        <Link to="/about">About</Link>
        <Dropdown 
          buttonText="Theme" 
          content={
            <>
              {themes.map(theme => (
                <DropdownItem 
                  key={theme} 
                  onClick={() => handleThemeChange(theme)}
                >
                  {theme}
                </DropdownItem>
              ))}
            </>
          }
        />
        <Link to="/login">Log in</Link>
      </div>
    </div>
  );
}

export default Navbar;
