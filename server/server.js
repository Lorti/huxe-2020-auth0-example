const express = require('express');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const app = express();

const jwtCheckMiddleware = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://manuelwieser.eu.auth0.com/.well-known/jwks.json'
    }),
    audience: 'https://huxe2020.example.com',
    issuer: 'https://manuelwieser.eu.auth0.com/',
    algorithms: ['RS256']
});

app.get('/api/external', jwtCheckMiddleware, (req, res) => {
    res.send({
        msg: 'Your Access Token was successfully validated!'
    });
});

app.listen(3001, () => console.log('API listening on 3001'));
