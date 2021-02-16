import React, { useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useContacts } from '../context/ContactsProvider';

const NewContactModal = ({ handleClose }) => {
  const idRef = useRef();
  const nameRef = useRef();
  const { createContact } = useContacts();
  const handleSubmit = e => {
    e.preventDefault();
    createContact(idRef.current.value, nameRef.current.value);
    handleClose();
  };
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>New Contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Add ID of new contact!
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              ref={nameRef}
              placeholder="Enter name"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>User ID</Form.Label>
            <Form.Control type="text" ref={idRef} placeholder="ID" required />
          </Form.Group>
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

export default NewContactModal;
