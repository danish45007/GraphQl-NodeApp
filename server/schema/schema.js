const graphql = require('graphql');
const _ = require("lodash");
const { GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const Books = require("../models/book");
const Authors = require("../models/author");
const { findById } = require('../models/book');


// Book Schema
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields:() => ({
        id: {
            type: GraphQLID
        },
        
        name: {
            type: GraphQLString
        },

        genre: {
            type: GraphQLString
        },
        author: {
            type: AuthorType,
            resolve(parent,args){
                console.log(parent)
                // return _.find(authors, {id:parent.authorId});
                return Authors.findById(parent.authorId)
            }
        }
    })
})

// Author Schema
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {
            type: GraphQLID
        },

        name: {
            type: GraphQLString
        },

        age: {
            type: GraphQLString
        },
        book: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                console.log(parent)
                // return _.filter(books, {authorId: parent.id})
                return Books.find({ authorId:parent.id })
            }
        }
    })
})



const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{

        book: {
            type: BookType,
            args: {id:{type:GraphQLID}},
            // resolve func to get data from db/other source
            resolve(parent,args){
                return Books.findById(args.id)

            }
        },

        author: {
            type: AuthorType,
            args: {id:{type:GraphQLID}},
            // resolve func to get data from db/other source
            resolve(parent,args){
                return Authors.findById(args.id)

            }
        },

        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return Books.find({})
            }
        },

        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return Authors.find({})
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                age: {
                    type: new GraphQLNonNull(GraphQLInt)
                },
            },
            resolve(parent, args){
                let author = new Authors({
                    name: args.name,
                    age: args.age
                });
                // saving to db
                return author.save()
            }

        },

        addBook: {
            type: BookType,
            args:{
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                genre: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                authorId: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve(parent, args){
                let book = new Books({
                    name:args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
}
)

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

