// const PORT = 8080;
const io = require('socket.io')(8080, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', socket => {
  // console.log('nbuenasss');
  const id = socket.handshake.query.id;
  socket.join(id);
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
});

// io.listen(5000);
