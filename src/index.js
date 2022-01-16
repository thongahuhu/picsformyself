import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { FavoriteContextProvider } from "./stores/favorite-context";
import { NavActiveProvider } from "./stores/navactive-context";
import { LoadingContextProvider } from "./stores/getData-context";

ReactDOM.render(
  <FavoriteContextProvider>
    <NavActiveProvider>
      <LoadingContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LoadingContextProvider>
    </NavActiveProvider>
  </FavoriteContextProvider>,
  document.getElementById("root")
);
