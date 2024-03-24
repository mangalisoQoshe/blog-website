import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../context/authContext/useAuth";
import Spinner from "../spinner/Spinner";

export default function RequireAuth({ children }) {
  const { currentUser, isLoading } = useAuth();
  const location = useLocation();
 

  if (currentUser === null && isLoading) return <Spinner />;

  if (currentUser === null && !isLoading)
    return <Navigate to="/login" replace state={{ path: location.pathname }} />;
  
  return children; //currentUser is authenticated
}
