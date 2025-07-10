import "@ant-design/v5-patch-for-react-19";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import "./i18n";
import "./index.css";
import { ThemeProvider } from "./contexts/theme-context";
import AppWrapper from "./components/app-wrapper";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider>
      <AppWrapper />
    </ThemeProvider>
  </Provider>
);
