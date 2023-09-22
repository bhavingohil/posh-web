import React from "react";
import styles from "../../styles/SubscribeForm.module.css";
import axios from "axios";

export default function SubscribeForm() {
  const handleClick = async () => {
    const emailField = document.getElementById('newsletterEmailFoot')
    const email = emailField.value
    await axios.post('/api/newsletter', {
      email
    }, {headers:{
      'Content-Type':'application/json'
    }})
  }

  return (
    <div className={styles.subscribeFormContainer}>
      <h1>SIGN UP FOR ALERTS!</h1>
      <p>Sign up to be the first to know about our newest arrivals, latest sales, and restocks on your most wanted items! </p>
      <div>
        <input type="email" placeholder="Email Address..." name="newsletterEmailFoot" id="newsletterEmailFoot" />
        <button onClick={handleClick}>confirm</button>
      </div>
    </div>
  );
}
