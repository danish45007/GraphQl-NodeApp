import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from './queries/queries';

// binding query to component
class BookList extends Component {
    displayBooks(){
        const data = this.props.data
        if(data.loading){
            return(
                <div>
                    Loading Books.... 
                </div>
            )
        } else{
            return data.books.map((book,index) => {
                return (
                    <li key={index}>
                        {book.name}
                    </li>
                );
            })
        }
    }
    render() {
        // console.log(this.props)
        return (
            <div>
                <ul id="book-list">
                    {this.displayBooks()}
                </ul>
            </div>

        )
    }
}

export default graphql(getBooksQuery)(BookList);
