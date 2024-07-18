const mongoose = require('mongoose');

const connection_string = process.env.CONNECTION_STRING;
console.log(process.env.CONNECTION_STRING)
console.log(connection_string)


mongoose.connect(connection_string, { connectTimeoutMS: 2000 })
 .then(() => console.log('Database connected'))

 .catch(error => console.error(error));