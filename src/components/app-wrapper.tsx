import { ConfigProvider, theme } from "antd";
import { useTheme } from "../contexts/theme-context";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "./common/layout";
import ProtectedRoute from "./common/protected-route";
import HomePage from "../pages/home/home";
import InvoiceDetailPage from "../pages/invoice-detail/invoice-detail";
import LoginPage from "../pages/login/login";
import { initializeAuth } from "../features/auth/authSlice";
import type { AppDispatch } from "../store";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout>
          <HomePage />
        </Layout>
      </ProtectedRoute>
    ),
  },
  { path: "/login", element: <LoginPage /> },
  {
    path: "/invoice/:id",
    element: (
      <ProtectedRoute>
        <Layout>
          <InvoiceDetailPage />
        </Layout>
      </ProtectedRoute>
    ),
  },
]);

export default function AppWrapper() {
  const { isDark } = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}
