import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const CheckoutStep = ({ step1, step2, step3, step4 }) => {
  return (
    <>
      <Nav className="justify-content-center mb-4">
        <Nav.Item>
          {step1 ? (
            <NavLink to="/login" style={{ textDecoration: "none" }}>
              SignIn
            </NavLink>
          ) : (
            <NavLink disabled>SignIn</NavLink>
          )}
        </Nav.Item>
        <Nav.Item>
          {step2 ? (
            <NavLink to="/shipping" style={{ textDecoration: "none" }}>
              Shipping
            </NavLink>
          ) : (
            <NavLink disabled>Shipping</NavLink>
          )}
        </Nav.Item>
        <Nav.Item>
          {step3 ? (
            <NavLink to="/payment" style={{ textDecoration: "none" }}>
              Payment
            </NavLink>
          ) : (
            <NavLink disabled>Payment</NavLink>
          )}
        </Nav.Item>
        <Nav.Item>
          {step4 ? (
            <NavLink to="/Placeorder" style={{ textDecoration: "none" }}>
              Place Order
            </NavLink>
          ) : (
            <NavLink disabled>Place Order</NavLink>
          )}
        </Nav.Item>
      </Nav>
    </>
  );
};

export default CheckoutStep;
