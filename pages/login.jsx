import Link from "next/link";
import React, { useContext, useState } from "react";
import Footer from "../components/Footer/Footer";
import { UserContext } from "../context/UserContext";
import { useRouter } from "next/router";
import homeStyles from "../styles/Home.module.css";
import styles from "../styles/Login.module.css";

export default function Auth() {
  const [userForm, setUserForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [user, setUser] = useContext(UserContext);

  const router = useRouter();

  const handleLogin = async () => {
    const params = {
      userForm,
    };

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (data?.email) {
      setUser(data);
      router.push("/");
    } else if (data?.error) {
      setError("Invalid Credentials");
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
              onChange={(e) =>
                setUserForm({ ...userForm, email: e.target.value })
              }
            />
            <br />
            <label>Password</label>
            <br />
            <input
              type="password"
              onChange={(e) =>
                setUserForm({ ...userForm, password: e.target.value })
              }
            />
          </form>
          <p style={{ color: "red", textDecoration: "none", margin: "10px 0" }}>
            {error && error}
          </p>
          <Link
            className={styles.resetPassword}
            style={{ textDecoration: "underline" }}
            href="/forgetPassword"
          >
            Forgot your password?
          </Link>
          <button onClick={handleLogin}>Sign in</button>
          <p>
            No account?{" "}
            <span>
              <Link href="/signup">Register Here</Link>
            </span>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
