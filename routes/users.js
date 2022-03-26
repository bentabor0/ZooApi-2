var express = require('express');
var router = express.Router();

// user view html
let userView = `<!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <meta http-equiv="X-UA-Compatible" content="IE=edge">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Zoo express api</title>
                </head>
                <body>
                  <h1>User Express</h1>
                  <p>Welcome to my user Express API</p>
                  <p>Users not ready</p>
                </body>
                </html>
                `;

// user home page
router.get('/', (req, res, next) => {
    res.send(userView);
});

module.exports = router;
