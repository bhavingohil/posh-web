import React, { useState } from "react";
import Image from "next/image";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useDispatch } from "react-redux";
import {
  decrementNumber,
  incrementNumber,
  updateValue,
} from "../../redux/features/cart";
import checkoutStyles from "../../styles/Checkout.module.css";

export default function CheckoutCard({ item }) {
  const [counter, setCounter] = useState(item.quantity);
  const { cart, setCart } = useContext(CartContext);

  const dispatch = useDispatch();

  const handleDecrement = () => {
    const index = cart.findIndex((e) => e.handle === item.handle);

    if (item.quantity > 1) {
      setCounter((prev) => prev - 1);
      let temp = [...cart];
      temp[index].quantity--;
      setCart(temp);
    } else {
      if (index > -1) {
        setCart((prev) => prev.filter((e) => e.handle !== item.handle));
      }
    }
    dispatch(decrementNumber());
    dispatch(updateValue(-Number(cart[index].price)));
  };

  const handleIncrement = () => {
    setCounter((prev) => prev + 1);
    const index = cart.findIndex((e) => e.handle === item.handle);
    let temp = [...cart];
    temp[index].quantity++;
    setCart(temp);
    dispatch(incrementNumber());
    dispatch(updateValue(Number(temp[index].price)));
  };

  return (
    <div className={checkoutStyles.basketItemContainer}>
      <div className={checkoutStyles.basketItemLeft}>
        <div className={checkoutStyles.basketPictureWrapper}>
          <Image src={item.featuredImage} fill />
        </div>
        <div>
          <h1 className={checkoutStyles.checkoutCardItemTitle}>{`${
            item?.name?.substring(0, 23) || item?.title?.substring(0, 23)
          }...`}</h1>
          <p>{item?.color}</p>
          <p>{item?.size}</p>
        </div>
      </div>
      <div className={checkoutStyles.basketItemCounter}>
        <p
          style={{ cursor: "pointer", userSelect: "none" }}
          onClick={handleDecrement}
        >
          -
        </p>
        <p style={{ userSelect: "none" }}>{item.quantity}</p>
        <p
          style={{ cursor: "pointer", userSelect: "none" }}
          onClick={handleIncrement}
        >
          +
        </p>
      </div>
      <p className={checkoutStyles.checkoutCardPrice}>
        $ {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}0
      </p>
    </div>
  );
}
