import { NavLink, useLocation } from "react-router-dom"
import styles from "./ActiveLink.module.css"
import PropTypes from "prop-types";

function ActiveLink({ children, to, toggleMenu }) {
  const location = useLocation();
  const match = location.pathname === to;

  return match ? (
    ""
  ) : (
    <NavLink to={to} className={styles.link} onClick={() => toggleMenu()}>
      {children}
    </NavLink>
  );
}

ActiveLink.propTypes = {
  children:PropTypes.any.isRequired,
  to:PropTypes.string.isRequired,
  toggleMenu:PropTypes.func.isRequired

}

export default ActiveLink