const Express = require("express");
const BodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const http = require('http');
const app = Express();
 
app.use(BodyParser.urlencoded({ extended: false }))
app.use(BodyParser.json());
app.use(cors());
app.use(morgan('tiny'));
const userRoute = require("./userRoute/userRoute");
app.use('/user',userRoute)
 const uri="mongodb://127.0.0.1:27017/authentification";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('err', () => { console.log('connection failed') });
mongoose.connection.on('ok', () => { console.log('connection done') })
const server = http.createServer(app)
server.listen(3000, () => {
    console.log("server is listenning on 3000");
})
