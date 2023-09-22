import React, { useState } from "react";
import { AiOutlineHeart, AiOutlineShopping, AiFillHeart, AiOutlineUser } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import { IoLogoFacebook, IoLogoInstagram } from "react-icons/io5";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import styles from "../../styles/Nav.module.css";

const aspectRatio = 500/81
const logoSize = 230

export default function DesktopNav({ setBasketOpen, user, setUser }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [heartHovered, setHeartHovered] = useState(false);

  const router = useRouter();

 
  const cartValue = useSelector((state) => state.cartValue.value);

  const handleLogout = async () => {
    await fetch("/api/logout");
    setUser(null);
    router.push("/");
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        background: "white",
        zIndex: 999,
      }}
    >
      <div className={styles.navBanner}>
        <div className={styles.navIcons}>
          <Link
            target="__blank"
            href={"https://www.facebook.com/poshconsignmentbyv?mibextid=LQQJ4d"}
          >
            <IoLogoFacebook size={20} className={styles.bannerIcon} />
          </Link>
          <Link
            target="__blank"
            href={"https://www.instagram.com/poshconsignmentboca/"}
          >
            <IoLogoInstagram size={20} className={styles.bannerIcon} />
          </Link>
        </div>
        <h1>
          Free Shipping on all orders over $250 or more&nbsp;
          <span className={styles.bannerCta}>
            <Link href={"/shop"}>Shop now</Link>
          </span>
        </h1>
        <h1>
          <span className={styles.bannerCta}>
            <Link href={"/contact"}>Get directions</Link>
          </span>
        </h1>
      </div>
      <div className={styles.navWrapper}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <ul className={styles.navLinks}>
            <li>
              <Link href={"/"}>HOME</Link>
            </li>
          </ul>
          <Link href={"/"}>
            <Image
              src="/logo1.png"
              width={logoSize}
              height={logoSize/aspectRatio}
              className={styles.navLogo}
              style={{marginBottom: -5}}
              alt="posh logo"
            />
          </Link>
          <ul className={styles.navLinks}>
          <li>
              <Link href={"/shop"}>SHOP</Link>
            </li>
          </ul>
          {/* <ul className={styles.navLinks}>
          <li
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              CATEGORIES
              <div
                className={`${styles.navDropdown} ${
                  showDropdown ? styles.active : ""
                }`}
              >
                <hr className={styles.dropdownBreak} />

                <div className={styles.navDropdownContent}>
                  <div className={styles.navDropdownCol}>
                    <h1>CLOTHING</h1>
                    <ul>
                      <li>COATS AND JACKETS</li>
                      <li>DRESSES</li>
                      <li>SKIRTS/SETS</li>
                      <li>SHORTS/PANTS</li>
                      <li>TOPS</li>
                      <li>ALL CLOTHING</li>
                    </ul>
                  </div>
                  <div className={styles.navDropdownCol}>
                    <h1>ACCESSORIES</h1>
                    <ul>
                      <li>BELTS</li>
                      <li>JEWELRY</li>
                      <li>SCARVES AND SHAWLS</li>
                      <li>SUNGLASSES</li>
                      <li>WALLETS</li>
                      <li>ALL ACCESSORIES</li>
                    </ul>
                  </div>
                  <div className={styles.navDropdownCol}>
                    <h1>SHOES</h1>
                    <ul>
                      <li>BOOTS</li>
                      <li>FLATS</li>
                      <li>PUMPS</li>
                      <li>SANDALS</li>
                      <li>SNEAKERS</li>
                      <li>ALL SHOES</li>
                    </ul>
                  </div>
                  <div className={styles.navDropdownCol}>
                    <h1>BAGS</h1>
                    <ul>
                      <li>CLUTCHES</li>
                      <li>CROSSBODY</li>
                      <li>HANDBAGS</li>
                      <li>TOTES</li>
                      <li>TRAVEL</li>
                      <li>ALL BAGS</li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </ul> */}
        </div>
        <div className={styles.navCta}>
          {!user || user?.error ? (
            <Link href={"/signup"}><AiOutlineUser size={25} style={{ cursor: "pointer" }} /></Link>
          ) : (
            <div onClick={handleLogout} style={{display:"flex", flexDirection:"row", gap:"10px",cursor: "pointer", justifyItems:"center"}}>   
              Logout         
              <div style={{border: "1px solid black", borderRadius:"9999px"}}  alt={'Logout'}><AiOutlineUser size={25}   /></div>
            </div>
          )}
          <Link href={user ? "/obsessions" : "/login"}>
            <div
              onMouseEnter={() => setHeartHovered(true)}
              onMouseLeave={() => setHeartHovered(false)}
            >
              {heartHovered ? (
                <AiFillHeart
                  size={25}
                  style={{ cursor: "pointer" }}
                  color="red"
                />
              ) : (
                <AiOutlineHeart size={25} style={{ cursor: "pointer" }} />
              )}
            </div>
          </Link>
          <div>
            <AiOutlineShopping
              size={25}
              onClick={() => setBasketOpen((prev) => !prev)}
              style={{ cursor: "pointer" }}
            />
            <p>
              {cartValue.numberOfProducts || 0} / $
              {cartValue.cartValue
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || 0.0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
