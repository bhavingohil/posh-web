import styles from "../../styles/Promos.module.css";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Promos() {
  return (
    <div className={styles.promosContainer}>
      <Link href={"/shop"} className={styles.promo}>
        <div className={styles.promoOverlay} />
        <Image
          src={"/promo-1.webp"}
          fill
          className={`${styles.promoImage} ${styles.promoImage1}`}
          alt="promo image"
          priority
        />

        <p>Get your hands on the most exclusive bags</p>
      </Link>
      <Link href={"/shop"} className={styles.promo}>
        <div className={styles.promoOverlay} />
        <Image
          src={"/promo-2.webp"}
          fill
          className={styles.promoImage}
          alt="promo image"
          priority
        />
        <p>Explore the most exclusive collections</p>
        <div className={styles.emptySquarePromo} />
      </Link>
    </div>
  );
}
