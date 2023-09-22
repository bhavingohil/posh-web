import "../styles/globals.css";
import "react-dropdown/style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Nav from "../components/Nav/Nav";
import { useState } from "react";
import BasketInfo from "../components/Checkout/BasketInfo";
import { useWindowWidth } from "../utils/useWindowWidth";
import Head from "next/head";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { QueryClient, QueryClientProvider } from "react-query";
import checkoutStyles from "../styles/Checkout.module.css";

export default function MyApp({ Component, pageProps }) {
  const [basketOpen, setBasketOpen] = useState(false);
  const [user, setUser] = useState();
  const [cart, setCart] = useState([]);
  const innerWidth = useWindowWidth();

  const queryClient = new QueryClient();

  return (
    <>
      <Head>
        <title>POSH</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;600&family=Inter&family=Marcellus+SC&family=Petrona:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <CartContext.Provider value={{ cart, setCart }}>
            <UserContext.Provider value={[user, setUser]}>
              <Nav setBasketOpen={setBasketOpen} />
              {basketOpen && innerWidth > 800 && (
                <>
                  <div
                    onClick={() => setBasketOpen(false)}
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      width: "100vw",
                      height: "100%",
                      zIndex: 50,
                    }}
                  ></div>
                  <div className={checkoutStyles.modalBasketContainer}>
                    <BasketInfo
                      setBasketOpen={setBasketOpen}
                      screen="/payment"
                      shadow
                    >
                      <div className={checkoutStyles.navBasketInfoHeader}>
                        <h1>Basket</h1>
                        <p onClick={() => setBasketOpen(false)}>close</p>
                      </div>
                    </BasketInfo>
                  </div>
                </>
              )}
              <Component
                {...pageProps}
                basketOpen={basketOpen}
                setBasketOpen={setBasketOpen}
              />
            </UserContext.Provider>
          </CartContext.Provider>
        </Provider>
      </QueryClientProvider>
    </>
  );
}
