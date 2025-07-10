import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LoginPage from "./pages/login.tsx";
import { store } from "./store.ts";
import "@ant-design/v5-patch-for-react-19";
import HomePage from "./pages/home.tsx";
import Layout from "./components/layout.tsx";

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
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
