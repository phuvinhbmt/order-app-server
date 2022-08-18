require('dotenv').config();
const scalapayAPI = require('./src/controllers/ScalapayAPIController')
const express = require('express')
const scalapayAPIRouter = require('./src/routers/scalapayOrder')

const mocks = require('ronin-mocks')
const ronin = require('ronin-server');
const database = require('ronin-database')
const server = ronin.server()

database.connect( process.env.CONNECTIONSTRING);
server.use('/', mocks.server( server.Router(), false, false ));
server.use('/foo', (req,res) => {
    const temp = 'this is a temp';
    return res.json('hello world');
})
server.start();

/* const PORT = process.env.PORT || 3000;

const app = express();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/', (req,res) => {res.json('hello world');});

app.use(express.json());
app.use(scalapayAPIRouter);

app.listen(PORT, () => {
    console.log(`Backend is listening on port localhost:${PORT}`);
}); */
