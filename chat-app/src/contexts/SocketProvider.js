import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = React.createContext();

// socket.on('connect', () => {
//   console.log(socket.connected); // true
// });

// socket.on('disconnect', () => {
//   console.log(socket.connected); // false
// });

const useSocket = () => {
  return useContext(SocketContext);
};

const SocketProvider = ({ id, children }) => {
  const [socket, setSocket] = useState();
  useEffect(() => {
    const newSocket = io('http://localhost:8080', { query: { id } });
    setSocket(newSocket);
  }, [id]);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, useSocket };
