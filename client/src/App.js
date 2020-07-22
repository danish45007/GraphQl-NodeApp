import React from 'react';
import BookList from './components/BookList';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo';
import AddBook from './components/AddBook';
// import BooksDetails from './components/BookDetails';

// apollo client 
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
      <h1>Digital Library</h1>
        <BookList  />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
