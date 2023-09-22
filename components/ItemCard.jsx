import React, { useContext, useEffect, useMemo, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import { UserContext } from "../context/UserContext";
import { useRouter } from "next/router";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { CartContext } from "../context/CartContext";
import { useDispatch } from "react-redux";
import { incrementNumber, updateValue } from "../redux/features/cart";
import styles from "../styles/ItemCard.module.css";
import moment from 'moment'

export default function ItemCard({
  src,
  name,
  price,
  handle,
  id,
  setBasketOpen,
  totalInventory,
  variantId,
  basketOpen,
  createdAt
}) {
  const [hovered, setHovered] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [heartHovered, setHeartHovered] = useState(false);

  const { cart, setCart } = useContext(CartContext);
  const [user, setUser] = useContext(UserContext);
  const dispatch = useDispatch();
  const router = useRouter();
  const isNewArrival = useMemo(() => {
    if(createdAt){
      const days = moment(createdAt).diff(moment(), 'days')
      return Math.abs(days) < 5
    }
    return false
  })

  const handleRemoveFavorite = async () => {
    if (user?.email) {
      setFavorited((prev) => !prev);

      let temp = { ...user };
      let index = temp.favoriteItems.indexOf(id);
      if (index > -1) {
        temp.favoriteItems.splice(index, 1);
      }

      let params = {
        user: temp,
        id,
      };
      setUser(temp);

      const res = await fetch("/api/removeFromWishlist", {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      router.push("/login");
    }
  };

  const handleFavorite = async () => {
    if (user?.email) {
      setFavorited((prev) => !prev);
      let params = {
        user,
        id,
      };
      const res = await fetch("/api/addToWishlist", {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (user.wishlistId) {
        let temp = { ...user };
        temp.favoriteItems.push(id);
        setUser(temp);
      } else {
        setUser({
          ...user,
          wishlistId: data.wishlistId,
          favoriteItems: data.favoriteItems,
        });
      }
    } else {
      router.push("/login");
    }
  };

  const handleCart = async () => {
    if (
      cart.filter((e) => e.handle === handle).length === 0 ||
      cart.length === 0
    ) {
      let selectedProduct = {
        handle,
        featuredImage: src,
        name,
        price,
        id,
        variantId,
      };
      if (selectedProduct?.quantity) {
        selectedProduct.quantity++;
      } else {
        selectedProduct.quantity = 1;
      }
      setCart([...cart, selectedProduct]);
      dispatch(incrementNumber());
      dispatch(updateValue(Number(price)));
    }
    setBasketOpen(true);
  };

  const handleDirectBuy = async () => {
    if (totalInventory > 0) {
      if (
        cart.filter((e) => e.handle === handle).length === 0 ||
        cart.length === 0
      ) {
        let selectedProduct = {
          featuredImage: src,
          name,
          price,
          handle,
          id,
          quantity: 1,
          variantId,
        };
        dispatch(incrementNumber());
        dispatch(updateValue(Number(price)));
        setCart([...cart, selectedProduct]);
      }
      router.push("/payment");
    }
  };

  useEffect(() => {
    setFavorited(user?.favoriteItems?.includes(id));
  }, [user]);

  return (
    <div style={{ width: "100%", position: "relative" }}>
      {totalInventory === 0 && (
         <div style={{position: "absolute", zIndex: 998, left: 0, top: 0, backgroundColor:'black', color:'white', fontFamily:'Petrona', padding: 5, borderRadius: 5, fontSize: 14, fontFamily:'bold' }}>Sold Out</div>
      )}
      {isNewArrival && (
        <div style={{position: "absolute", zIndex: 998, left: 0, top: 0, backgroundColor:'black', color:'white', fontFamily:'Petrona', padding: 5, borderRadius: 5, fontSize: 14, fontFamily:'bold' }}>New Arrival</div>
      )}
      
      <div
        style={{ position: "relative" }}
        className={styles.itemContainer}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className={styles.itemPhotoContainer}>
          <Link href={`/product/${handle}`} className={styles.shopItemWrapper}>
            <Image src={src || '/no-img.png'} fill alt={handle} className={styles.customImg} />
          </Link>
          {hovered && !favorited ? (
            <div
              onMouseEnter={() => setHeartHovered(true)}
              onMouseLeave={() => setHeartHovered(false)}
              className={styles.itemFavoriteBtn}
              onClick={handleFavorite}
            >
              {!heartHovered ? (
                <AiOutlineHeart size={25} />
              ) : (
                <AiFillHeart fill="red" size={25} />
              )}
            </div>
          ) : (
            hovered &&
            favorited && (
              <AiFillHeart
                fill="red"
                size={35}
                className={styles.itemFavoriteBtn}
                onClick={handleRemoveFavorite}
              />
            )
          )}
          <p
            onClick={handleDirectBuy}
            style={{ padding: hovered ? 5 : 0, zIndex: 998 }}
          >
            {hovered ? (totalInventory > 0 ? "BUY NOW" : "SOLD OUT") : ""}
          </p>
        </div>
        <h1>{name.substring(0, 15)}...</h1>
        <p>${price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}0</p>
      </div>
      {totalInventory > 0 && (
        <AiOutlinePlusCircle
          className={styles.plusIcon}
          size={25}
          onClick={handleCart}
        />
      )}
    </div>
  );
}
