import styles from "./Nav.module.css";
import { NavLink } from "react-router-dom";

//component imports

import { MoonIcon } from "../icons/Icons";
import ActiveLink from "../active-link/ActiveLink";
import useAuth from "../../context/authContext/useAuth";

function Nav() {
  const { currentUser } = useAuth();

  return (
    <div className={styles.nav}>
      <NavLink to="/login" className={styles.link}>
        S. Mathangana
      </NavLink>

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
  );
}

export default Nav;
