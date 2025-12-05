// src/Pages/HomePage.jsx
import React from "react";
import HeadSection from "../Components/HeadSection";
import ProductSection from "../Components/Chicken";
import RecipesHeroInlineAnimated from "../Components/ReceipeHero";
import GallerySection from "../Components/GallerySection";
import Footer from "../Components/Footer";

function HomePage() {
  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>
      <HeadSection />
      <ProductSection />
      <RecipesHeroInlineAnimated />
      <GallerySection />
      <Footer />
    </div>
  );
}

export default HomePage;
