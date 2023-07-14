import React, { useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v3";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/shared/Message";
import { getOrderDetails, payOrder } from "../action/orderAction";
import Loader from "../components/shared/Loader";
import axios from "axios";
import { ORDER_PAY_RESET } from "../constant/orderConstant";

const OrderScreen = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const search = useLocation().search;
  const [sdkReady, setSdkReady] = useState(false);
  const orderId = params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);

  const { loading: loadingPay, success: successPay } = orderPay;

  if (!loading) {
    // calculate price
    const addDecimal = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };
    order.itemsPrice = addDecimal(
      order?.orderItems?.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, order, successPay]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h2>Order {order._id}</h2>
      <Row>
        <Col md={8} style={{ border: ".5px solid" }}>
          {" "}
          <ListGroup.Item variant="flush">
            <h2>Shipping</h2>
            <p>
              <strong>Name:</strong>&nbsp;
              {order?.user?.name}
            </p>
            <p>
              <strong>Email:</strong>&nbsp;
              {order?.user?.email}
            </p>
            <p>
              <strong>Address :</strong>
              {order.shippingAddress.address}&nbsp;
              {order.shippingAddress.city}&nbsp;
              {order.shippingAddress.postalcode}&nbsp;
              {order.shippingAddress.country}&nbsp;
            </p>
            {order.isDelevired ? (
              <Message variant="success">{order.deleviredAt}</Message>
            ) : (
              <Message variant={"danger"}>Not Delivered</Message>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Payment Method</h2>
            <p>
              <strong>Method:</strong>
              <strong>{order.paymentMethod}</strong>
            </p>
            {order.isPaid ? (
              <Message variant="success">{order.paidAt}</Message>
            ) : (
              <Message variant={"danger"}>Not Paid</Message>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Order Items</h2>
            {order.orderItems.length === 0 ? (
              <Message>Your Cart is Empty</Message>
            ) : (
              <ListGroup variant="flush">
                {order.orderItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid />
                      </Col>
                      <Col>
                        <NavLink
                          to={`/product/${item.product}`}
                          style={{ textDecoration: "none" }}
                        >
                          {item.name}
                        </NavLink>
                      </Col>
                      <Col md={4}>
                        {item.qty} X ${item.price} = ${item.qty * item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
            </ListGroup>
          </Card>
          {!order.isPaid && (
            <ListGroup.Item>
              {loadingPay && <Loader />}
              {!sdkReady ? (
                <Loader />
              ) : (
                // <PayPalButton
                //   className="mt-3"
                //   style={{
                //     background: "yellow",
                //     color: "green",
                //   }}
                //   amount={order.totalPrice}
                //   onSuccess={successPaymentHandler}
                // />
                //   PayPal
                // </Button>
                ""
              )}
            </ListGroup.Item>
          )}
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
