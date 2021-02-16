import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useConversations } from '../context/ConversationsProvider';

const Conversations = () => {
  const { conversations, selectConversationIndex } = useConversations();
  console.log(conversations);
  return (
    <ListGroup>
      {conversations.map((conversation, index) => (
        <ListGroup.Item
          key={index}
          variant="info"
          action
          active={conversation.selected}
          onClick={() => selectConversationIndex(index)}
        >
          {conversation.recipients.map(item => item.name).join(', ')}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Conversations;
