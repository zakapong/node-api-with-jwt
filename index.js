var express = require('express');
//var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

const app = express();
//app.use(bodyParser.json());

app.get('/api', function api(req, res) {
  res.json({
    text: 'My API!'
  });
});

app.post('/api/login', function(req, res) {

  // auth user
  const user = { id: 3 };

  // then return a token, secret key should be an env variable
  const token = jwt.sign({ user }, 'my_secret_key');
  res.json({
   // message: 'Authenticated! Use this token in the "Authorization" header',
      token: token
  });
});



app.get('/api/protected', ensureToken, function(req, res) {
  jwt.verify(req.token, 'my_secret_key', function(err, data) {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        description: 'Protected information. Congrats!',
          text: 'this is projected',
          data: data
      });
    }
  })
});



function ensureToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}


app.listen(3000, function () {
  console.log('App listening on port 3000!');
});