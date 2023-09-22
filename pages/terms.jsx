import Footer from "../components/Footer/Footer";
import styles from "../styles/terms.module.css";

export default function Terms() {
  return (
    <div>
      <div className={styles.termsWrapper}>
        <h1 className={styles.termsSubTitle}>Terms and Conditions:</h1>
        <p><i>Posh Consignment is not affiliated with any of the designer brands we sell. All copyrights are reserved to the original brand owner. </i></p>
        
        <p>
          Welcome to Posh Consignment, your trusted source for luxury
          consignment products. By accessing or using our website or purchasing
          products from our store, you agree to the following terms and
          conditions:
          <ol className={styles.termsList}>
            <li>
              No Affiliation: Posh Consignment is not affiliated with any of the
              designer brands we sell. All copyrights are reserved to the
              original brand owner
            </li>
            <li>
              Products: All products sold on Posh Consignment are authentic and
              have been thoroughly inspected by our in-house authenticator. We
              guarantee the authenticity of every item sold in our store
            </li>
            <li>
              Payment: Payment for products must be made in full at the time of
              purchase. We accept all major credit cards.
            </li>
            <li>
              Shipping: We offer free shipping on all orders over $250 within
              the continental United States. Orders will be shipped within 1-2
              business days after payment has been received. Posh Consignment is
              not responsible for any damage that occurs during shipping
            </li>
            <li>
              No refunds or returns: All sales are final - we do not accept
              refunds or returns. We strongly recommend that you carefully
              review the product description and photos before making a
              purchase.
            </li>
            <li>
              Product descriptions: We make every effort to accurately describe
              each product and provide detailed photos. However, please note
              that colors and textures may appear differently in person than
              they do on a computer screen.
            </li>
            <li>
              Damaged or defective products: If you receive a product that is
              damaged or defective, please contact us within 24 hours of
              receiving the product. We will work with you to resolve the issue
              as quickly as possible. Please note that we are not responsible
              for any damage that occurs during shipping that is not due to our
              lack of care in packaging.
            </li>
            <li>
              Limitation of liability: Posh Consignment shall not be liable for
              any indirect, incidental, special, or consequential damages
              arising out of or in connection with the purchase or use of our
              products.
            </li>
            <li>
              Privacy: We value your privacy and will never share your personal
              information with third parties.
            </li>
            <li>
              Governing law: These terms and conditions shall be governed by and
              construed in accordance with the laws of the State of Florida. Any
              disputes arising out of or in connection with these terms and
              conditions shall be resolved in the courts of Palm Beach, Florida.
            </li>
          </ol>
          By accessing or using our website or purchasing products from our
          store, you acknowledge that you have read, understood, and agree to
          these terms and conditions.
        </p>
      </div>
      <Footer />
    </div>
  );
}
