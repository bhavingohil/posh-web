import React from "react";
import styles from "../../styles/ProductPage.module.css";

export default function OptionSelected({ attribute, value }) {
  return (
    <p className={styles.colorSelected}>
      {attribute}: <span>{value}</span>
    </p>
  );
}
