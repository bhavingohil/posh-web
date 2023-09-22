import React from "react";
import styles from "../../styles/ProductPage.module.css";

export default function SizePicker({ setSizeSelected, sizeSelected, sizes }) {
  return (
    <div className={styles.sizePickerSection}>
      {sizes?.includes("Small") && (
        <p
          onClick={() => setSizeSelected("s")}
          className={sizeSelected === "s" ? styles.sizeActive : ""}
        >
          S
        </p>
      )}
      {sizes?.includes("Medium") && (
        <p
          onClick={() => setSizeSelected("m")}
          className={sizeSelected === "m" ? styles.sizeActive : ""}
        >
          M
        </p>
      )}
      {sizes?.includes("Large") && (
        <p
          onClick={() => setSizeSelected("l")}
          className={sizeSelected === "l" ? styles.sizeActive : ""}
        >
          L
        </p>
      )}
      {sizes?.includes("Extra Large") && (
        <p
          onClick={() => setSizeSelected("xl")}
          className={sizeSelected === "xl" ? styles.sizeActive : ""}
        >
          XL
        </p>
      )}
    </div>
  );
}
