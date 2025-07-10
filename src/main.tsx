import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LoginPage from "./pages/login/login.tsx";
import { store } from "./store.ts";
import "@ant-design/v5-patch-for-react-19";
import HomePage from "./pages/home/home.tsx";
import Layout from "./components/common/layout.tsx";

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
  { path: "/invoice/:id", element: "" },
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
