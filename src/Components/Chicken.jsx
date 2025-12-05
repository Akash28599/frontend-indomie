import React, { useState, useEffect } from "react";
import {
  CONTAINER_PADDING,
  MOBILE_BREAKPOINT,
  CONTAINER_MAX_WIDTH,
} from "../constants";

const API_BASE = "https://remarkable-approval-f316b5dd8f.strapiapp.com";

const ProductSection = () => {
  const [chickenData, setChickenData] = useState({ headings: [], body: [] });
  const [images, setImages] = useState([]);
  const [activeHeading, setActiveHeading] = useState("CHICKEN");
  const [activeBody, setActiveBody] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [animationPhase, setAnimationPhase] = useState("show");
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const fetchChickenData = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/chickens`);
        const data = await res.json();

        const mainData = data.data[0];
        if (mainData) {
          const headings = mainData.heading[0]?.heading || [];
          const body = mainData.body[0]?.body || [];
          setChickenData({ headings, body });
        }
      } catch (err) {
        console.error("Chicken data fetch failed:", err);
      }
    };

    const fetchImages = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/upload/files`);
        const data = await res.json();
        setImages(data);
      } catch (err) {
        console.error("Images fetch failed:", err);
      }
    };

    fetchChickenData();
    fetchImages();
  }, []);

  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const getImageUrl = (name) => {
    const img = images.find((file) =>
      file.name.toLowerCase().includes(name.toLowerCase())
    );
    return img ? img.url : "";
  };

  const chickenImg = getImageUrl("chickenimage");
  const onionImg = getImageUrl("onionimage");
  const yellowBgImg = getImageUrl("yellow");

  const containerStyle = {
    backgroundImage: `url(${yellowBgImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    padding: `80px ${CONTAINER_PADDING}px`,
    margin: "0 auto",
    maxWidth: `calc(${CONTAINER_MAX_WIDTH} + ${CONTAINER_PADDING * 2}px)`,
  };

  const headingsContainer = {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    padding: "20px 0 60px 0",
    justifyContent: "flex-start",
    maxWidth: CONTAINER_MAX_WIDTH,
    margin: "0 auto",
    flexWrap: "wrap",
  };

  const headingStyle = (heading) => ({
    fontSize: isMobile ? "1.6rem" : "1.9rem",
    fontWeight: "bold",
    color: "#000",
    cursor: "pointer",
    padding: "16px 24px",
    borderRadius: 16,
    transition: "all 0.3s ease",
    backgroundColor: "transparent",
    whiteSpace: "nowrap",
    textDecoration: activeHeading === heading ? "underline" : "none",
    textDecorationColor: activeHeading === heading ? "#dc3545" : "transparent",
    textDecorationThickness: "3px",
  });

  const mainContent = {
    display: "flex",
    flexDirection: "row",
    gap: isMobile ? "15px" : "100px",
    alignItems: "flex-start",
    maxWidth: CONTAINER_MAX_WIDTH,
    margin: "0 auto",
    flexWrap: "nowrap",
  };

  const leftSection = {
    flex: isMobile ? "1 1 55%" : "2",
    display: "flex",
    flexDirection: "row",
    alignItems: isMobile ? "flex-start" : "center",
    gap: isMobile ? "15px" : "40px",
  };

  const imageContainer = {
    width: isMobile ? "160px" : "300px",
    height: isMobile ? "160px" : "400px",
    borderRadius: 24,
    overflow: "hidden",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
    flexShrink: 0,
    backgroundColor: "transparent",
  };

  // Simplified slide-in animation from outer screen
  const getImageStyle = () =>
    animationPhase === "show"
      ? { transform: "translateX(0)", opacity: 1 }
      : { transform: "translateX(-100%)", opacity: 0 };

  const getTextStyle = () =>
    animationPhase === "show"
      ? { transform: "translateX(0)", opacity: 1 }
      : { transform: "translateX(100%)", opacity: 0 };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "all 0.8s ease-out",
    ...getImageStyle(),
  };

  const flavourTextWrapperStyle = {
    fontSize: isMobile ? "1.6rem" : "3.5rem",
    fontWeight: 900,
    color: "#000",
    lineHeight: 1.1,
    transition: "all 0.8s ease-out 0.2s",
    flexShrink: 0,
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    minHeight: isMobile ? "160px" : "400px",
    ...getTextStyle(),
  };

  const rightSection = {
    flex: isMobile ? "1 1 40%" : "1",
    display: "flex",
    flexDirection: "column",
    gap: isMobile ? "8px" : "25px",
    alignItems: isMobile ? "flex-start" : "flex-end",
    marginTop: 0,
    paddingTop: 0,
    alignSelf: "flex-start",
  };

  const bodyTextStyle = (text) => ({
    fontSize: isMobile ? "0.95rem" : "1.6rem",
    fontWeight: "bold",
    color: activeBody === text ? "#dc3545" : "#000",
    cursor: "pointer",
    lineHeight: 1.3,
    padding: isMobile ? "4px 0" : "8px 0",
    transition: "all 0.3s ease",
    whiteSpace: "nowrap",
    backgroundColor: "transparent",
  });

  const triggerAnimation = () => {
    setAnimationPhase("hide");
    setTimeout(() => {
      setAnimationPhase("show");
      setAnimKey((prev) => prev + 1);
    }, 800); // Match transition duration
  };

  const handleHeadingClick = (heading) => {
    if (heading === activeHeading) return;
    setActiveHeading(heading);
    setActiveBody("");
    triggerAnimation();
  };

  const handleBodyClick = (bodyText) => {
    if (bodyText === activeBody) return;
    setActiveBody(bodyText);
    triggerAnimation();
  };

  if (!chickenData.headings.length || !chickenData.body.length) {
    return (
      <div style={containerStyle}>
        <div style={{ textAlign: "center", padding: "40px", color: "#dc3545" }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* Headings */}
      <div style={headingsContainer}>
        {chickenData.headings.map((heading, idx) => (
          <div
            key={idx}
            style={headingStyle(heading)}
            onClick={() => handleHeadingClick(heading)}
          >
            {heading}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div style={mainContent} key={animKey}>
        {/* LEFT: Image + CHICKEN Flavour */}
        <div style={leftSection}>
          <div style={imageContainer}>
            <img
              src={activeHeading === "CHICKEN" ? chickenImg : onionImg}
              alt={activeHeading}
              style={imageStyle}
              draggable={false}
              key={`${activeHeading}-img-${animKey}`}
            />
          </div>

          <div style={flavourTextWrapperStyle} key={`flavour-${animKey}`}>
            <div style={{ marginBottom: isMobile ? "8px" : "12px", textAlign: "left" }}>
              <span style={{ fontStyle: "normal" }}>{activeHeading}</span>
            </div>
            <div style={{ 
              fontStyle: "italic", 
              marginLeft: isMobile ? "20px" : "40px",
              position: "relative",
              transform: "translateX(10%)"
            }}>
              Flavour
            </div>
          </div>
        </div>

        {/* RIGHT: Body text options */}
        <div style={rightSection}>
          {chickenData.body.map((item, idx) => (
            <div
              key={idx}
              style={bodyTextStyle(item)}
              onClick={() => handleBodyClick(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
