const PORT = 5000;
const io = require('socket.io')(PORT);

io.on('connection', socket => {
  console.log(socket.id, 'buenas');
});

// io.listen(5000);
