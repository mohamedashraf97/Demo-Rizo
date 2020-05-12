const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
var path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://Demo:demo@demo-shard-00-00-44olj.mongodb.net:27017,demo-shard-00-01-44olj.mongodb.net:27017,demo-shard-00-02-44olj.mongodb.net:27017/test?ssl=true&replicaSet=Demo-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true ,  useUnifiedTopology: true}, () => {
    console.log('connected');
});
mongoose.set('useCreateIndex', true);

app.use(express.static(path.join(__dirname, 'public')));


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//loading routes

const index = require('./routes');

//using routes
app.use('/', index);

const port = process.env.PORT || 4500 ;
app.listen(port, () => {

    console.log(`listening ${port}`)

})