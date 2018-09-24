var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var rpio = require('rpio');

rpio.open(13, rpio.OUTPUT, rpio.LOW);
rpio.open(12, rpio.OUTPUT, rpio.LOW);
rpio.open(11, rpio.OUTPUT, rpio.LOW);
rpio.open(15, rpio.OUTPUT, rpio.LOW);



app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
	res.render('index');
});

function stop(io){
	setTimeout(function() {
		rpio.write(io, rpio.LOW);
	}, 300);
}

app.post('/w', function(req, res){
	res.send('w');
	rpio.write(13, rpio.HIGH);
	rpio.write(12, rpio.HIGH);
	stop(13);
	stop(12);
});

app.post('/l', function(req, res){
	res.send('l');
	rpio.write(12, rpio.HIGH);
	stop(12);
});

app.post('/r', function(req, res){
	res.send('r');
	rpio.write(13, rpio.HIGH);
	stop(13);
});

app.post('/b', function(req, res){
	res.send('b');
	rpio.write(11, rpio.HIGH);
	rpio.write(15, rpio.HIGH);
	stop(11);
	stop(15);
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});