import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import styles from "../../styles/ProductPage.module.css";
export default function ProductAccordion({ title, data }) {
  const [opened, setOpened] = useState(false);
  return (
    <div className={styles.accordion}>
      <div className={styles.accordionHeader}>
        <h1>{title}</h1>
        <BsChevronDown
          color="#B17A7A"
          size={20}
          onClick={() => setOpened((prev) => !prev)}
        />
      </div>

      <p style={{ display: opened ? "block" : "none" }}>{data}</p>
    </div>
  );
}
