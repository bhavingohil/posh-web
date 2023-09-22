import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "../../styles/Footer.module.css";
import { IoLogoFacebook, IoLogoInstagram } from "react-icons/io5";

const aspectRatio = 500 / 81;
const logoSize = 250;

export default function Footer() {
  return (
    <div>
      <div className={styles.footer}>
        <div className={styles.footerCol}>
          <Image
            src="/logo1.png"
            width={logoSize}
            height={logoSize / aspectRatio}
            alt="posh logo"
            style={{ objectFit: "contain", marginBottom: 10 }}
          />

          <h1>Follow Us</h1>
          <div className={styles.footerSocialLinks}>
            <Link
              href={
                "https://www.facebook.com/poshconsignmentbyv?mibextid=LQQJ4d"
              }
            >
              <IoLogoFacebook size={20} className={styles.footerIcon} />
            </Link>
            <Link href={"https://www.instagram.com/poshconsignmentboca/"}>
              <IoLogoInstagram size={20} className={styles.footerIcon} />
            </Link>
          </div>
        </div>
        <div className={styles.footerCol}>
          <div>
            <h1>Company</h1>
            <ul>
              {/* <li>About Us</li> */}
              <li>
                <Link href={"/contact"}>Contact</Link>
              </li>
              <li>
                <Link href={"/contact"}>Store Location</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.footerCol}>
          <div>
            <h1>Help</h1>
            <ul>
              <li>Privacy Policy</li>
              <li>
                <Link href={"/terms"}>Terms & Conditions</Link>
              </li>
              <li>
                <Link href={"/authenticity"}>Authenticity Guarantee</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className={styles.footerText}>
        Design and Developed by&nbsp;
        <Link
          href="https://massian-agency.com/"
          target="__blank"
          style={{ cursor: "pointer", textDecoration: "underline" }}
        >
          The Massian Agency
        </Link>
      </p>
    </div>
  );
}
