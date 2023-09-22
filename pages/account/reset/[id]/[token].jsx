import { useRouter } from 'next/router'
 import homeStyles from "../../../../styles/Home.module.css";
import styles from "../../../../styles/Login.module.css";
import Footer from '../../../../components/Footer/Footer';
import { useState } from 'react';



export default function ResetPassword(){

    const router  = useRouter()

    const [newPass, setNewPass] = useState("")

    const recover = async () => {
        if (newPass.length > 0) {
          const res = await fetch("/api/recoverPassword", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password:newPass,resetUrl:"https:/"+router.asPath  }),
          });
          const data = await res.json();
            router.push("/login")
         } else {
         }
      };

     return    <div className={homeStyles.container}>
    <div className={styles.loginFormContainer}>
      <div className={styles.loginForm}>
        <h1>Set New password</h1>
        <form>
          <label>Password</label>
          <br />
          <input
            type="text"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          />
        </form>

 
        <button onClick={recover}>Submit</button>
      </div>
    </div>
    <Footer />
  </div>
}