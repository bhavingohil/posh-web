import React from "react";
import Footer from "../components/Footer/Footer";
import Link from "next/link";
import homeStyles from "../styles/Home.module.css";
import styles from "../styles/ContactUs.module.css";
import Image from "next/image";

export default function Contact() {
  return (
    <div className={homeStyles.container}>
      <div className={styles.contactPage}>
        <h1 className={styles.contactPageTitle}>Contact US</h1>
        <div className={styles.contactWrapper}>
          <div className={styles.contactInfoContainer}>
            <h1>We're here to help</h1>
            <h2>
              Feel free to reach out to us at <span>(561) 465-5252</span>
            </h2>
            <h2>Monday-Friday 9am - 4pm EST</h2>
            <h2>Saturday-Sunday 10am - 7pm EST</h2>
            <h2>
              Store location:{" "}
              <span>
                <Link
                  target={"_blank"}
                  href={
                    "https://www.google.com/maps/place/40+N+Federal+Hwy,+Boca+Raton,+FL+33432,+USA/@26.350739,-80.0881131,17z/data=!3m1!4b1!4m5!3m4!1s0x88d8e21b4734c99f:0x474e8aa77633380b!8m2!3d26.350739!4d-80.0859244"
                  }
                >
                  40 N Federal Hwy, Boca Raton, FL 33432
                </Link>
              </span>
              <div style={{marginTop:"40px"}}>
                <div>Contact Email:</div>
                <div>info@poshconsignment.com</div>
              </div>
            </h2>

          </div>
          <Link
            href={
              "https://www.google.com/maps/place/26%C2%B021'02.8%22N+80%C2%B005'09.4%22W/@26.3507871,-80.0885315,17z/data=!3m1!4b1!4m4!3m3!8m2!3d26.3507871!4d-80.0859566"
            }
            target="__blank"
            className={styles.mapWrapper}
          >
            <Image src={"/map.webp"} fill style={{ objectFit: "cover" }} />
          </Link>
        </div>

        <Footer />
      </div>
    </div>
  );
}
