import { gql } from 'apollo-boost';

// get list all books
const getBooksQuery = gql`{
    books{
      name
      genre
      author {
        name
        age
      }
    }
  }
`

// get list all authors
const getAuthorsQuery = gql`{
    authors{
        name
        id
    }
}  
`
// add book based on authorId
const addBookMutation = gql`
    mutation($name:String!,$genre:String!,$authorId:ID!
        ) {
        addBook(name:$name,genre:$genre,authorId:$authorId){
        name
        id
        }
    }
`

export {getAuthorsQuery, getBooksQuery, addBookMutation};