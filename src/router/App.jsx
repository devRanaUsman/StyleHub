import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "../services/authService";
import { setAuthUser, setAuthLoading } from "../store/authSlice";

import "../App.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Newsletter from "../components/Newsletter";
import SeoFooter from "../components/SeoFooter";


function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await authService.getCurrentUser();
        dispatch(setAuthUser(data.user));
      } catch {
        dispatch(setAuthUser(null));
      } finally {
        dispatch(setAuthLoading(false));
      }
    };
    fetchUser();
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {" "}
      <Header />
      <Outlet />
      {/* <Newsletter /> */}
      <SeoFooter />
      <Footer />
    </>
  );
}

export default App;
