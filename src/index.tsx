import React from 'react';
import ReactDOM from 'react-dom';
import RootRoute from './routes/rootRoute';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux';
import { store } from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider {...{store}} >
      <RootRoute />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
