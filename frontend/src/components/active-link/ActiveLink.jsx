import { NavLink, useLocation } from "react-router-dom"
import styles from "./ActiveLink.module.css"


function ActiveLink({children,to}) {
    const location = useLocation();
    const match = location.pathname === to;


  return (
    match ? "" :
    <NavLink to={to}  className={styles.link}>
      {children}
    </NavLink>
  
  );
}

export default ActiveLink