import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { VisibilityContextProvider } from "./context/visibilityContext.tsx";
import { PatientContextProvider } from "./context/PatientContext.tsx";
import { NotificationContextProvider } from "./context/NotificationContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <NotificationContextProvider>
      <VisibilityContextProvider>
        <PatientContextProvider>
          <App />
        </PatientContextProvider>
      </VisibilityContextProvider>
    </NotificationContextProvider>
  </BrowserRouter>
);
