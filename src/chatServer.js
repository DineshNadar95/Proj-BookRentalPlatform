const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3001;

app.get('/', function (req, res) {
  res.sendFile('/chat');
});

io.on('connection', function (socket) {
  socket.on('user_join', function (data) {
    this.username = data;
    socket.broadcast.emit('user_join', data);
  });

  socket.on('chat_message', function (data) {
    data.username = this.username;
    socket.broadcast.emit('chat_message', data);
  });

  socket.on('disconnect', function (data) {
    socket.broadcast.emit('user_leave', this.username);
  });
});

http.listen(port, function () {
  console.log('Listening on *:' + port);
});