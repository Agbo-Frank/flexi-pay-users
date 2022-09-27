import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import 'react-slideshow-image/dist/styles.css';
import './index.css';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import theme from './config/theme';
import { ThemeProvider } from '@mui/material';
import { CookiesProvider } from 'react-cookie';
import { HelmetProvider } from 'react-helmet-async';

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
