const express = require('express');
const app = express();
const connectDB = require('./config/database');
const morgan = require('morgan');
const { corsOptions } = require('./config/cors');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config();
const path = require('path');

// Connect DB
connectDB(process.env.MONGO_URL);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(morgan("common"));
app.use(cors(corsOptions));
app.use(fileUpload());

// Routes
// const usersRouter = require('./routes/users')
// app.use('/users', usersRouter)
const authRouter = require('./routes/auth')
app.use('/auth', authRouter)
const bookingRouter = require('./routes/booking')
app.use('/booking', bookingRouter)
const orderRouter = require('./routes/orders')
app.use('/orders', orderRouter)

// Specify React build path for server side rendering
// if (process.env.NODE_ENV === 'production') {
app.use(express.static(path.join(__dirname, "client", "build")));
// app.use(express.static('/client/build/index.html'));

console.log(`Filename is ${__filename}`);
app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


console.log("Path joined ", path.join(__dirname, "client", "build"));
console.log("After path joined ", __dirname, "./client/build/index.html")
// }

// // Serving
// app.listen(5000, () => {
//     console.log('server is running')
// })
module.exports = app;
