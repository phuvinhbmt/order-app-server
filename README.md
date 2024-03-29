# Prerequisite
 - NodeJs
 - npm

To check your machine has Nodejs and npm, refer to Installation
# How to run 
Create `.env` file in api-backend folder. Use [Scalapay API Auth](https://developers.scalapay.com/reference/api-authentication) to fill in `.env` (sample file .env.example)
```
SCALAPAY_DOMAIN=<fill_in>
SCALAPAY_BEARER_TOKEN=<fill_in>
PORT=<fill_in>
```

Inside api-backend folder, run: 

    $ npm install
    $ npm start

Terminal should output: 

    nodemon index.js
    [nodemon] 2.0.16
    [nodemon] to restart at any time, enter rs
    [nodemon] watching path(s): *.*
    [nodemon] watching extensions: js,mjs,json
    [nodemon] starting node index.js
    Backend is listening on port localhost:3000
This project will then run on localhost:3000
 
# Installation
   Check if node or npm is installed in your machine by: 

    $ node -v  
    v14.15.15  #sample output

    $ npm -v
    8.10.0 #sample output
If your machine does not have node or npm, refer to this doc to install https://github.com/nvm-sh/nvm
