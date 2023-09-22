import { useState } from "react";
import Footer from "../components/Footer/Footer";
import homeStyles from "../styles/Home.module.css";
import styles from "../styles/Login.module.css";

export default function Page() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState();

  const recover = async () => {
    if (email.length > 0) {
      const res = await fetch("/api/forgetPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
       if (data?.ERROR?.length > 0) setError(data.ERROR[0].message);
      else setSuccess("Check email for password recovery");
    } else {
      setError("Invalid email");
    }
  };

  return (
    <div className={homeStyles.container}>
      <div className={styles.loginFormContainer}>
        <div className={styles.loginForm}>
          <h1>Customer Login</h1>
          <form>
            <label>Email Address</label>
            <br />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </form>
          <p style={{ color: "red", textDecoration: "none", margin: "10px 0" }}>
            {error && error}
          </p>
          <p
            style={{
              color: "green",
              textDecoration: "none",
              margin: "10px 0",
            }}
          >
            {success && success}
          </p>
          <button onClick={recover}>Submit</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
