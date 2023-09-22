import React from "react";
import styles from "../../styles/Featured.module.css";
import Slider from "react-slick";
import { BsArrowRight } from "react-icons/bs";
import { featuredData } from "../../constants/DummyItems";
import Link from "next/link";
import { useRouter } from "next/router";

function CustomSlide({ src, title, description, index }) {
  return (
    <Link
      href={"/shop"}
      className={styles.featureCard}
      style={{
        background: `url(${src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      key={index}
    >
      <div className={styles.featuredOverlay} />
      <h1>{title && title}</h1>
      <p style={{maxWidth: 350}}>{description && description}</p>
    </Link>
  );
}

export default function Featured() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const router = useRouter();

  return (
    <div style={{ paddingBottom: 100 }}>
      <div className={styles.featureTitleHeader}>
        <h1>Featured</h1>
        <BsArrowRight size={25} onClick={() => router.push("/shop")} />
      </div>
      <Slider {...settings}>
        {featuredData.map((feature, index) => (
          <CustomSlide
            title={feature.title}
            description={feature.description}
            src={feature.src}
            index={index}
            key={index}
          />
        ))}
      </Slider>
    </div>
  );
}
