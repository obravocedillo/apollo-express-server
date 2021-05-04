const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        getAllBooks:[Book]
    }
    type Book {
        name: String,
        author: String,
        year: Int
    }
`
const resolvers = {
    Query: {
        getAllBooks: () => { return  ([
            {name:'Book1', author:'Author1', year: 2002},
            {name:'Book2', author:'Author2', year: 2003},
        ]) },
    }
}

const server = new ApolloServer({typeDefs, resolvers})

app = express();
server.applyMiddleware({ app });

app.get('/', function(req,res){
    res.send('Hello');
})

module.exports = app;