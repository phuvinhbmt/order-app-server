require('dotenv').config();
const scalapayAPI = require('./src/controllers/ScalapayAPIController')
const express = require('express')
const scalapayAPIRouter = require('./src/routers/scalapayOrder')
const PORT = process.env.PORT || 3000;

const app = express();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.json());
app.use(scalapayAPIRouter);

app.listen(PORT, () => {
    console.log(`Backend is listening on port localhost:${PORT}`);
});
