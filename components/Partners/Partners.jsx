import Image from "next/image";
import React from "react";
import { desktopPartners, mobilePartners } from "../../constants/Partners";
import { useWindowWidth } from "../../utils/useWindowWidth";
import styles from "../../styles/Partners.module.css";

export default function Partners() {
  const innerWidth = useWindowWidth();
  return (
    <div className={styles.partnersWrapper}>
      {innerWidth > 888
        ? desktopPartners.map((partner, index) => (
            <Image
              className={styles.partnerLogo}
              src={partner.src}
              width={partner.width}
              height={partner.height}
              key={index}
              alt="partners logo"
            />
          ))
        : mobilePartners.map((partner, index) => (
            <Image
              src={partner.src}
              width={partner.width}
              height={partner.height}
              key={index}
              alt="partners logo"
            />
          ))}
    </div>
  );
}
