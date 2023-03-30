import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/home";
import { Loading } from "./components/loading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./globals.css";
import "./index.css";
import { VolumeProvider } from "./components/volumeProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Loading>
      <VolumeProvider>
        <Home />
        <ToastContainer />
      </VolumeProvider>
    </Loading>
  </React.StrictMode>
);
