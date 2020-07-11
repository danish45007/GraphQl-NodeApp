const graphql = require('graphql');
const _ = require("lodash");

const { GraphQLObjectType,GraphQLString,GraphQLSchema } = graphql;

// Book Schema
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields:() => ({
        id: {
            type: GraphQLString
        },
        
        name: {
            type: GraphQLString
        },

        genre: {
            type: GraphQLString
        }
    })
})


// dummy data
var books = [
    {name:"Harry Potter",genre:"Magic",id:"1"},
    {name:"Sex in the city",genre:"Sex",id:"2"},
    {name:"Bob the builder",genre:"Cartoon",id:"3"}
];

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        book: {
            type: BookType,
            args: {id:{type:GraphQLString}},
            // resolve func to get data from db/other source
            resolve(parent,args){
                return _.find(books,{id:args.id});

            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
});
