import React from "react";
import { Card } from "react-bootstrap";
import Rating from "../components/Rating";
import { NavLink } from "react-router-dom";

const ProductScreen = ({ product }) => {
  return (
    <>
      <Card className="mt-4">
        <NavLink to={`/productdetail/${product._id}`}>
          <Card.Img variant="top" src={product.image} />
        </NavLink>
        <Card.Body>
          <NavLink to={`/productdetail/${product._id}`}>
            <Card.Title as="div">
              <strong>{product.name}</strong>
            </Card.Title>
          </NavLink>
          <Card.Text as="div">
            <Rating
              value={product?.rating}
              text={`${product?.numReviews} reviews`}
            />
          </Card.Text>
          <Card.Text as="div">$ {product.price}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};
export default ProductScreen;
