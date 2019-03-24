const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const nicknames = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
}); 

io.on('connection', socket => {
  socket.on('new user', (data, callback) => {
  	if(nicknames.indexOf(data) != -1) callback(false);
  	else {
  	  callback(true);
  	  socket.nickname = data;
  	  nicknames.push(socket.nickname);
  	  io.sockets.emit('usernames', nicknames);
  	  console.log('User', data, 'connected');
  	  updateNicknames();
  	}
  });

  function updateNicknames(){io.sockets.emit('usernames', nicknames);}

  socket.broadcast.emit('Welcome to chat on Socket.IO');

  socket.on('chat message', data => {
  	io.emit('chat message', {msg: data, nick: socket.nickname});
  });

  socket.on('new user', (data, callback) => {
  	if(nicknames.indexOf(data) != -1) callback(false);
  	else {
  	  callback(true);
  	  socket.nickname = data;
  	  nicknames.push(socket.nickname);
  	  io.sockets.emit('usernames', nicknames);
  	}
  });

  socket.on('disconnect', () => {
  	if(!socket.nickname) return;
  	console.log('User', socket.nickname, 'disconnected');
  	nicknames.splice(nicknames.indexOf(socket.nickname), 1);
  	updateNicknames();

  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});