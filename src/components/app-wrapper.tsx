import { ConfigProvider, theme } from "antd";
import { useTheme } from "../contexts/theme-context";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./common/layout";
import HomePage from "../pages/home/home";
import InvoiceDetailPage from "../pages/invoice-detail/invoice-detail";
import LoginPage from "../pages/login/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  { path: "/login", element: <LoginPage /> },
  {
    path: "/invoice/:id",
    element: (
      <Layout>
        <InvoiceDetailPage />
      </Layout>
    ),
  },
]);

export default function AppWrapper() {
  const { isDark } = useTheme();

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
