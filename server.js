const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 4200;

// Serve static files....
app.use(express.static(__dirname + '/dist/feedbackpal-ui-gen'));

// Send all requests to index.html
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/feedbackpal-ui-gen/index.html'));
});

// default Heroku PORT
app.listen(port);
console.log('Server started on port', port);
