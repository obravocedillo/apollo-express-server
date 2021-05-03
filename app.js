const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        hello:String
    }
`
const resolvers = {
    Query: {
        hello: () => { return  'Hello from apolo' },
    }
}

const server = new ApolloServer({typeDefs, resolvers})

app = express();
server.applyMiddleware({ app });

app.get('/', function(req,res){
    res.send('Hello');
})

module.exports = app;