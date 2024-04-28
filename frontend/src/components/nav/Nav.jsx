import styles from "./Nav.module.css";
import { NavLink } from "react-router-dom";

//component imports

import { MoonIcon } from "../icons/Icons";
import ActiveLink from "../active-link/ActiveLink";
import useAuth from "../../context/authContext/useAuth";

import Hamburger from "../hamburger/Hamburger";

function Nav() {
  const { currentUser } = useAuth();

  return (
    <div className={styles.nav}>
      <NavLink to="/login" className={styles.logo}>
        S. Mathangana
      </NavLink>

      <Hamburger>
        <div className={`${styles.stuff}`}>
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
      </Hamburger>
    </div>
  );
}

export default Nav;
