import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../components/Rating";
import {
  Col,
  Row,
  Image,
  ListGroup,
  ListGroupItem,
  Button,
  Form,
} from "react-bootstrap";
import { listProductDetails } from "../action/productAction";
import Loader from "../components/shared/Loader";
import Message from "../components/shared/Message";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);

  const { product, error, loading } = productDetails;
  useEffect(() => {
    dispatch(listProductDetails(params.id));
  }, [dispatch, params.id]);

  // add to card function
  const addToCardHandler = () => {
    navigate(`/cart/${params.id}?qty=${qty}`);
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : (
        <div>
          <NavLink to="/" className="btn btn-light">
            <i className="fas fa-arrow-left"></i>
            &nbsp; GO BACK
          </NavLink>
          <Row>
            <Col md={6}>
              <Image src={product?.image} alt={product?.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <Rating
                    value={product.rating}
                    text={`${product?.numReviews} reviews`}
                  />
                </ListGroupItem>
                <ListGroupItem>Price : ${product.price}</ListGroupItem>

                <ListGroupItem>{product.description}</ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <ListGroup>
                <ListGroupItem>
                  <Row>
                    <Col>Status</Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroupItem>
                {product.countInStock > 0 && (
                  <ListGroupItem>
                    <Row>
                      <Col>Qty</Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => {
                          setQty(e.target.value);
                        }}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x}>
                            {x}
                          </option>
                        ))}
                      </Form.Control>
                    </Row>
                  </ListGroupItem>
                )}
                <ListGroupItem>
                  <Button
                    className="btn-block "
                    type="button"
                    onClick={addToCardHandler}
                  >
                    Add to Cart
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
