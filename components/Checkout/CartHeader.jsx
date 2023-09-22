import React from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/router";
import checkoutStyles from "../../styles/Checkout.module.css";

export default function CartHeader() {
  const router = useRouter();

  return (
    <div className={checkoutStyles.mobileCartHeader}>
      <HiOutlineMenuAlt1 size={27} />
      <h1>Cart</h1>
      <AiOutlineClose size={30} onClick={() => router.back()} />
    </div>
  );
}
