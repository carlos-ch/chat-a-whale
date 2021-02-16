import React, { useRef } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { v4 as uuidV4 } from 'uuid';
export const Login = ({ onIdSubmit }) => {
  const idRef = useRef();
  const handleSubmit = e => {
    e.preventDefault();
    onIdSubmit(idRef.current.value);
  };
  const handleNewId = () => {
    onIdSubmit(uuidV4());
  };
  return (
    <Container>
      <h1>Hellooo</h1>
      <p>Login to continue</p>{' '}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor=""> Enter your ID</Form.Label>
          <Form.Control type="text" ref={idRef} />
        </Form.Group>
        <Button type="submit">Login</Button>{' '}
        <Button variant="secondary" onClick={handleNewId}>
          Create new user
        </Button>
      </Form>
      {/* <button type="submit">Login</button>
      <button type="submit">Create new user</button> */}
    </Container>
  );
};
