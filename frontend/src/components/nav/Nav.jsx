import styles from "./Nav.module.css";
import { NavLink } from "react-router-dom";

//component imports

import { MoonIcon } from "../icons/Icons";
import ActiveLink from "../active-link/ActiveLink";

function Nav() {
  return (
    <div className={styles.nav}>
      <NavLink to="/login" activeClassName="active" className={styles.link}>
        S. Mathangana
      </NavLink>

      <ActiveLink to="/">Home</ActiveLink>
      <ActiveLink to="/blog">Blog</ActiveLink>
      <NavLink to="/create-post" className={styles.link}>
        Create Post
      </NavLink>

      <button>
        <MoonIcon />
      </button>
    </div>
  );
}

export default Nav;
