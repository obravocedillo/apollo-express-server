// HOSTNAME=database-testing-1.codai4geyrzp.us-east-2.rds.amazonaws.com USER=admintesting PASSWORD=tG5ThCAEk7T0 DB=Testing1 node index.js
const app = require('./app');

app.listen(3002,() => {
    console.log('Listening in port 3002')
})