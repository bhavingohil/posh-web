import React from "react";
import styles from "../../styles/ListingSection.module.css";
import Image from "next/image";
import Link from "next/link";
export default function ListingSection() {
  return (
    <div className={styles.listingContainer}>
      <div className={styles.listingPicturesContainer}>
        <div className={styles.listingPictureContainer1}>
          <Image
            src={"/contact-1.webp"}
            fill
            style={{
              objectFit: "contain",
              width: "100%",
              zIndex: 997,
            }}
            alt="listing"
            priority
          />
        </div>
      </div>
      <div className={styles.listingSectionInfo}>
        <p>Create an Account</p>
        <h1>Get updates on your favorite items</h1>
        <p>
          Create an account to get updates on your favorite clothes, dressed,
          bags, shoes, jewelry, and accessories. Create wish lists, and be the
          first to receive exclusive deals and offers.
        </p>
        <div className={styles.listingSectionCta}>
          <button>
            <Link href={"/signup"}>Get Started </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
