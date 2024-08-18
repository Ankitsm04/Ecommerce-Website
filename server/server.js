const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const cors = require('cors'); // Import cors package
require('dotenv').config();
const cookieParser = require('cookie-parser');

const app = express();

// CORS configuration to allow all origins
app.use(cors({
    origin: '*', // Allow all origins
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true // Allow credentials if needed
}));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.json({ msg: "This is Example" });
});

// Define routes
app.use('/user', require('./routes/useRoutes'));
app.use('/api', require('./routes/categoryRoutes'));
app.use('/api', require('./routes/productRoutes'));
app.use('/api', require('./routes/upload'));

const URI = process.env.MONGODB_URI;

const connectWithRetry = () => {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 10
    }).then(() => {
        console.log('MongoDB connected');
    }).catch(err => {
        console.error('MongoDB connection error', err);
        setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
    });
};

connectWithRetry();

app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});
