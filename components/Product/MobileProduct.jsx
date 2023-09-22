import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { BsShare } from "react-icons/bs";
import ColorPicker from "./ColorPicker";
import OptionSelected from "./OptionSelected";
import SizePicker from "./SizePicker";
import { TfiWorld } from "react-icons/tfi";
import { FiCopy } from "react-icons/fi";
import ProductAccordion from "./ProductAccordion";
import SubscribeForm from "../subscribe/SubscribeForm";
import Slider from "react-slick";
import Link from "next/link";
import { UserContext } from "../../context/UserContext";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useRouter } from "next/router";
import { CartContext } from "../../context/CartContext";
import { useDispatch } from "react-redux";
import { incrementNumber, updateValue } from "../../redux/features/cart";
import styles from "../../styles/ProductPage.module.css";
import itemCardStyles from "../../styles/ItemCard.module.css";

export default function MobileProduct({ product, previewProducts }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  const [user, setUser] = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext);

  const [selectedImage, setSelectedImage] = useState('');
  const [favorited, setFavorited] = useState(
    user?.favoriteItems?.includes(product?.id)
  );
  const [colorSelected, setColorSelected] = useState("grey");
  const [sizeSelected, setSizeSelected] = useState("s");
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedImage(product?.featuredImage)
  }, [product?.featuredImage])

  const handleFavorite = async () => {
    if (user?.email) {
      setFavorited((prev) => !prev);
      let params = {
        user,
        id: product?.id,
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
        temp.favoriteItems.push(product?.id);
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
    if (product?.totalInventory > 0) {
      if (
        cart.filter((e) => e.handle === product?.handle).length === 0 ||
        cart.length === 0
      ) {
        let selectedProduct = product;
        selectedProduct.quantity = 1;
        setCart([...cart, selectedProduct]);
      }
      dispatch(incrementNumber());
      dispatch(updateValue(Number(product?.price)));
      router.push("/payment");
    }
  };

  return (
    <div>
      <div className={styles.mobileProductHeader}>
        <h1 className={styles.productInfoTitle}>
          {product?.title} {product?.totalInventory === 0 && "(SOLD OUT)"}
        </h1>
        <BsShare size={20} />
      </div>
      <div className={styles.mobileImageContainer}>
        <div
          className={`${styles.mobileImageWrapper} ${styles.mainImageWrapper}`}
        >
          {favorited ? (
            <AiFillHeart
              size={40}
              color="red"
              className={itemCardStyles.itemFavoriteBtn}
              onClick={() => handleFavorite()}
            />
          ) : (
            <AiOutlineHeart
              className={itemCardStyles.itemFavoriteBtn}
              size={40}
              onClick={() => handleFavorite()}
            />
          )}
          <Image src={selectedImage} fill alt={product?.title} style={{objectFit:'contain'}} />  
        </div>
        <div className={styles.mobileImageSecondaryWrapper}>
          {product?.images?.map((image, index) => (
            <div
              onClick={() => setSelectedImage(image.node.url)}
              key={index}
              className={`${styles.mobileImageWrapper} ${styles.secondaryImageWrapper}`}
            >
              <Image src={image.node.url} fill alt={product?.title} />
            </div>
          ))}
        </div>
      </div>
      <div style={{ paddingLeft: "5%", backgroundColor:'white' }}>
        <h1 className={styles.productInfoPrice}>
          $ {product?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}0 <span style={{fontSize: 16}}>/including of all tax</span>
        </h1>
      </div>
      <div style={{ paddingLeft: "5%", paddingTop: "5%" }}>
        {product?.Size && (
          <div>
            <SizePicker
              sizes={product?.Size}
              sizeSelected={sizeSelected}
              setSizeSelected={setSizeSelected}
            />
            <OptionSelected attribute="Size" value={sizeSelected} />
          </div>
        )}
         {(product?.totalInventory && product.totalInventory < 5) && (
            <div className={styles.productShippingInfo}>
              <FiCopy size={20} />
              <p>Low stock - {product.totalInventory} left</p>
            </div>
          )}
        <button
          onClick={handleFavorite}
          className={styles.sourceBtn}
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            gap: 10,
            backgroundColor: "white",
            fontFamily: "Petrona",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: 16,
            padding: "15px 0",
            color: "#000000",
            border: "1px solid white",
            boxShadow: "0px 0px 25px rgb(0 0 0 / 15%) ",
          }}
        >
          {favorited ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
          Add to My Wish List
        </button>
      </div>
      <div className={styles.mobileBreaker} />
      <div>
        <ProductAccordion
          title="SHIPPING & DELIVERY"
          data={"Orders are processed within 24 hours and delivered within 3-5 business days. Customers will receive a tracking number via email once their order has shipped. We do not currently offer international shipping. All sales are final."}
        />
         <ProductAccordion
          title="Disclaimer"
          data={`Please review all photos. Our items come in new to lightly used condition. Due to being previously owned, they may not always be immaculate or "store fresh" condition.
          All items undergo an extensive authenticity verification process by our team of in-house specialists, outside product experts, and sometimes the Brands themselves, before they ever go on the sales floor.`}
        />
        <ProductAccordion
          title="Refund Policy"
          data={`ALL SALES ARE FINAL. There are no returns or exchanges, please be completely sure of your purchase! However we are happy to assist you with any questions regarding our merchandise. The fastest and easiest way to reach us is through our customer service email: info@poshconsignment.com`}
        />
      </div>
      <div className={styles.mobileBreaker} />
      <h1 className={styles.recommendationTitle}>You might Also like...</h1>
      <Slider {...settings}>
        {previewProducts?.map((bag, index) => (
          <Link
            key={index}
            href={`/product/${bag.node.handle}`}
            className={styles.recommendationCard}
          >
            <Image
              src={bag.node.featuredImage?.url}
              width={300}
              height={300}
              style={{ margin: "0 auto" }}
              alt={bag.node.title}
            />
            <h1>{bag.node.title}</h1>
            <p>$ {bag.node.variants?.edges[0].node.price.amount}</p>
          </Link>
        ))}
      </Slider>
      <SubscribeForm />
      <button onClick={handleCart} className={styles.mobileBuy}>
        {product?.totalInventory > 0 ? "Add to bag" : "Sold out"}
      </button>
    </div>
  );
}
