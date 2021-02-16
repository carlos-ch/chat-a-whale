import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useContacts } from '../context/ContactsProvider';

const Contacts = () => {
  const { contacts } = useContacts();
  return (
    <ListGroup>
      {contacts.map(contact => (
        <ListGroup.Item key={contact.id}>{contact.name}</ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Contacts;
