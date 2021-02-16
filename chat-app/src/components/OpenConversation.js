import React, { useCallback, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useConversations } from '../context/ConversationsProvider';

const OpenConversation = () => {
  const [text, setText] = useState('');
  const setRef = useCallback(node => {
    if (node) node.scrollIntoView();
  });
  const { selectedConversation, sendMessage } = useConversations();
  const handleSubmit = e => {
    e.preventDefault();
    sendMessage(
      selectedConversation.recipients.map(r => r.id),
      text
    );
    setText('');
  };

  console.log(selectedConversation);
  return (
    <div className="d-flex flex-grow-1 flex-column">
      Open converssse
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {selectedConversation.messages.map((message, index) => {
            const lastMessage =
              selectedConversation.messages.length - 1 === index;
            return (
              <div
                key={index}
                ref={lastMessage ? setRef : null}
                className={` my-1 d-flex flex-column ${
                  message.senderIsMe ? 'align-self-end' : ''
                }`}
              >
                <div
                  className={`small ${
                    message.senderIsMe ? ' text-white bg-primary' : ''
                  }`}
                >
                  {message.senderIsMe ? 'You: ' : message.senderName}
                </div>
                <div
                  className={`px-2 ${
                    message.senderIsMe ? 'text-white bg-primary' : ''
                  }`}
                >
                  {message.message}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              style={{ height: '4rem', resize: 'none' }}
              onChange={e => setText(e.target.value)}
              as="textarea"
              required
              value={text}
            />
            <InputGroup.Append>
              <Button type="submit">Send</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
};

export default OpenConversation;
