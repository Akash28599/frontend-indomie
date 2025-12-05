// GallerySection.jsx
import React, { useState, useEffect, useRef } from "react";
import { CONTAINER_PADDING, MOBILE_BREAKPOINT, CONTAINER_MAX_WIDTH } from "../constants";

const API_BASE = "https://remarkable-approval-f316b5dd8f.strapiapp.com";
const BG_IMAGE_URL = "https://remarkable-approval-f316b5dd8f.media.strapiapp.com/bgbody_12bc792032.jpg";

// FIXED ORDER (2 on top, 4 on bottom)
const GALLERY_FILE_NAMES = [
  "addlabel1-2.png",
  "addlabel2-1.png",
  "galleryp-1-1.jpg",
  "galleryp-3-1.jpg",
  "iha_use_indo.png",
  "galleryp-2-1.jpg", // NEW IMAGE
];

const GallerySection = () => {
  const [images, setImages] = useState([]);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [btnHoverIndex, setBtnHoverIndex] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/upload/files`);
        const data = await res.json();

        // STRICT ORDER: 2 top, 4 bottom
        const ordered = GALLERY_FILE_NAMES
          .map((name) => data.find((f) => f.name === name))
          .filter(Boolean);

        setImages(ordered);
      } catch (e) {
        console.error("Gallery fetch failed", e);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const handleResize = () =>
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCardClick = () => window.location.reload();
  const handleFanClick = (e) => {
    e.stopPropagation();
    window.location.href = "/fanclub";
  };

  const containerStyle = {
    padding: `40px ${CONTAINER_PADDING}px`,
    maxWidth: `calc(${CONTAINER_MAX_WIDTH} + ${CONTAINER_PADDING * 2}px)`,
    margin: "0 auto",
    boxSizing: "border-box",
    opacity: isInView ? 1 : 0,
    transform: isInView ? "translateY(0)" : "translateY(40px)",
    transition: "all 0.7s ease",
    backgroundImage: `url(${BG_IMAGE_URL})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
  };

  const baseCardStyle = {
    position: "relative",
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#ffffff",
    cursor: "pointer",
    transition: "transform 0.4s ease, box-shadow 0.4s ease",
  };

  const topCardStyle = (index) => ({
    ...baseCardStyle,
    flex: isMobile ? "1 1 100%" : "1 1 50%",
    height: isMobile ? 220 : 280,
    transform: hoverIndex === index ? "scale(1.04)" : "scale(1)",
  });

  const bottomCardStyle = (index) => ({
    ...baseCardStyle,
    flex: isMobile ? "1 1 100%" : "1 1 25%", // EXACTLY 4 per row
    height: isMobile ? 200 : 220,
    transform: hoverIndex === index ? "scale(1.04)" : "scale(1)",
  });

  const imgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.4s ease",
  };

  const fanButtonStyle = (index) => ({
    position: "absolute",
    left: "50%",
    bottom: isMobile ? 16 : 24,
    transform: "translateX(-50%)",
    padding: isMobile ? "10px 22px" : "12px 28px",
    borderRadius: 6,
    fontWeight: "bold",
    fontSize: isMobile ? "0.9rem" : "1rem",
    border: "none",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    backgroundColor: btnHoverIndex === index ? "#ffd400" : "#000",
    color: btnHoverIndex === index ? "#e60012" : "#fff",
    transition: "all 0.25s ease",
    cursor: "pointer",
  });

  if (!images.length) {
    return <section ref={sectionRef} style={containerStyle} />;
  }

  const [img1, img2, img3, img4, img5, img6] = images;

  return (
    <section ref={sectionRef} style={containerStyle}>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        
        {/* ROW 1 - EXACTLY 2 IMAGES */}
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 24 }}>
          {[img1, img2].map((img, idx) => (
            <div
              key={img?.id}
              style={topCardStyle(idx)}
              onMouseEnter={() => setHoverIndex(idx)}
              onMouseLeave={() => setHoverIndex(null)}
              onClick={handleCardClick}
            >
              <img
                src={img.url}
                style={imgStyle}
                alt={img.name}
              />
              <button
                type="button"
                style={fanButtonStyle(idx)}
                onMouseEnter={() => setBtnHoverIndex(idx)}
                onMouseLeave={() => setBtnHoverIndex(null)}
                onClick={handleFanClick}
              >
                Become a Fan
              </button>
            </div>
          ))}
        </div>

        {/* ROW 2 - EXACTLY 4 IMAGES */}
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 24 }}>
          {[img3, img4, img5, img6].map((img, idx) => {
            if (!img) return null;
            const globalIndex = idx + 2;

            return (
              <div
                key={img.id}
                style={bottomCardStyle(globalIndex)}
                onMouseEnter={() => setHoverIndex(globalIndex)}
                onMouseLeave={() => setHoverIndex(null)}
                onClick={handleCardClick}
              >
                <img
                  src={img.url}
                  style={imgStyle}
                  alt={img.name}
                />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default GallerySection;
