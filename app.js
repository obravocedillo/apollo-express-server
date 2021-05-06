const express = require('express');
const connection = require('./db');
const { ApolloServer, gql } = require('apollo-server-express');
const { assertSchema } = require('graphql');

let books = [
    {name:'Book1', author:'Author1', year: 2002},
    {name:'Book2', author:'Author2', year: 2003},
];

const typeDefs = gql`
    type Query {
        getAllBooks:[Book]
        getAllUsers: [User]
    }
    type Mutation {
        saveUser(email: String!, first_name: String!, last_name: String!): String!
        saveBook(name: String!, author: String!, year: Int!): Book!
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
        getAllBooks: () => { return (books) },
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
    },

    Mutation:{
        saveUser: (parent, args) => {
            return new Promise((resolve)=>{
                connection.query("INSERT INTO USER (email, first_name, last_name) VALUES (?, ?, ?)",[args.email, args.first_name, args.last_name],(error, results, fields) => {
                    if(error){
                        console.log(error);
                        resolve ('null');
                    }
                    resolve (args.email);
                })
            })
        },
        saveBook: (parent, args) => {
            let newBook = {
                name: args.name,
                author: args.author,
                year: args.year
            }
            books.push(newBook);
            return newBook;
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