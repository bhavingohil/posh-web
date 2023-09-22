import React from "react";
import bg from "../../public/Hero.png";
import Link from "next/link";
import styles from "../../styles/Hero.module.css";

export default function MobileHero() {
  return (
    <div>
      <div
        className={styles.mobileHero}
        style={{ backgroundImage: `url(${bg.src})` }}
      >
        <div>
          <h1>100% Authenticity Guaranteed</h1>
          <button>
            <Link href={"/authenticity"}>Read More</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
