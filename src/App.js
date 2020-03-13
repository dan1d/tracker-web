import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import { Provider } from "react-redux";
import Routes from './components/routes';

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
