import React, { useEffect, useState } from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { RiShoppingCartLine, RiCustomerService2Fill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import Image from "next/image";
import { AiOutlineClose, AiOutlineRight } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/router";
import { useWindowWidth } from "../../utils/useWindowWidth";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { UserContext } from "../../context/UserContext";
import styles from "../../styles/Nav.module.css";

const aspectRatio = 500/81
const logoSize = 200

export default function MobileNav({ setBasketOpen }) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [yOffset, setYOffset] = useState(0);
  const router = useRouter();
  const innerWidth = useWindowWidth();
  const cartValue = useSelector((state) => state.cartValue.value);

  const [user] = useContext(UserContext);

  const handleScroll = () => {
    setYOffset(window.scrollY);
  };

  useEffect(() => {
    if (showDrawer) {
      document.querySelector("html").style.overflowY = "hidden";
    } else {
      document.querySelector("html").style.overflowY = "scroll";
    }
  }, [showDrawer]);

  useEffect(() => {
    if (router.pathname !== "/checkout") {
      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [router.pathname]);

  return (
    <div>
      <div
        className={styles.mobileNavWrapper}
        style={{
          top: 0
        }}
      >
        <HiOutlineMenuAlt1 size={27} onClick={() => setShowDrawer(true)} />
        <Link href={"/"}>
          <Image
            style={{ left: 13, position: "relative" }}
            src="/logo1.png"
            width={logoSize}
            height={logoSize/aspectRatio}
            alt="posh logo"
          />
        </Link>
        <div>
          <RiShoppingCartLine
            size={27}
            onClick={() =>
              innerWidth > 800
                ? setBasketOpen((prev) => !prev)
                : router.push("/checkout")
            }
          />
          <div
            style={{
              position: "relative",
              top: -10,
              left: -8,
              fontFamily: "Petrona",
              color: "#bb7f7f",
            }}
          >
            <p>{cartValue.numberOfProducts || 0}</p>
          </div>
        </div>
        <div
          className={styles.mobileDrawerContainer}
          style={{
            animationName: showDrawer ? styles.slideIn : styles.slideOut,
            animationDuration: showDrawer ? "0ms" : "500ms",
            background: showDrawer ? "rgba(0, 0, 0, 0.5)" : "transparent",
          }}
        >
          <div
            className={`${styles.mobileDrawer} ${
              showDrawer ? styles.drawerOpen : ""
            }`}
          >
            <div className={styles.mobileDrawerHeader}>
              <AiOutlineClose
                size={30}
                className={styles.drawerCloseBtn}
                onClick={() => setShowDrawer((prev) => !prev)}
              />
              <Link href={"/"} onClick={() => setShowDrawer(false)}>
                <Image
                  src="/Logo.png"
                  width={101}
                  height={30}
                  className={styles.navLogo}
                  alt="posh logo"
                />
              </Link>
            </div>
            <ul className={styles.drawerLinks}>
              <Link onClick={() => setShowDrawer(false)} href={"/"}>
                <li>
                  HOME
                  <AiOutlineRight size={20} />
                </li>
              </Link>

              <Link onClick={() => setShowDrawer(false)} href={"/shop"}>
                <li>
                  SHOP <AiOutlineRight size={20} />
                </li>
              </Link>

              {/* <li onClick={() => setCategoriesOpen((prev) => !prev)}>
                CATEGORY{" "}
                <AiOutlineRight
                  size={20}
                  style={{
                    transform: categoriesOpen ? "rotate(90deg)" : "",
                    transition: "200ms",
                  }}
                />
              </li> */}
            </ul>

            {/* <ul
              className={styles.categoryLinks}
              style={{
                maxHeight: categoriesOpen ? 150 : 0,
              }}
            >
              <li>Clothing</li>
              <li>Accessories</li>
              <li>Shoes</li>
              <li>Bags</li>
            </ul> */}
            <ul className={styles.drawerBottomLinks}>
              <Link onClick={() => setShowDrawer(false)} href={"/login"}>
                <li>
                  {user && !user?.error ? "Logout" : "Login"}
                  <FaRegUser size={21} />
                </li>
              </Link>
              <li>
                Customer Care <RiCustomerService2Fill size={24} />
              </li>
              <Link onClick={() => setShowDrawer(false)} href={"/contact"}>
                <li>
                  Visit our store <IoLocationOutline size={25} />
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
