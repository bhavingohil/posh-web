import styles from "../../styles/ShopPreview.module.css";
import Link from "next/link";
import React, { useState } from "react";
import { useWindowWidth } from "../../utils/useWindowWidth";
import ItemCard from "../ItemCard";

export default function ShopPreview({
  title,
  description,
  menu,
  basketOpen,
  setBasketOpen,
  products,
}) {
  const [linkActive, setLinkActive] = useState("latest");
  const innerWidth = useWindowWidth();

  return (
    <div className={styles.shopPreviewContainer}>
      <h1>{title && title}</h1>
      <p>{description && description}</p>
      {menu && (
        <ul className={styles.shopPreviewMenu}>
          <li
            className={linkActive === "latest" ? styles.active : ""}
            onClick={() => setLinkActive("latest")}
          >
            latest
          </li>
          <li
            className={linkActive === "trending" ? styles.active : ""}
            onClick={() => setLinkActive("trending")}
          >
            {" "}
            vintage
          </li>
          <li
            className={linkActive === "best" ? styles.active : ""}
            onClick={() => setLinkActive("best")}
          >
            best seller
          </li>
          {innerWidth > 500 && (
            <li
              className={linkActive === "all" ? styles.active : ""}
              onClick={() => setLinkActive("all")}
            >
              <Link href={"/shop"}>shop all</Link>
            </li>
          )}
        </ul>
      )}
      <div className={styles.previewShopSection}>
        {(products && Array.isArray(products)) && products?.map((bag, index) => {
          return (
            <ItemCard
              key={index}
              src={bag.node.featuredImage?.url}
              name={bag.node.title}
              price={bag.node.variants?.edges[0].node.price.amount}
              handle={bag.node.handle}
              id={bag.node.id}
              basketOpen={basketOpen}
              setBasketOpen={setBasketOpen}
              totalInventory={bag.node.totalInventory}
              variantId={bag.node.variants.edges[0].node.id}
            />
          )
        })}
      </div>
      <Link href="/shop">
        <button
          className={
            innerWidth > 500 ? styles.webShopAllBtn : styles.mobileShopAllBtn
          }
        >
          {innerWidth > 500 ? "SHOP ALL" : "VIEW ALL"}
        </button>
      </Link>
    </div>
  );
}
