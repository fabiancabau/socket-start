var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

console.log('Listening on port 3000');
server.listen(3000);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('connected', { msg: 'helloworld!' });
  
  socket.on('connected-ack', function (data) {
    console.log(data);
  });

  socket.on('click',function (data){
  	console.log(data);

  	io.sockets.emit('click-ack', data);
  });
});