import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store';

import {ApolloProvider} from 'react-apollo' // Access to state stored in Apollo
import {createHttpLink} from 'apollo-link-http' // Connet to client (graphql)
import {InMemoryCache} from 'apollo-cache-inmemory' //Cache for performance
import {ApolloClient} from 'apollo-boost' //

import './index.css';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
