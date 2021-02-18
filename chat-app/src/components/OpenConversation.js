import React, { useCallback, useState } from 'react';
import { Badge, Button, Form, InputGroup } from 'react-bootstrap';
import { useConversations } from '../contexts/ConversationsProvider';

const OpenConversation = () => {
  const [text, setText] = useState('');
  const setRef = useCallback(node => {
    if (node) node.scrollIntoView();
  }, []);
  const { selectedConversation, sendMessage, alerts } = useConversations();
  console.log(alerts[0]);
  const handleSubmit = e => {
    e.preventDefault();
    sendMessage(
      selectedConversation.recipients.map(r => r.id),
      text
    );
    setText('');
  };

  return (
    <div className="d-flex flex-grow-1 flex-column">
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column justify-content-end px-3 pt-3">
          {selectedConversation.messages.map((message, index) => {
            const lastMessage =
              selectedConversation.messages.length - 1 === index;
            return (
              <div
                key={index}
                ref={lastMessage ? setRef : null}
                className={`my-1 d-flex flex-column ${
                  message.senderIsMe ? 'align-self-end' : ''
                }`}
              >
                <div
                  className={`rounded px-2 py-1 ${
                    message.senderIsMe
                      ? 'text-white bg-primary'
                      : 'bg-light align-self-start'
                  }`}
                >
                  {message.message}
                </div>
                <div
                  className={`small text-muted ${
                    message.senderIsMe ? 'text-right' : ''
                  }`}
                >
                  {message.senderIsMe ? 'You' : message.senderName}
                </div>
              </div>
            );
          })}
        </div>
        {alerts.length > 0 ? (
          <Badge pill variant="light">
            {alerts[0]}
          </Badge>
        ) : null}
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
