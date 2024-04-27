import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Auth0Provider } from "@auth0/auth0-react";

import store from './redux/store';
import App from './App';

import './index.css';

const root = createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
    domain="dev-001dac0wqts4zwvz.us.auth0.com"
    clientId="ZAvYpnkNoxbFA9iI33NnhqakeoqE9ayM"
    authorizationParams={{
      redirect_uri: `${window.location.origin}/login`
    }}
  >
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  </Auth0Provider>
);
