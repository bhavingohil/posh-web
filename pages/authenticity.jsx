import Footer from "../components/Footer/Footer";
import styles from "../styles/terms.module.css";

export default function Authenticity() {
  return (
    <div>
      <div className={styles.termsWrapper} style={{minHeight: '60vh'}}>
        <h1 className={styles.termsSubTitle}>Authenticity Guarantee</h1>
        <p>
        At Posh Consignment, we are committed to providing our customers with the highest quality luxury consignment products. We understand the importance of authenticity and take great care to ensure that all items sold in our store are genuine. We are proud to have an in-house authenticator who has years of experience and knowledge in the luxury consignment industry. Our authenticator carefully inspects each item before it is listed for sale, using a combination of expert knowledge and the latest authentication techniques. As a result, we guarantee the authenticity of every item sold in our store. If you ever have any concerns about the authenticity of your purchase, we will work with you to resolve the issue promptly and fairly. We stand behind our products and are confident that you will be satisfied with your purchase. At Posh Consignment, we are dedicated to providing our customers with an exceptional shopping experience. We believe that our commitment to authenticity and customer satisfaction sets us apart from 
other luxury consignment stores. 
        </p>
      </div>
      <Footer />
    </div>
  );
}
