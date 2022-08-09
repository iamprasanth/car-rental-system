const express = require('express');
const app = express();
const connectDB = require('./config/database');
const morgan = require('morgan');
const { corsOptions } = require('./config/cors');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

// Connect DB
connectDB(process.env.MONGO_URL);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(morgan("common"));
app.use(cors(corsOptions));

// Routes
const authRouter = require('./routes/auth')
app.use('/auth', authRouter)
const bookingRouter = require('./routes/booking')
app.use('/booking', bookingRouter)
const orderRouter = require('./routes/orders')
app.use('/orders', orderRouter)
const chatbotRouter = require('./routes/chatbot')
app.use('/chatbot', chatbotRouter)

// Specify React build path for server side rendering
app.use(express.static(path.join(__dirname, "client", "build")));

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Serving
app.listen(3000, () => {
    console.log('server is running')
})
module.exports = app;
