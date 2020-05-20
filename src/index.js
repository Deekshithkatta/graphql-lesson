import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store';
// GraphQl
import {ApolloProvider} from 'react-apollo' // Access to state stored in Apollo
import {createHttpLink} from 'apollo-link-http' // Connet to client (graphql)
import {InMemoryCache} from 'apollo-cache-inmemory' //Cache for performance
import {ApolloClient, gql} from 'apollo-boost' // Bundle of smaller libraries, gql function 

import './index.css';
import App from './App';

// Link to GraphQL server
const httpLink = createHttpLink({
  uri: 'https://crwn-clothing.com'
})

//InMemoryCache
const cache = new InMemoryCache()

const client =  new ApolloClient({
  link: httpLink,
  cache
})



client.query({
  query: gql`
  {
    getCollectionsByTitle(title: "hats" ) {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
  `
}).then(response=> console.log(response))


ReactDOM.render(
  <ApolloProvider client={client}>
     <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>,
  </ApolloProvider>,
  document.getElementById('root')
);
