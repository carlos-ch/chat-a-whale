import React, { useCallback, useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useContacts } from './ContactsProvider';
import { useSocket } from './SocketProvider';

const ConversationsContext = React.createContext();

export const useConversations = () => {
  return React.useContext(ConversationsContext);
};
export const ConversationsProvider = ({ children, id }) => {
  const [conversations, setConversations] = useLocalStorage(
    'conversations',
    []
  );
  const [alerts, setAlerts] = useState([]);
  const [selectedConversationIndex, setSelectedConversationIndex] = useState();
  // const [alerts, setAlerts] = useState([]);
  const { contacts } = useContacts();
  const socket = useSocket();

  const createConversation = recipients => {
    setConversations(previousState => {
      return [...previousState, { recipients, messages: [] }];
    });
  };

  const addMessageToChat = useCallback(
    ({ recipients, message, sender }) => {
      setConversations(previousState => {
        let madeChange = false;
        const newMessage = { sender, message };
        const newConversations = previousState.map(conversation => {
          if (arrayEquals(conversation.recipients, recipients)) {
            madeChange = true;
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            };
          }
          return conversation;
        });

        if (madeChange) {
          return newConversations;
        } else {
          return [...previousState, { recipients, messages: [newMessage] }];
        }
      });
    },
    [setConversations]
  );
  /* alert all users that someone connected
   */
  const addAlertToChat = useCallback(
    ({ id }) => {
      console.log(id + ' disconnected!!');
      setAlerts([id + ' has disconnected!']);
    },
    [setAlerts]
  );

  /* alert when a user disconnects */
  useEffect(() => {
    if (socket == null) return;
    socket.on('user-disconnect', addAlertToChat);
    return () => {
      socket.off('user-disconnect');
    };
  }, [addAlertToChat, socket]);

  useEffect(() => {
    if (socket == null) return;
    // socket.on('user-connected', addAlertToChat);
    socket.on('receive-message', addMessageToChat);

    return () => {
      socket.off('receive-message');
    };
  }, [socket, addMessageToChat]);

  const sendMessage = (recipients, message) => {
    socket.emit('send-message', { recipients, message });
    addMessageToChat({ recipients, message, sender: id });
  };

  /* formatter returns array with necessary readable information */
  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map(id => {
      const contactFull = contacts.find(contact => contact.id === id);
      const name = (contactFull && contactFull.name) || id;
      return { id, name };
    });

    const messages = conversation.messages.map(message => {
      const contact = contacts.find(contact => contact.id === message.sender);
      const name = (contact && contact.name) || message.sender;
      const senderIsMe = message.sender === id;
      return { ...message, senderName: name, senderIsMe };
    });

    const selected = selectedConversationIndex === index;
    return { ...conversation, messages, selected, recipients };
  });
  const value = {
    alerts,
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    createConversation,
    sendMessage,
    selectConversationIndex: setSelectedConversationIndex,
  };
  return (
    <div>
      <ConversationsContext.Provider value={value}>
        {children}
      </ConversationsContext.Provider>
    </div>
  );
};

const arrayEquals = (a, b) => {
  if (a.length !== b.length) return false;

  a.sort();
  b.sort();

  return a.every((item, index) => item === b[index]);
};
