const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const fileUpload = require('express-fileupload');
require('dotenv').config();
const cookieParser = require('cookie-parser')

const app = express();
app.use(cors(
    {
        origin: ["https://a1-market-backend.vercel.app"],
        method: ["POST","GET","DELETE","PUT"],
        credentials: true
    }
));
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

app.get('/',(req,res)=>{
    res.json({msg:"This is Example"})
})

app.listen(PORT,() =>{
    console.log("Server Running")
})



//Routes
app.use('/user',require('./routes/useRoutes'))
app.use('/api',require('./routes/categoryRoutes'))
app.use('/api',require('./routes/productRoutes'))
app.use('/api',require('./routes/upload'))

const URI = process.env.MONGODB_URI;

mongoose.connect(URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("MongoDB Connected");
    console.log("SERVER AT", PORT)
}).catch(err=>{
    console.log(err);
})

