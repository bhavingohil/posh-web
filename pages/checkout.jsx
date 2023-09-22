import React from "react";
import { useWindowWidth } from "../utils/useWindowWidth";
import homeStyles from "../styles/Home.module.css";
import CartHeader from "../components/Checkout/CartHeader";
import Footer from "../components/Footer/Footer";
import Basket from "../components/Checkout/Basket";
import styles from "../styles/Checkout.module.css";

export default function Checkout({ basketOpen }) {
  const innerWidth = useWindowWidth();

  return (
    <div className={homeStyles.container}>
      {innerWidth > 1000 ? (
        <div>
          <div className={styles.checkoutPage}>
            <div className={styles.shippingInfoContainer}>
              <hr className={styles.hr} />
              <p className={styles.cartSignin}>
                Already have an account? <span>Login</span>
              </p>
              <input
                type="text"
                placeholder="E-mail"
                className={styles.cartInput}
              />
              <h1 className={styles.shippingInfoContainer}>Delivery details</h1>
              <div className={styles.shippingInfoGrid}>
                <input
                  type="text"
                  placeholder="First name"
                  className={styles.cartInput}
                />
                <input
                  type="text"
                  placeholder="Last name"
                  className={styles.cartInput}
                />
                <input
                  type="text"
                  placeholder="Company name (optional)"
                  className={styles.cartInput}
                />
                <input
                  type="text"
                  placeholder="Address line 1"
                  className={styles.cartInput}
                />
                <input
                  type="text"
                  placeholder="Address line 2"
                  className={styles.cartInput}
                />
                <input
                  type="text"
                  placeholder="City"
                  className={styles.cartInput}
                />
                <input
                  type="text"
                  placeholder="State"
                  className={styles.cartInput}
                />
                <input
                  type="text"
                  placeholder="Zip code"
                  className={styles.cartInput}
                />
                <input
                  type="text"
                  placeholder="Phone number"
                  className={styles.cartInput}
                />
              </div>
            </div>
            <Basket basketOpen={basketOpen} screen="/payment">
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
        <div className={styles.mobileCart}>
          <CartHeader />
          <div>
            <Basket screen={"/payment"} />
          </div>
        </div>
      )}
    </div>
  );
}
