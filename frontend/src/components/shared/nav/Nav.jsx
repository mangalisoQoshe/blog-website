import styles from "./Nav.module.css";
import { NavLink } from "react-router-dom";

//component imports

import { MoonIcon } from "../icons/Icons";

function Nav() {
  return (
    <div className={styles.nav}>
      <NavLink to="/" activeClassName="active" className={styles.link}>
        S. Mathangana
      </NavLink>

      <NavLink to="/blog" activeClassName="active" className={styles.link}>
        Blog
      </NavLink>
      <button>
        <MoonIcon />
      </button>
    </div>
  );
}

export default Nav;
