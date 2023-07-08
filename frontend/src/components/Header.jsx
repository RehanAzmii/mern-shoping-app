import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const Header = () => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Online Shop</Navbar.Brand>
          </LinkContainer>
          <Nav className="ml-auto">
            <LinkContainer to={"/cart"}>
              <Nav.Link>
                <i className="fas fa-shopping-cart"></i>
                &nbsp; cart
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to={"/singin"}>
              <Nav.Link>
                <i className="fas fa-user"></i>
                &nbsp; singin
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
