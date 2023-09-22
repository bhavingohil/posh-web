import React from "react";
import styles from "../../styles/ProductPage.module.css";

export default function ColorSelector({ color, setColorSelected, small }) {
  return (
    <div
      className={`${small ? styles.smallColorPicker : styles.colorPicker}`}
      style={{ backgroundColor: color }}
      onClick={() => setColorSelected(color)}
    />
  );
}
