var express = require('express');
var app = express();
var http = require('http').Server(app);

app.use(
    express.static(__dirname + '/static/')
);

app.get('/data', function(req, res) {
    res.sendFile(__dirname + '/data.jason');
})

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/static/index.html');
});

http.listen(1450, function() {
    console.log('listening on *:1450');
});
