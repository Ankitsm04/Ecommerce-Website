const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const app = express();

// Middleware
app.use(cors({
    origin: ["https://a1-market-backend.vercel.app"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/user', require('./routes/userRoutes'));
app.use('/api', require('./routes/categoryRoutes'));
app.use('/api', require('./routes/productRoutes'));
app.use('/api', require('./routes/uploadRoutes'));

app.get('/', (req, res) => {
    res.json({ msg: "This is Example" });
});

const URI = process.env.MONGODB_URI;
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("MongoDB Connected");
    app.listen(process.env.PORT || 5000, () => {
        console.log("Server Running");
    });
})
.catch(err => {
    console.log(err);
});
