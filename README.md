# HUXE 2020 Auth0 Example

This is an Auth0 example application using Vue.js (and Express), following the two official quick start guides by Auth0.

1. [Auth0 Quick Starts > Single-Page App > Vue > Login](https://auth0.com/docs/quickstart/spa/vuejs)
2. [Auth0 Quick Starts > Single-Page App > Vue > Calling an API](https://auth0.com/docs/quickstart/spa/vuejs/02-calling-an-api)

Start the client and server, then open <http://localhost:8080>.

```bash
cd client
npm install
npm run start
```

```bash
cd server
npm install
npm run start
```

## Serverless

❗️ The server can be changed to a [cloud function](https://serverless.css-tricks.com/services/functions), so you don’t have to host the server yourself. The following is an example using [Netlify Functions](https://www.netlify.com/products/functions/) (with lot’s of error handling skipped, so it’s easier to read).

```js
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

const authClient = jwksClient({
  cache: true,
  jwksUri: 'https://manuelwieser.eu.auth0.com/.well-known/jwks.json',
  audience: 'https://huxe2020.example.com',
  issuer: 'https://manuelwieser.eu.auth0.com/'
});

function checkAuth(event) {
  return new Promise((resolve, reject) => {
    const authToken = event.headers.authorization.substring(7);
    const decodedToken = jwt.decode(authToken, { complete: true });

    const kid = decodedToken.header.kid;
    authClient.getSigningKey(kid, (signError, key) => {
      const publicKey = key.getPublicKey();
      const options = { algorithms: 'RS256' };
      
      jwt.verify(authToken, publicKey, options, (verifyError, decoded) => {
        return resolve(decoded);
      });
    });
  });
}

exports.handler = (event, context, callback) => {
  checkAuth(event)
    .then(user => {
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          msg: 'Your Access Token was successfully validated!'
        })
      });
    })
    .catch(error => {
      return callback(null, {
        statusCode: 401,
        body: JSON.stringify({
          error: error.message
        })
      });
    });
};
```

---

Manuel Wieser<br>
<https://manu.ninja><br>
<https://twitter.com/manuelwieser><br>
<https://www.paypal.me/manuninja><br>
