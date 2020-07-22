import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';
import { getAuthorsQuery,addBookMutation } from './queries/queries';


class AddBook extends Component {
    constructor(props){
        super(props);
        this.state ={
            name: "",
            genre: "",
            authorId: ""
        }
    }
    // const AuthorData = this.props.data.authors
    getAuthors(){
        // console.log(this.props)
        const AuthorData = this.props.getAuthorsQuery
        // console.log(AuthorData)
        if(AuthorData.loading){
            return(
                <option>
                    loading Authors...
                </option>
            )
        } else{
            return AuthorData.authors.map(author => {
                return(
                    <option 
                    key={author.id}
                    value={author.id}
                    >
                        {author.name}
                    </option>
                )
            })
        }
    }

    // submitForm method
    submitForm(e) {
        e.preventDefault();
        // console.log(this.state)
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            }
        });

    } 
    render(){
        console.log(this.props)
        return(
            <form id="add-book" onSubmit={this.submitForm.bind(this)}>
                <div className="field">
                    <label>Book Name</label>
                    <input type="text" onChange={(e) => this.setState({ name:e.target.value })} placeholder="Book Name" />
                </div>

                <div className="field">
                    <label>Genre</label>
                    <input type="text" onChange={(e) => this.setState({ genre:e.target.value })} placeholder="Genre" />
                </div>

                <div className="field">
                    <label>Author</label>
                        <select onChange={(e) => this.setState({ authorId:e.target.value })}>
                            <option>Select Authors</option>
                            {this.getAuthors()}
                        </select>
                </div>

                <button>+</button>
            </form>
        )
    }
}

export default compose(
    graphql(getAuthorsQuery, {name:"getAuthorsQuery"}),
    graphql(addBookMutation, {name:"addBookMutation"})
)(AddBook)