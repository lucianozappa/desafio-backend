var fs = require('fs');
var moment = require('moment');
var request = require('request');
var restify = require('restify');
var socketio = require('socket.io');
var mengenlehreuhr = require('./app/mengenlehreuhr');

var server = restify.createServer();
var io = socketio.listen(server.server);


server.get('/current', currentTime);
server.get('/convert/:time', convertTime);
server.get('/display', displayMengenlehreuhr);
server.get('/shutdown', shutdown);

var activeViewers = 0;

io.on('connection', function (socket) {
  socket.on('disconnect', function(){
    activeViewers--;
    viewerlistChanged();
  });
  activeViewers++;
  viewerlistChanged();
});

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});

function currentTime(req, res, next) {
  res.send(mengenlehreuhr.getTime()); 
  next();
}

function convertTime(req, res, next) {
  res.send(mengenlehreuhr.getTime(
    moment(req.params.time).format()
  )); 
  next();
}

function displayMengenlehreuhr(req, res, next) {
  var template = fs.readFileSync('mengenlehreuhr.html', 'utf8');
  res.writeHead(200, {
    'Content-Length': Buffer.byteLength(template),
    'Content-Type': 'text/html'
  });
  res.write(template); 
  res.end();
  next();
}

function viewerlistChanged(activeUsers) {
  io.emit('users', { activeViewers: activeViewers });
  process.stdout.write(activeViewers + " online\r");
}

function shutdown() {
  console.log('Server shutdown');
  process.exit(0);
}

