const express = require('express');
const connection = require('./db');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        getAllBooks:[Book]
        getAllUsers: [User]
    }
    type Book {
        name: String
        author: String
        year: Int
    }
    type User {
        user_id: Int
        email: String
        first_name: String
        last_name: String
    }
`

const resolvers = {
    Query: {
        getAllBooks: () => { return  ([
            {name:'Book1', author:'Author1', year: 2002},
            {name:'Book2', author:'Author2', year: 2003},
        ]) },
        getAllUsers: () => {
            return new Promise((resolve)=>{
                connection.query("SELECT * FROM USER",(error, results, fields) => {
                    if(error){
                        console.log(error);
                        resolve ([]);
                    }
                    let allUsers = [];
                    for(const row of results){
                        allUsers.push({user_id:row.user_id, email: row.email, first_name: row.first_name, last_name:row.last_name});
                    }
                    resolve (allUsers);
                })
            })
        }
    }
}

const server = new ApolloServer({typeDefs, resolvers})

app = express();
server.applyMiddleware({ app });

app.get('/', function(req,res){
    res.send('Hello');
})

module.exports = app;