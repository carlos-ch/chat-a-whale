import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useContacts } from './ContactsProvider';

const ConversationsContext = React.createContext();

export const useConversations = () => {
  return React.useContext(ConversationsContext);
};
export const ConversationsProvider = ({ children, id }) => {
  const [conversations, setConversations] = useLocalStorage(
    'conversations',
    []
  );
  const [selectedConversationIndex, setSelectedConversationIndex] = useState();
  const { contacts } = useContacts();

  const createConversation = recipients => {
    setConversations(previousState => {
      return [...previousState, { recipients, messages: [] }];
    });
  };

  const addMessageToChat = ({ recipients, message, sender }) => {
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
  };
  const sendMessage = (recipients, message) => {
    addMessageToChat({ recipients, message, sender: id });
  };

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
