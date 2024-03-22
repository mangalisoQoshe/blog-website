import styles from "./Nav.module.css";
import { NavLink } from "react-router-dom";

//component imports

import { MoonIcon } from "../icons/Icons";
import ActiveLink from "../active-link/ActiveLink";
import useAuth from "../../context/authContext/useAuth";

function Nav({ resetEditedBlog }) {
  const { user } = useAuth();
  const handleClick = () => {
    resetEditedBlog();
  };
  return (
    <div className={styles.nav}>
      <NavLink to="/login" className={styles.link}>
        S. Mathangana
      </NavLink>

      <ActiveLink to="/">Home</ActiveLink>
      <ActiveLink to="/blog">Blog</ActiveLink>
      {user ? (
        <div onClick={() => handleClick()}>
          <NavLink to="/create-post" className={styles.link}>
            Create Post
          </NavLink>
        </div>
      ) : (
        null
      )}

      <button>
        <MoonIcon />
      </button>
    </div>
  );
}

export default Nav;
