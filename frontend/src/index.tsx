import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app/app';
import { store } from './store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { fetchWorkouts } from './store/api-actions';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(fetchWorkouts());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <BrowserRouter>
          <App/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
