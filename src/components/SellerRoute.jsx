import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "./Loader";

const SellerRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/profile" state={{ from: location }} replace />;
  }

  if (user?.role !== "seller") {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default SellerRoute;
