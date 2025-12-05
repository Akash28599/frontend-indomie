// GallerySection.jsx
import React, { useState, useEffect, useRef } from "react";
import { CONTAINER_PADDING, MOBILE_BREAKPOINT, CONTAINER_MAX_WIDTH } from "../constants";

const API_BASE = "https://remarkable-approval-f316b5dd8f.strapiapp.com";

const BG_IMAGE_URL = "https://remarkable-approval-f316b5dd8f.media.strapiapp.com/bgbody_12bc792032.jpg";

const GALLERY_FILE_NAMES = [
  "addlabel1-2.png",   // top-left (big)
  "addlabel2-1.png",   // top-right (big)
  "galleryp-1-1.jpg",  // bottom-left
  "galleryp-3-1.jpg",  // bottom-center
  "iha_use_indo.png",  // bottom-right
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

  const handleCardClick = () => {
    window.location.reload();
  };

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

  // REMOVED DARK OVERLAY - now shows true white/light background
  const contentWrapperStyle = {
    position: "relative",
    zIndex: 2,
  };

  const gridWrapperStyle = {
    display: "flex",
    flexDirection: "column",
    gap: isMobile ? 16 : 24,
  };

  const rowTopStyle = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    gap: isMobile ? 16 : 24,
  };

  const rowBottomStyle = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    gap: isMobile ? 16 : 24,
  };

  const baseCardStyle = {
    position: "relative",
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#ffffff",
    cursor: "pointer",
    transform: isInView ? "scale(1)" : "scale(0.9)",
    transition: "transform 0.4s ease, box-shadow 0.4s ease",
  };

  const topCardStyle = (index) => ({
    ...baseCardStyle,
    flex: isMobile ? "1 1 100%" : "1 1 50%",
    height: isMobile ? 220 : 280,
    boxShadow: "0 18px 40px rgba(0,0,0,0.18)",
    ...(hoverIndex === index
      ? {
          transform: "scale(1.04)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
        }
      : {}),
  });

  const bottomCardStyle = (index) => ({
    ...baseCardStyle,
    flex: isMobile ? "1 1 100%" : "1 1 33.33%",
    height: isMobile ? 200 : 220,
    boxShadow: "0 14px 30px rgba(0,0,0,0.16)",
    ...(hoverIndex === index
      ? {
          transform: "scale(1.04)",
          boxShadow: "0 22px 50px rgba(0,0,0,0.22)",
        }
      : {}),
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
    outline: "none",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    backgroundColor: btnHoverIndex === index ? "#ffd400" : "#000000",
    color: btnHoverIndex === index ? "#e60012" : "#ffffff",
    transition: "all 0.25s ease",
    cursor: "pointer",
  });

  if (!images.length) {
    return <section ref={sectionRef} style={containerStyle} />;
  }

  const [img1, img2, img3, img4, img5] = images;

  return (
    <section ref={sectionRef} style={containerStyle}>
      {/* NO OVERLAY - pure background image now visible */}
      <div style={contentWrapperStyle}>
        <div style={gridWrapperStyle}>
          {/* TOP ROW: 2 big cards with buttons */}
          <div style={rowTopStyle}>
            {[img1, img2].map((img, idx) => {
              if (!img) return null;
              const globalIndex = idx;
              return (
                <div
                  key={img.id}
                  style={topCardStyle(globalIndex)}
                  onMouseEnter={() => setHoverIndex(globalIndex)}
                  onMouseLeave={() => setHoverIndex(null)}
                  onClick={handleCardClick}
                >
                  <img
                    src={img.url}
                    alt={img.alternativeText || img.name}
                    style={{
                      ...imgStyle,
                      transform:
                        hoverIndex === globalIndex ? "scale(1.08)" : "scale(1)",
                    }}
                    loading="lazy"
                  />
                  <button
                    type="button"
                    style={fanButtonStyle(globalIndex)}
                    onMouseEnter={(e) => {
                      e.stopPropagation();
                      setBtnHoverIndex(globalIndex);
                    }}
                    onMouseLeave={(e) => {
                      e.stopPropagation();
                      setBtnHoverIndex(null);
                    }}
                    onClick={handleFanClick}
                  >
                    Become a Fan
                  </button>
                </div>
              );
            })}
          </div>

          {/* BOTTOM ROW: 3 smaller cards */}
          <div style={rowBottomStyle}>
            {[img3, img4, img5].map((img, idx) => {
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
                    alt={img.alternativeText || img.name}
                    style={{
                      ...imgStyle,
                      transform:
                        hoverIndex === globalIndex ? "scale(1.08)" : "scale(1)",
                    }}
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
