import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

import App from './App'
import store from './app/store';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Suspense>
      <Provider store={store}>
        <App />
        </Provider>
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
);
