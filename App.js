require('dotenv').config();

const Express = require('express'); 
const app = Express(); 


app.use(Express.static(__dirname + '/public')); 

// establishes the default route 
app.get('/', (request, response) => response.render('index'));

// this allows our app to read the request body as a JSON object 
app.use(Express.json()); 

app.use('/test', (req, res) => [
    res.send('This is a test endpoint')
]) 

const database = require('./Db'); 

database.sync(); 

const user= require('./controllers/usercontroller');
app.use('/user', user); 

const log= require('./controllers/logcontroller'); 
app.use('/log', log);

app.listen(process.env.PORT, () => console.log(`This app is listening on port: ${process.env.PORT}`));




