import React, { useContext, useEffect } from "react";
import Footer from "../components/Footer/Footer";
import ItemCard from "../components/ItemCard";
import { UserContext } from "../context/UserContext";
import { useWindowWidth } from "../utils/useWindowWidth";
import { useState } from "react";
import bg from "../public/shop-header.webp";
import ShopPreview from "../components/ShopPreview/ShopPreview";
import Homestyles from "../styles/Home.module.css";
import styles from "../styles/Shop.module.css";
import previewStyles from "../styles/ShopPreview.module.css";
import { useRouter } from "next/router";

export default function Obsessions({ setBasketOpen }) {
  const innerWidth = useWindowWidth();
  const router = useRouter()
  const [user] = useContext(UserContext);
  const [favorites, setfavorites] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if(!user || user.error){
      router.push('/login')
    }else{
      let params = {
        user,
      };
      const fetchWishlist = async () => {
        setFetching(true);
        const res = await fetch("/api/getWishlist", {
          method: "POST",
          body: JSON.stringify(params),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setfavorites(data);
        setFetching(false);
      };
      fetchWishlist();
    }
   
  }, [user]);

  if (!fetching) {
    return (
      <div className={Homestyles.container}>
        <div
          className={styles.shopHeader}
          style={{ backgroundImage: `url(${bg.src})` }}
        >
          <h1>My Obsessions</h1>
          {innerWidth > 800 && (
            <ul>
              <li>clothing</li>
              <li>jewellery</li>
              <li>shoes</li>
              <li>bags</li>
            </ul>
          )}
        </div>
        <div className={styles.shopItemsContainer}>
          <p className={styles.shopPage} style={{ paddingLeft: 50 }}>
            Home/<span>Wishlist</span>
          </p>

          {favorites.length > 0 ? (
            <div className={previewStyles.previewShopSection}>
              {favorites.map((bag, index) => {
                if (bag.title) {
                  return (
                    <ItemCard
                      setBasketOpen={setBasketOpen}
                      handle={bag.handle}
                      key={index}
                      name={bag.title}
                      price={bag.price}
                      src={bag.featuredImage}
                      id={bag.id}
                      totalInventory={bag.totalInventory}
                      variantId={bag.variantId}
                    />
                  );
                }
              })}
            </div>
          ) : (
            <h1 className={styles.emptyWishlist}>No Items Yet</h1>
          )}
        </div>

        <ShopPreview
          title={"You might also like..."}
          setBasketOpen={setBasketOpen}
        />
        <Footer />
      </div>
    );
  }
}
