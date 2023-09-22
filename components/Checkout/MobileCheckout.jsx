import React from "react";
import CheckoutCard from "./CheckoutCard";
import checkoutStyles from "../../styles/Checkout.module.css";

export default function MobileCheckout() {
  return (
    <div className={checkoutStyles.mobileCheckoutBasket}>
      <CheckoutCard />
      <CheckoutCard />
    </div>
  );
}
