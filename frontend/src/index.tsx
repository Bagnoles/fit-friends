import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app/app';
import { store } from './store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkAuthorization, fetchFriends, fetchUsers, fetchWorkouts, refreshTokens } from './store/api-actions';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(fetchWorkouts());
store.dispatch(checkAuthorization()).then((response) => {
  if (response.meta.requestStatus === 'rejected') {
    store.dispatch(refreshTokens()).then(() => {
      store.dispatch(checkAuthorization());
    })
  }
});
store.dispatch(fetchUsers());
store.dispatch(fetchFriends());

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
