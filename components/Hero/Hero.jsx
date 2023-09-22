import styles from "../../styles/Hero.module.css";
import React from "react";
import bg from "../../public/Hero.png";
import MobileHero from "./MobileHero";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      <div className={styles.visibleDesktop}>
      <div
          className={styles.heroContainer}
          style={{ backgroundImage: `url(${bg.src})` }}
        >
          <div>
            <h1>100% Authenticity Guaranteed</h1>
            <Link href={"/authenticity"}>
              <button>Read More</button>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.visibleMobile}>
        <MobileHero />
      </div>
    </>
  );
}
