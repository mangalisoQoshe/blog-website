import styles from "./Nav.module.css";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

// Component imports
import { MoonIcon, SunIcon } from "../icons/Icons";
import ActiveLink from "../active-link/ActiveLink";
import useAuth from "../../context/authContext/useAuth";
import HamburgerButton from "../hamburger/HamburgerButton";

function Nav() {
  const { currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

useEffect(() => {
  // Check if color scheme preference is saved in localStorage
  const storedColorScheme = localStorage.getItem("colorScheme");
  if (storedColorScheme) {
    setIsDarkMode(storedColorScheme === "dark");
  } else {
    // If no preference found, check prefers-color-scheme
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(prefersDarkMode);
  }
}, []);


  useEffect(() => {
    // Update color scheme preference in localStorage
    localStorage.setItem("colorScheme", isDarkMode ? "dark" : "light");
    // Set the color-scheme attribute dynamically
    document.documentElement.setAttribute(
      "color-scheme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);

  const toggleMenu = () => {
    setIsOpen((open) => !open);
  };

  const handleBtnClick = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={styles.nav}>
      <div style={{ marginRight: "auto" }}>
        <NavLink to="/login" className={styles.logo}>
          S. Mathangana
        </NavLink>
      </div>

      <div className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
        <ActiveLink toggleMenu={toggleMenu} to="/">
          Home
        </ActiveLink>
        <ActiveLink toggleMenu={toggleMenu} to="/blog">
          Blog
        </ActiveLink>
        {currentUser ? (
          <NavLink
            to="/create-blog"
            className={styles.link}
            onClick={toggleMenu}
          >
            Create Blog
          </NavLink>
        ) : null}
        <button className={styles["color-mode-btn"]} onClick={handleBtnClick}>
          {isDarkMode ? <MoonIcon /> : <SunIcon />}
        </button>
      </div>
      <HamburgerButton isOpen={isOpen} toggleMenu={toggleMenu} />
    </div>
  );
}

export default Nav;
