import ReactDOM from "react-dom/client";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./i18n";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [new BrowserTracing()],
  environment: process.env.NODE_ENV,
  tracesSampleRate: parseFloat(
    process.env.REACT_APP_SENTRY_TRACES_SAMPLE_RATE || "0",
  ),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <App />
    <ToastContainer
      position="bottom-right"
      hideProgressBar={true}
      closeOnClick={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      transition={Bounce}
    />
  </>,
);

reportWebVitals();
