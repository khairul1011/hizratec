import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import persist from '../src/redux/store'

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts

import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";
import adduser from "views/admin/adduser";
import Routes from "Routes";

const persistStore = persist();

ReactDOM.render(
  <StoreProvider store={persistStore.store}  >
    <PersistGate loading={null} persistor={persistStore.persistor}>
      <Routes />
    </PersistGate>
  </StoreProvider>,
  document.getElementById("root")
);
