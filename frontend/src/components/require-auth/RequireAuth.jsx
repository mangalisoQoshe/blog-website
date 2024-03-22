import { Navigate,useLocation } from "react-router-dom";
import useAuth from "../../context/authContext/useAuth";

export default function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation()
  return user ? children : <Navigate to="/login" replace state={{path: location.pathname}}/>;
}
