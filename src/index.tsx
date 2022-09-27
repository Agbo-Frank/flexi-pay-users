import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import theme from './config/theme';
import { ThemeProvider } from '@mui/material';
import { CookiesProvider } from 'react-cookie';
import { HelmetProvider } from 'react-helmet-async';
import * as serviceWorkerRegistration from './serviceWorkerRegistration.';

ReactDOM.hydrate(
  (
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CookiesProvider>
              <HelmetProvider>
                < App />
              </HelmetProvider>
            </CookiesProvider>
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  ),
  document.getElementById('root') as HTMLElement
);

serviceWorkerRegistration.register();

