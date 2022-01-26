import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { FavoriteContextProvider } from "./stores/favorite-context";
import { NavActiveProvider } from "./stores/navactive-context";
import { LoadingContextProvider } from "./stores/getData-context";
import { AuthContextProvider } from "./stores/auth-context";

ReactDOM.render(
  <AuthContextProvider>
    <FavoriteContextProvider>
      <NavActiveProvider>
        <LoadingContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </LoadingContextProvider>
      </NavActiveProvider>
    </FavoriteContextProvider>
  </AuthContextProvider>,
  document.getElementById("root")
);
