import React, {Component} from 'react';
import BookList from './components/BookList';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo';
// apollo client 
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});


function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <BookList />
      </div>
    </ApolloProvider>
  );
}

export default App;
