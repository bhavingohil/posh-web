import homeStyles from "../styles/Home.module.css";
import subscribeStyles from '../styles/SubscribeForm.module.css'
import styles from "../styles/index.module.css";
import Hero from "../components/Hero/Hero";
import ShopPreview from "../components/ShopPreview/ShopPreview";
import Promos from "../components/Promos/Promos";
import Featured from "../components/Features/Featured";
import { useWindowWidth } from "../utils/useWindowWidth";
import { BsArrowRight } from "react-icons/bs";
import bg from "../public/break.webp";
import ListingSection from "../components/Listing/ListingSection";
import SubscribeForm from "../components/subscribe/SubscribeForm";
import Footer from "../components/Footer/Footer";
import Link from "next/link";
import { useQuery } from "react-query";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

export default function Home({ setBasketOpen, basketOpen }) {
  const innerWidth = useWindowWidth();
  const [user, setUser] = useContext(UserContext);
  const [popupOpen, setPopupOpen] = useState(false)

  const { data: previewProducts } = useQuery("Preview", async () => {
    const res = await fetch("/api/getProducts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: 8 }),
    });
    return await res.json();
  });

  const handleClickNewsletter = async () => {
    const emailField = document.getElementById('newsletterEmail')
    const email = emailField.value
    await axios.post('/api/newsletter', {
      email
    }, {headers:{
      'Content-Type':'application/json'
    }})
  }

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/login");
      const data = await res.json();
      setUser(data);
    })();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setPopupOpen(true)
    }, 5000)
  }, [])

  useEffect(() => {
    if(popupOpen){
      document.body.style.overflow = 'hidden'
      document.body.style.height = '100vh'
    }else{
      document.body.style.overflow = 'auto'
      document.body.style.height = 'auto'
    }
  }, [popupOpen])

  return (
    <div className={homeStyles.container}>
      <Hero />
      <div style={{ padding: "1%" }} />
      <ShopPreview
        title="New Arrivals"
        description="Shop our exclusive new products and find the best deals"
        basketOpen={basketOpen}
        setBasketOpen={setBasketOpen}
        products={previewProducts}
      />
      {innerWidth > 800 ? <Promos /> : <Featured />}
      <ShopPreview
        title="Trending Products"
        description="Shop the hottest designer clothes, bags, shoes, and accessories -  all authenticated by our experts"
        menu
        basketOpen={basketOpen}
        setBasketOpen={setBasketOpen}
        products={previewProducts}
      />
      <div
        className={styles.accessoriesBreak}
        style={{ backgroundImage: `url(${bg.src})` }}
      >
        <div className={styles.breakOverlay} />
        <div>
          <p>FRESH LOOKS</p>
          <h1>Accessories that belong to you</h1>
        </div>
        <Link href={"/shop"}>
          <button>
            Explore &nbsp;
            <BsArrowRight size={20} />
          </button>
        </Link>
      </div>

      {innerWidth > 800 && <ListingSection />}
      <SubscribeForm />
      <div style={{ marginTop: -50 }}>
        <Footer />
      </div>

      {popupOpen && (
        <div style={{position:'absolute', top: 0, left: 0,width: '100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', zIndex: 10000}}>
          <div style={{width: innerWidth < 800 ? '100%' : '50%',maxWidth: 600, height: innerWidth < 800 ? 240 : 300, backgroundColor:'white', display:'flex', flexDirection:'row', position:'relative'}}>
            <div style={{flex: 1}}>
              <img src={'/mobile-hero-bg.webp'} style={{objectFit:'contain', height: innerWidth < 800 ? 240 : 300}} />
              </div>
              <div style={{flex: innerWidth < 800 ? 4 : 2, marginTop: 0, width:'100%', height:'100%', padding:'10px 50px'}} className={subscribeStyles.subscribeFormContainer}>
                 <div onClick={() => setPopupOpen(false)} style={{
                  color:'#bb7f7f', 
                  fontSize: 20, 
                  width:'100%',
                  display:'flex',
                  alignItems:innerWidth < 800 ? 'flex-end' : 'flex-start',
                  justifyContent:'flex-end',
                  cursor:'pointer'
                }}>
                X
              </div>
                <h2>SIGN UP FOR ALERTS!</h2>
                <p>Sign up to be the first to know about our newest arrivals, latest sales, and restocks on your most wanted items! </p>
                <div style={{width:'100%'}}>
                <input type="email" placeholder="Email Address..." name="newsletterEmail" id="newsletterEmail" />
                <button onClick={async () => {
                  await handleClickNewsletter();
                  setPopupOpen(false)
                }}>confirm</button>
              </div>
              
              </div>
             
            </div>
          </div>
      )}
    </div>
  );
}



