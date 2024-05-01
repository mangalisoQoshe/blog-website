import styles from "./Nav.module.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";

//component imports

import { MoonIcon } from "../icons/Icons";
import ActiveLink from "../active-link/ActiveLink";
import useAuth from "../../context/authContext/useAuth";
import HamburgerButton from "../hamburger/HamburgerButton";

function Nav() {
  const { currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((open) => !open);
  };

  return (
    <div className={styles.nav}>
      <NavLink to="/login" className={styles.logo}>
        S. Mathangana
      </NavLink>

      <div className={`${styles.menu}${isOpen ? "open" : ""}`}>
        <ActiveLink to="/">Home</ActiveLink>
        <ActiveLink to="/blog">Blog</ActiveLink>
        {currentUser ? (
          <NavLink to="/create-blog" className={styles.link}>
            Create Blog
          </NavLink>
        ) : null}

        <button>
          <MoonIcon />
        </button>
      </div>
      <HamburgerButton isOpen={isOpen} toggleMenu={toggleMenu} />
    </div>
  );
}

export default Nav;
