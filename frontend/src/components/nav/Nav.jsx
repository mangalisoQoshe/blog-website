import styles from "./Nav.module.css";
import { NavLink } from "react-router-dom";

//component imports

import { MoonIcon } from "../icons/Icons";
import ActiveLink from "../active-link/ActiveLink";

function Nav({ resetEditedBlog }) {
  const handleClick = () => {
    resetEditedBlog()
  };
  return (
    <div className={styles.nav}>
      <NavLink to="/login" className={styles.link}>
        S. Mathangana
      </NavLink>

      <ActiveLink to="/">Home</ActiveLink>
      <ActiveLink to="/blog">Blog</ActiveLink>
      <div onClick={() => handleClick()}>
        <NavLink to="/create-post" className={styles.link}>
          Create Post
        </NavLink>
      </div>

      <button>
        <MoonIcon />
      </button>
    </div>
  );
}

export default Nav;
