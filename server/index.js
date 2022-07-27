const express = require('express');
const app = express();
const connectDB = require('./config/database');
const helmet = require('helmet');
const morgan = require('morgan');
const { corsOptions } = require('./config/cors');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config();

// Connect DB
connectDB(process.env.MONGO_URL);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(helmet());
app.use(morgan("common"));
app.use(cors(corsOptions));
app.use(fileUpload());

// Routes
const usersRouter = require('./routes/users')
app.use('/users', usersRouter)
const authRouter = require('./routes/auth')
app.use('/auth', authRouter)
const bookingRouter = require('./routes/booking')
app.use('/booking', bookingRouter)
const orderRouter = require('./routes/orders')
app.use('/orders', orderRouter)

// Serving
app.listen(5000, () => {
    console.log('server is running')
})
