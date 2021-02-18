// const PORT = 8080;
const app = require('express')();
const http = require('http').Server(app);
// const io = require('socket.io')(http);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', socket => {
  console.log('nbuenasss');
  const id = socket.handshake.query.id;
  socket.join(id);
  // socket.on();
  /* notify user connected */
  // socket.emit('user-connected', { notification: 'User has connected: ', id });
  socket.on('send-message', ({ recipients, message }) => {
    // socket.to(anotherSocketId).emit('private message', socket.id, msg);
    recipients.forEach(recipient => {
      const swappedRecipients = recipients.filter(r => r !== recipient);
      swappedRecipients.push(id);
      socket.broadcast.to(recipient).emit('receive-message', {
        recipients: swappedRecipients,
        sender: id,
        message,
      });
    });
  });
  /* notify that someone disconnected */
  socket.on('disconnect', function ({ id }) {
    socket.broadcast.emit('user-disconnect', { id });
  });
});

http.listen(8080, () => {
  console.log('listening on *:8080');
});
