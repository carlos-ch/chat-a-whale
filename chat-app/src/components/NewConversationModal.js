import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useConversations } from '../contexts/ConversationsProvider';
import { useContacts } from '../contexts/ContactsProvider';

const NewConversationModal = ({ handleClose }) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const { createConversation } = useConversations();

  const handleSubmit = e => {
    e.preventDefault();
    createConversation(selectedIds);

    handleClose();
  };
  const handleCheck = e => {
    const contactID = e.target.value;

    setSelectedIds(prevState => {
      if (prevState.includes(contactID)) {
        return prevState.filter(id => id !== contactID);
      }
      return [...prevState, contactID];
    });
  };

  const { contacts } = useContacts();
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>New Conversation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Add ID of new contact!
        <Form onSubmit={handleSubmit}>
          {contacts.map(contact => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                label={contact.name}
                type="checkbox"
                value={contact.id}
                onChange={handleCheck}
              ></Form.Check>
            </Form.Group>
          ))}
          <Button type="submit" variant="primary">
            Save Changes
          </Button>{' '}
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
};

export default NewConversationModal;
