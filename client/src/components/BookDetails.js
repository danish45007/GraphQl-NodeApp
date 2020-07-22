import React,{Component} from "react";
import { getBookQuery } from "./queries/queries";
import { graphql } from "react-apollo";

class BooksDetails extends Component {

    DisplayBookDetails() {
        const { book } = this.props.data;
        if(book){
            return(
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All books by this author</p>
                    <ul className='other-books'>
                        {
                            book.author.book.map(item => {
                                return(
                                    <li key={item.id}>{item.name} <strong>{item.genre}</strong></li>
                                )
                            })
                        }
                    </ul>
                </div>
            )
        } else{
            return(
                <div>No Book selected...</div>
            )
        }
    };

    render() {
        return(
            <div id="book-details">
                {this.DisplayBookDetails()}
            </div>
        )
    };
};



// binding query to a component
export default graphql(getBookQuery,{
    options:(props) => {
        return{
            variables:{
                id:props.bookId
            }
        }
    }
})(BooksDetails);