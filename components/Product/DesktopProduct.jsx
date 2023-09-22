import Image from "next/image";
import React, { useContext, useState } from "react";
import { FiCopy } from "react-icons/fi";
import ShopPreview from "../ShopPreview/ShopPreview";
import SubscribeForm from "../subscribe/SubscribeForm";
import SizePicker from "./SizePicker";
import OptionSelected from "./OptionSelected";
import { CartContext } from "../../context/CartContext";
import { useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { UserContext } from "../../context/UserContext";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { incrementNumber, updateValue } from "../../redux/features/cart";
import checkoutStyles from "../../styles/Checkout.module.css";
import styles from "../../styles/ProductPage.module.css";
import itemCardStyles from "../../styles/ItemCard.module.css";

export default function DesktopProduct({
  product,
  setBasketOpen,
  previewProducts,
}) {
  const { cart, setCart } = useContext(CartContext);
  const [user, setUser] = useContext(UserContext);
  const [sizeSelected, setSizeSelected] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [favorited, setFavorited] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [linkMenu, setLinkMenu] = useState('shipping')
  const router = useRouter();

  const dispatch = useDispatch();

  const handleCart = async () => {
    if (product.totalInventory > 0) {
      if (
        cart.filter((e) => e.handle === product.handle).length === 0 ||
        cart.length === 0
      ) {
        let selectedProduct = product;
        selectedProduct.quantity = 1;
        setCart([...cart, selectedProduct]);
      }
      setBasketOpen(true);
      dispatch(incrementNumber());
      dispatch(updateValue(Number(product.price)));
    }
  };

  const handleFavorite = async () => {
    if (user?.email) {
      setFavorited((prev) => !prev);
      let params = {
        user,
        id: product.id,
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
        temp.favoriteItems.push(product.id);
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

  useEffect(() => {
    setSelectedImage(product?.featuredImage);
    setFavorited(user?.favoriteItems?.includes(product?.id));
  }, [user, product]);


  return (
    <div style={{ maxWidth: "1300px", margin: "0 auto", width: "100%" }}>
      <p className={styles.productPage}>
        <Link href={"/"}>Home/</Link>
        <span>
          <Link href={"/shop"}>Shop</Link>/Handbag
        </span>
      </p>

      <div className={styles.productInfoMain}>
        <div className={styles.productInfoPicturesWrapper}>
          <div className={styles.productInfoPictures}>
            <div style={{ width: "70%", margin: "0 auto" }}>
              {favorited ? (
                <AiFillHeart
                  size={35}
                  color="red"
                  className={itemCardStyles.itemFavoriteBtn}
                  onClick={() => handleFavorite()}
                />
              ) : (
                <div
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  {!hovered ? (
                    <AiOutlineHeart
                      className={itemCardStyles.itemFavoriteBtn}
                      size={35}
                      onClick={() => handleFavorite()}
                    />
                  ) : (
                    <AiFillHeart
                      size={35}
                      color="red"
                      className={itemCardStyles.itemFavoriteBtn}
                      onClick={() => handleFavorite()}
                    />
                  )}
                </div>
              )}
              <Image
                src={selectedImage}
                fill
                alt="product image"
                className={itemCardStyles.customImg}
              />
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(80px, 100px))",
              gap: 20,
              marginTop: 20,
              cursor: "pointer",
            }}
          >
            {product?.images?.map((image) => (
              <div
                onClick={() => setSelectedImage(image.node.url)}
                className={styles.smallImage}
              >
                <Image src={image.node.url} fill />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.productInfoContent}>
          <div>
            <h1 className={styles.productInfoTitle}>
              {product?.title} {product?.totalInventory === 0 && "(SOLD OUT)"}
            </h1>
            <p style={{paddingTop: 10, paddingBottom: 10, lineHeight: 1.5, fontFamily:'Petrona', color:'#777777'}}>{product?.description}</p>
            <h1 className={styles.productInfoPrice}>
              $&nbsp;
              {product?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              0
            </h1>
          </div>
          <button
              onClick={handleCart}
              className={checkoutStyles.basketButton}
    
            >
              {product?.totalInventory > 0 ? "add to bag" : "SOLD OUT"}
           </button>
           {product?.Size ? (
              <div>
                <SizePicker
                  sizes={product?.Size}
                  sizeSelected={sizeSelected}
                  setSizeSelected={setSizeSelected}
                />
                <OptionSelected attribute="Size" value={sizeSelected} />
              </div>
            ) : (
              <div style={{fontsize: 14, fontFamily: 'Open Sans', letterSpacing: 2}}>SIZE:&nbsp;<span style={{color:'#777'}}>N/A</span></div>
            )}
          <div>
        

            {product?.totalInventory !== 0 && (
              <div style={{marginBottom: 20}}>
              {(product?.totalInventory && product.totalInventory < 5) && (
                <div className={styles.productShippingInfo}>
                <FiCopy size={20} />
                <p>Low stock - {product.totalInventory} left</p>
                </div>
              )}
            </div>
            )}
           
            <button
              onClick={handleFavorite}
              style={{
                alignItems: "center",
                display: "flex",
                width: "100%",
                justifyContent: "center",
                gap: 10,
                backgroundColor: "white",
                fontFamily: "Petrona",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: 16,
                padding: "22px 0",
                color: "#000000",
                border: "1px solid white",
                boxShadow: "0px 0px 25px rgb(0 0 0 / 15%) ",
              }}
              onMouseEnter={() => setButtonHovered(true)}
              onMouseLeave={() => setButtonHovered(false)}
            >
              {buttonHovered ? (
                <AiFillHeart color="red" />
              ) : favorited ? (
                <AiFillHeart color="red" />
              ) : (
                <AiOutlineHeart />
              )}
              Add to My Wish List
            </button>
          </div>
        </div>
      </div>
      <ul className={styles.productInfoMenu}>
        <li onClick={() => setLinkMenu('disclaimer')} style={{textDecoration: linkMenu === 'disclaimer' ? 'underline' : 'none', cursor:'pointer'}}>Disclaimer</li>
        <li onClick={() => setLinkMenu('shipping')} style={{textDecoration: linkMenu === 'shipping' ? 'underline' : 'none', cursor:'pointer'}}>shipping & delivery</li>
        <li onClick={() => setLinkMenu('refund')} style={{textDecoration: linkMenu === 'refund' ? 'underline' : 'none', cursor:'pointer'}}>refund policy</li>
      </ul>
      {linkMenu === 'shipping' && (
        <p className={styles.productDescription}>Orders are processed within 24 hours and delivered within 3-5 business days. Customers will receive a tracking number via email once their order has shipped. We do not currently offer international shipping. All sales are final.</p>
      )}
      {linkMenu === 'disclaimer' && (
        <p className={styles.productDescription}>
          <ul>
                <li style={{paddingBottom: 5}}>Please review all photos. Our items come in new to lightly used condition. Due to being previously owned, they may not always be immaculate or "store fresh" condition. </li>
                <li style={{paddingBottom: 5}}>All items undergo an extensive authenticity verification process by our team of in-house specialists, outside product experts, and sometimes the Brands themselves, before they ever go on the sales floor. </li>
          </ul>
        </p>
      )}
      {linkMenu === 'refund' && (
        <p className={styles.productDescription}>ALL SALES ARE FINAL. There are no returns or exchanges, please be completely sure of your purchase! However we are happy to assist you with any questions regarding our merchandise. The fastest and easiest way to reach us is through our customer service email: info@poshconsignment.com</p>
      )}
      <ShopPreview title="You might Also like..." products={previewProducts} />
      <SubscribeForm />
    </div>
  );
}
