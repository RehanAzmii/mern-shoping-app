import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import FormContainer from "../components/shared/FormContainer";
import { Link } from "react-router-dom";

const LoginScreen = ({ location }) => {
  const [input, setInput] = useState();
  //   const redirect = location.search ? location.search.split("=")[1] : "/";
  const submitHandler = (e) => {
    e.preventDefault();
  };

  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  return (
    <>
      <FormContainer>
        <h1>SIGN IN</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={input?.email}
              onChange={inputHandler}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={input?.password}
              onChange={inputHandler}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary" className="mt-3">
            SIGN IN
          </Button>
        </Form>
        <Row>
          <Col>
            New Customer ?<Link to="/register">Register</Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default LoginScreen;
