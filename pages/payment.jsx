import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import CartHeader from "../components/Checkout/CartHeader";
import Footer from "../components/Footer/Footer";
import { useWindowWidth } from "../utils/useWindowWidth";
import Homestyles from "../styles/Home.module.css";
import Basket from "../components/Checkout/Basket";
import { CartContext } from "../context/CartContext";
import styles from "../styles/Payment.module.css";
import checkoutStyles from "../styles/Checkout.module.css";

export default function Payment() {
  const innerWidth = useWindowWidth();
  const { cart } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    if (checked) {
      setError("");
      let checkout = [];
      cart.map((e) =>
        checkout.push({ variantId: e.variantId, quantity: e.quantity })
      );
      const response = await fetch("/api/handlePayment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: checkout }),
      }).then((res) => res.json()).catch((e) => console.log("error ", e));
      
      if(response){
        window.location.href = response.webUrl;
      }else{
        setError('An error has occurred, please try again')
      }
    } else {
      setError("Please accept our terms & conditions");
    }
  };

  useEffect(() => {
    setTotal(0);
    cart.map((e) => setTotal((prev) => prev + Number(e.price) * e.quantity));
  }, [cart]);

  return (
    <div className={Homestyles.container}>
      {innerWidth > 1000 ? (
        <div>
          <div className={styles.paymentPage}>
            <div className={checkoutStyles.shippingInfoContainer}>
              <h1 className={checkoutStyles.deliveryDetailsTitle}>
                Payment method
              </h1>
              <div className={styles.paymentContainer}>
                <h1>{`US$ ${total
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.00`}</h1>
                <div className={styles.termsOfService}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => setChecked((prev) => !prev)}
                  />
                  <p style={{textAlign:'left'}}>I have read the terms and conditions and refund policy.</p>
                </div>
                {error && (
                  <p
                    style={{
                      color: "red",
                      textDecoration: "none",
                      margin: "10px 0",
                      textAlign: "center",
                    }}
                  >
                    {error}
                  </p>
                )}
                <button
                  className={checkoutStyles.basketButton}
                  onClick={handlePayment}
                >
                  proceed to payment
                </button>
                <div
                  style={{
                    width: "100%",
                    height: 45,
                    position: "relative",
                    marginTop: 22,
                  }}
                >
                  <Image src={"/cards.webp"} fill />
                </div>
              </div>
            </div>
            <Basket screen="/" buttonTitle={'Continue Shopping'}>
              <h1
                style={{
                  fontFamily: "Marcellus SC",
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: 28,
                  paddingBottom: 20,
                  letterSpacing: "0.02em",
                  color: "#BB7F7F",
                }}
              >
                Basket
              </h1>
            </Basket>
          </div>
          <Footer />
        </div>
      ) : (
        <div className={checkoutStyles.mobileCart}>
          <CartHeader />
          <div className={styles.shippingInfoContainer2}>
            <h1 className={checkoutStyles.deliveryDetailsTitle}>
              Payment method
            </h1>
            <div className={styles.paymentContainer}>
              <h1>{`US$ ${total
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.00`}</h1>
              <div className={styles.termsOfService}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => setChecked((prev) => !prev)}
                />
                <p style={{textAlign:'left'}}>I have read the terms and conditions and refund policy.</p>
              </div>
              {error && (
                <p
                  style={{
                    color: "red",
                    textDecoration: "none",
                    margin: "10px 0",
                    textAlign: "center",
                  }}
                >
                  {error}
                </p>
              )}
              <button
                className={checkoutStyles.basketButton}
                onClick={handlePayment}
              >
                proceed to payment
              </button>
              <div
                style={{
                  width: "100%",
                  height: 45,
                  position: "relative",
                  marginTop: 22,
                }}
              >
                <Image src={"/cards.webp"} fill />
              </div>
            </div>
          </div>
          <div className={styles.mobileShippingButton}>
            <Link href={"/"}>
              <button className={checkoutStyles.basketButton}>HOME</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
