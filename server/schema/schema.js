const graphql = require('graphql');
const _ = require("lodash");
const { GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList 
} = graphql;

const Books = require("../models/book");
const Authors = require("../models/author")


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
                return _.find(authors, {id:parent.authorId});
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
                return _.filter(books, {authorId: parent.id})
            }
        }
    })
})


// // dummy data
// var books = [
//     {name:"Harry Potter",genre:"Magic",id:"1",authorId:"1"},
//     {name:"Rock Star",genre:"Music",id:"1",authorId:"1"},
//     {name:"Tedd",genre:"Comdy",id:"1",authorId:"1"},
//     {name:"Silicon Valley",genre:"Tech",id:"1",authorId:"1"},
//     {name:"Sex in the city",genre:"Sex",id:"2",authorId:"2"},
//     {name:"Bob the builder",genre:"Cartoon",id:"3",authorId:"3"},
//     {name:"ScoobyDooBeDOO",genre:"Animation",id:"4",authorId:"4"},
// ];

// var authors = [
//     {name:"Danish",age:20,id:"1",bookId:"1"},
//     {name:"Madhav",age:17,id:"2",bookId:"2"},
//     {name:"Umang",age:50,id:"3",bookId:"3"},
//     {name:"Anish",age:1,id:"4",bookId:"4"},

// ];





const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{

        book: {
            type: BookType,
            args: {id:{type:GraphQLID}},
            // resolve func to get data from db/other source
            resolve(parent,args){
                return _.find(books,{id:args.id});

            }
        },

        author: {
            type: AuthorType,
            args: {id:{type:GraphQLID}},
            // resolve func to get data from db/other source
            resolve(parent,args){
                return _.find(authors,{id:args.id});

            }
        },

        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return books
            }
        },

        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return authors
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
                    type: GraphQLString
                },
                age: {
                    type: GraphQLInt
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
    }
}
)

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

