const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const mongoDB = require('./config/mongoDB');
const User = require('./model/userScema');
const authRouter = require('./routes/authRoute');

const Port = process.env.PORT || 4040;

const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: process.env.FRONTEND_URL,credentials:true}))

app.get('/',(req,res)=>{
    res.send("api is workng");
})

app.use('/user',authRouter);
app.get('/debug-env', (req, res) => {
  res.json({
    NODE_ENV: process.env.NODE_ENV,
    COOKIE_DOMAIN: process.env.COOKIE_DOMAIN,
    FRONTEND_URL: process.env.FRONTEND_URL,
    headers: req.headers,
    host: req.headers.host,
    origin: req.headers.origin
  });
});

mongoDB().then(()=>{
    console.log("DB connected");
    app.listen(Port , ()=>{
        console.log(`server is running Port number : ${Port}`);
    } )
}).
catch((err)=>{
    console.log("Error : " + err);
})
