import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
const Header = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems);
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
                &nbsp; cart {cartItems.length}
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to={"/login"}>
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
