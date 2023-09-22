import React from "react";
import styles from "../styles/Shop.module.css";

export default function ShopFilter({
  filter,
  deleteFilter,
  filterByPrice,
  price,
  setPrice,
}) {
  return (
    <div className={styles.filters}>
      <p>Filter by category</p>
      <ul>
        <div>
          <input
            type={"checkbox"}
            name={"On Sale"}
            value={"On Sale"}
            onChange={(e) => {
              if (e.target.checked) {
                filter(e.target.value);
              } else {
                deleteFilter(e.target.value);
              }
            }}
          />
          <label>On Sale</label>
        </div>
        <div>
          <input
            type={"checkbox"}
            name={"Handbags"}
            value={"Handbags"}
            onChange={(e) => {
              if (e.target.checked) {
                filter(e.target.value);
              } else {
                deleteFilter(e.target.value);
              }
            }}
          />
          <label>Handbags</label>
        </div>
        <div>
          <input
            type={"checkbox"}
            name={"Dufflebags"}
            value={"Dufflebags"}
            onChange={(e) => {
              if (e.target.checked) {
                filter(e.target.value);
              } else {
                deleteFilter(e.target.value);
              }
            }}
          />
          <label>Dufflebags</label>
        </div>{" "}
        <div>
          <input
            type={"checkbox"}
            name={"Jewelry"}
            value={"Jewelry"}
            onChange={(e) => {
              if (e.target.checked) {
                filter(e.target.value);
              } else {
                deleteFilter(e.target.value);
              }
            }}
          />
          <label>Jewelry</label>
        </div>
        <div>
          <input
            type={"checkbox"}
            name={"Accessories"}
            value={"Accessories"}
            onChange={(e) => {
              if (e.target.checked) {
                filter(e.target.value);
              } else {
                deleteFilter(e.target.value);
              }
            }}
          />
          <label>Accessories</label>
        </div>{" "}
        <div>
          <input
            type={"checkbox"}
            name={"Women's Shoes"}
            value={"Women's Shoes"}
            onChange={(e) => {
              if (e.target.checked) {
                filter(e.target.value);
              } else {
                deleteFilter(e.target.value);
              }
            }}
          />
          <label>Women's Shoes</label>
        </div>
        <div>
          <input
            type={"checkbox"}
            name={"Women's Sneakers"}
            value={"Women's Sneakers"}
            onChange={(e) => {
              if (e.target.checked) {
                filter(e.target.value);
              } else {
                deleteFilter(e.target.value);
              }
            }}
          />
          <label>Women's Sneakers</label>
        </div>
        <div>
          <input
            type={"checkbox"}
            name={"Women's Clothing"}
            value={"Women's Clothing"}
            onChange={(e) => {
              if (e.target.checked) {
                filter(e.target.value);
              } else {
                deleteFilter(e.target.value);
              }
            }}
          />
          <label>Women's Clothing</label>
        </div>
      </ul>
      <p>Filter by Condition</p>
      <ul
        onChange={(e) => {
          if (e.target.checked) filter(e.target.value);
          else deleteFilter(e.target.value);
        }}
      >
        <div>
          <input type={"checkbox"} name="condition" value={"Prestine"} />
          <label>Pristine</label>
        </div>
        <div>
          <input type={"checkbox"} name="condition" value={"new"} />
          <label>Like New</label>
        </div>
        <div>
          <input type={"checkbox"} name="condition" value={"good"} />
          <label>Very Good</label>
        </div>
        <div>
          <input type={"checkbox"} name="condition" value={"used"} />
          <label>Used</label>
        </div>
      </ul>
      <p>FILTER BY PRICE - $ {price}</p>
      <div>
          <input type="number" placeholder={'Max. Price'} min={20} max={10000} style={{padding: 3, borderWidth:1, borderRadius: 5, fontSize: 18, borderColor:'#cecece', fontFamily:'Open Sans', width:'100%'}} onChange={(e) => {
            const value = e.target.value;
            if(!isNaN(value)){
              setPrice(Number(value))
            }
            filterByPrice()
          }} />
      </div>
    </div>
  );
}
