import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./store/index.js";
import "./index.css";
import App from "./router/App.jsx";
import HeroPage from "./router/HeroPage.jsx";
import Home from "./router/Home.jsx";
import ItemDetail from "./components/ItemDetail.jsx";
import SectionPage from "./components/SectionPage.jsx";
import AuthPage from "./components/AuthPage.jsx";
import AddItem from "./components/AddItem.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import SellerRoute from "./components/SellerRoute.jsx";
import SellerDashboard from "./components/SellerDashboard.jsx";
import Bag from "./router/Bag.jsx";
import itemService from "./services/itemService.js";
import ErrorFallback from "./components/ErrorFallback.jsx";
import Newsletter from "./components/Newsletter.jsx";
import SearchPage from "./components/SearchPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <><HeroPage /><Newsletter /></>,

      },
      {
        path: "section/:section",
        element: <SectionPage />,
        errorElement: <ErrorFallback />,
        loader: async ({ params }) => {
          const items = await itemService.getSection1(params.section);
          return { items };
        },
      },
      {
        path: "home",
        element: <>
          <Home />
          <Newsletter />
        </>,
        errorElement: <ErrorFallback />,
        loader: async () => {
          const items = await itemService.getItems();
          return { items };
        },
      },
      {
        path: "bag",
        element: <Bag />,
      },
      {
        // New unified auth page
        path: "auth",
        element: <AuthPage />,
      },
      {
        // Legacy alias: /profile → /auth
        path: "profile",
        element: <Navigate to="/auth" replace />,
      },
      {
        // Legacy alias: /signup → /auth?mode=signup
        path: "signup",
        element: <Navigate to="/auth?mode=signup" replace />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "item/:_id",
        element: <ItemDetail />,
      },
      {
        path: "add-item",
        element: (
          <SellerRoute>
            <AddItem />
          </SellerRoute>
        ),
      },
      {
        path: "seller/dashboard",
        element: (
          <SellerRoute>
            <SellerDashboard />
          </SellerRoute>
        ),
      },
      {
        path: "seller/edit-item/:id",
        element: (
          <SellerRoute>
            <AddItem />
          </SellerRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={Store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
