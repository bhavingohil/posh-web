import React, { useContext } from "react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { UserContext } from "../../context/UserContext";
import styles from '../../styles/Nav.module.css'

export default function Nav({ setBasketOpen }) {
  const [user, setUser] = useContext(UserContext);
  return (
    <>
      <div className={styles.visibleDesktop}>
        <DesktopNav
          setBasketOpen={setBasketOpen}
          user={user}
          setUser={setUser}
        />
      </div>
      <div className={styles.visibleMobile}>
        <MobileNav setBasketOpen={setBasketOpen} />
      </div>
    </>
  );
}
