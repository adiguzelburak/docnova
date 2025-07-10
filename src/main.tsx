import "@ant-design/v5-patch-for-react-19";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/common/layout.tsx";
import "./index.css";
import HomePage from "./pages/home/home.tsx";
import InvoiceDetailPage from "./pages/invoice-detail/invoice-detail.tsx";
import LoginPage from "./pages/login/login.tsx";
import { store } from "./store.ts";

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

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
