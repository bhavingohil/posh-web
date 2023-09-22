import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import CheckoutCard from "./CheckoutCard";
import { useRouter } from "next/router";
import { UserContext } from "../../context/UserContext";
import checkoutStyles from "../../styles/Checkout.module.css";

export default function BasketInfo({
  basketOpen,
  setBasketOpen,
  children,
  setPage,
  screen,
  shadow,
}) {
  const [total, setTotal] = useState(0);
  const { cart } = useContext(CartContext);
  const [user] = useContext(UserContext);

  const router = useRouter();

  useEffect(() => {
    setTotal(0);
    if (cart.length > 0) {
      cart.map((e) => setTotal((prev) => prev + Number(e.price) * e.quantity));
    }
  }, [cart]);

  const navigate = () => {
    if (!user) {
      router.push("/login");
    } else {
      if (setBasketOpen) {
        setBasketOpen(false);
      }
      if (setPage) {
        setPage(2);
      }
      if (screen) {
        router.push(screen);
      }
    }
  };
  return (
    <div
      className={checkoutStyles.basketInfoContainer}
      style={{
        zIndex: basketOpen ? -1 : 998,
        boxShadow: shadow ? "2px 2px 12px rgba(0, 0, 0, 0.15)" : "",
      }}
    >
      {children}
      {cart.length > 0 && cart.map((item) => <CheckoutCard item={item} />)}

      <div className={checkoutStyles.basketTotalInfo}>
        <div>
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div>
          <p>Discount</p>
          <p>$0.00</p>
        </div>
        <div>
          <p>Total</p>
          <p>${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.00</p>
        </div>
      </div>
      <button onClick={navigate} className={checkoutStyles.basketButton}>
        GO TO SHIPPING
      </button>
    </div>
  );
}
