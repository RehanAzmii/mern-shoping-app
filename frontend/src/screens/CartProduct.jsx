import React, { useEffect } from "react";
import { addToCart } from "../action/cartAction";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
const CartProduct = () => {
  const params = useParams();
  const search = useLocation().search;
  const productId = params.id;
  const qty = search ? Number(search.split("=")[1]) : 1;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, qty, productId]);

  return (
    <div>
      <h1>Cart Component</h1>
    </div>
  );
};

export default CartProduct;
