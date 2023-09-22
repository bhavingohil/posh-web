import Link from "next/link";
import React, { useState } from "react";
import { useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../context/UserContext";
import homeStyles from "../styles/Home.module.css";
import styles from "../styles/Login.module.css";

export default function Signup() {
  const router = useRouter();
  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });

  const [error, setError] = useState({
    input: "",
    error: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const [user, setUser] = useContext(UserContext);

  const handleSignup = async () => {
    if (
      userForm.email &&
      userForm.firstName &&
      userForm.lastName &&
      userForm.password
    ) {
      if (confirmPassword === userForm.password) {
        const params = {
          userForm,
        };
        const res = await fetch("/api/signup", {
          method: "POST",
          body: JSON.stringify(params),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();

        if (data[0]?.code) {
          switch (data[0]?.code) {
            case "TOO_SHORT":
              setError({ ...error, input: "password", error: data[0].message });
              break;
            case "TAKEN":
              setError({ ...error, input: "email", error: data[0].message });
              break;
            case "INVALID":
              setError({ ...error, input: "email", error: data[0].message });
              break;
            default:
              setError({ ...error, input: "global", error: "failed" });
          }
        } else if (data?.customer) {
          setUser(data.customer);
          router.push("/");
        }
      } else {
        setError({
          ...error,
          input: "confirm",
          error: "Passwords do not match",
        });
      }
    } else {
      setError({
        ...error,
        input: "empty",
        error: "Fill all required fields",
      });
    }
  };

  return (
    <div className={homeStyles.container}>
      <div className={`${styles.loginFormContainer} ${styles.signup}`}>
        <div className={styles.loginForm}>
          <h1>Create Account</h1>
          <form className={styles.signupFormContainer}>
            <div style={{ gridColumn: "span 2" }}>
              <label>Email Address</label>
              <br />
              <input
                type="email"
                onChange={(e) =>
                  setUserForm({ ...userForm, email: e.target.value })
                }
              />

              <p style={{ color: "red", marginTop: 10, marginBottom: 10 }}>
                {error.input === "email" && error.error}
              </p>
            </div>
            <div>
              <label>First Name</label>
              <br />
              <input
                type="text"
                onChange={(e) =>
                  setUserForm({ ...userForm, firstName: e.target.value })
                }
              />
            </div>
            <div>
              <label>Last Name</label>
              <br />
              <input
                type="text"
                onChange={(e) =>
                  setUserForm({ ...userForm, lastName: e.target.value })
                }
              />
            </div>
            <div style={{ gridColumn: "span 2" }}>
              <label>Password</label>
              <br />
              <input
                type="password"
                onChange={(e) =>
                  setUserForm({ ...userForm, password: e.target.value })
                }
              />
              <p style={{ color: "red" }}>
                {error.input === "password" && error.error}
              </p>
            </div>
            <div style={{ gridColumn: "span 2" }}>
              <label>Confirm Password</label>
              <br />
              <input
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <p style={{ color: "red" }}>
                {error.input === "confirm" && error.error}
              </p>
            </div>
          </form>
          <p style={{ color: "red", marginTop: 20, textDecoration: "none" }}>
            {error.input === "empty" && error.error}
          </p>
          <button onClick={(e) => handleSignup(e)}>Sign Up</button>
          <p>
            Already have an account?{" "}
            <span>
              <Link href={"/login"}>Login Here</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
