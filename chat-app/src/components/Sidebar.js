import React, { useState } from 'react';
import { Tab, Nav, Button, Modal } from 'react-bootstrap';
import Contacts from './Contacts';
import Conversations from './Conversations';
import NewContactModal from './NewContactModal';
import NewConversationModal from './NewConversationModal';

const Sidebar = ({ id }) => {
  const CONTACTS_KEY = 'contacts';
  const CHATS_KEY = 'chats';
  /* state for selected tab */
  const [key, setKey] = useState(CHATS_KEY);
  // const modalHandler = () => {

  // }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div style={{ width: '250px' }} className="d-flex flex-column">
      <Tab.Container activeKey={key} onSelect={k => setKey(k)}>
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey={CHATS_KEY}>Chats</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="border-right overflow-auto flex-grow-1">
          <Tab.Pane eventKey={CONTACTS_KEY}>
            <Contacts></Contacts>
          </Tab.Pane>
          <Tab.Pane eventKey={CHATS_KEY}>
            <Conversations></Conversations>
          </Tab.Pane>
        </Tab.Content>
        <div className="p-2 border-top border-right small">
          <p className="text-muted">Your ID {id}</p>
        </div>
        <Button onClick={handleShow}>
          New {key === 'chats' ? 'Conversation' : 'Contact'}
        </Button>
      </Tab.Container>
      <Modal show={show} onHide={handleClose}>
        {key === CONTACTS_KEY ? (
          <NewContactModal handleClose={handleClose} />
        ) : (
          <NewConversationModal handleClose={handleClose} />
        )}
      </Modal>
    </div>
  );
};

export default Sidebar;
