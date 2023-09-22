import React from "react";
import DesktopProduct from "../../components/Product/DesktopProduct";
import { useWindowWidth } from "../../utils/useWindowWidth";
import MobileProduct from "../../components/Product/MobileProduct";
import Footer from "../../components/Footer/Footer";
import styles from "../../styles/Home.module.css";
import { useQuery } from "react-query";
import { useRouter } from "next/router";

export default function ProductPage({ setBasketOpen }) {
  const innerWidth = useWindowWidth();
  const router = useRouter();
  const { handle } = router.query;

  const { data: product } = useQuery(
    "Product",
    async () => {
      const res = await fetch("/api/getProductById", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ handle }),
      });

      return await res.json();
    },
    { enabled: handle?.length > 0 }
  );

  const { data: previewProducts } = useQuery("Products", async () => {
    const res = await fetch("/api/getProducts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: 4 }),
    });
    return await res.json();
  });

  return (
    <div className={`${styles.container} ${styles.descriptionContainer}`}>
      {innerWidth > 800 ? (
        <DesktopProduct
          product={product}
          setBasketOpen={setBasketOpen}
          previewProducts={previewProducts}
        />
      ) : (
        <MobileProduct
          product={product}
          setBasketOpen={setBasketOpen}
          previewProducts={previewProducts}
        />
      )}
      <Footer />
    </div>
  );
}
