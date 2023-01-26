import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MetamaskProvider } from "./hooks/useMetamask";
import { ProfileProvider } from "./hooks/useProfile";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ProfileProvider>
    <MetamaskProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </MetamaskProvider>
  </ProfileProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
