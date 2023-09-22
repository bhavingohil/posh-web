import React from "react";
import ColorSelector from "./ColorSelector";
import styles from "../../styles/ProductPage.module.css";

export default function ColorPicker({ setColorSelected, colors }) {
  return (
    <div className={styles.productInfoPrice}>
      {colors?.map((color) => (
        <ColorSelector color={color} setColorSelected={setColorSelected} />
      ))}
    </div>
  );
}
