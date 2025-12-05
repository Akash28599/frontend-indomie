// Footer.jsx - Mobile centered Contact & Follow Us
import React, { useEffect, useState } from "react";

const API_BASE = "https://remarkable-approval-f316b5dd8f.strapiapp.com";

const Footer = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/categories`);
        const json = await res.json();
        setCategories(json.data || []);
      } catch (err) {
        console.error("Footer categories fetch failed", err);
      }
    };
    fetchCategories();
  }, []);

  const getName = (fallback) => {
    const item =
      categories.find((c) => c.name.toLowerCase().includes("news")) ||
      categories.find((c) => c.name.toLowerCase().includes(fallback.toLowerCase()));
    return item?.name || fallback;
  };

  const newsletterTitle = getName("Newsletter");
  const contactTitle =
    categories.find((c) => c.name.toLowerCase().includes("contact"))?.name ||
    "Contact";
  const followTitle =
    categories.find((c) => c.name.toLowerCase().includes("follow"))?.name ||
    "Follow us";

  return (
    <footer style={styles.footer}>
      <div style={styles.inner}>
        {/* Left: Newsletter */}
        <div style={styles.column}>
          <div style={styles.newsletterContent}>
            <h2 style={styles.heading}>{newsletterTitle}</h2>
            <p style={{ ...styles.text, color: "#d57a3c" }}>
              Signup for our newsletter and get informed about the latest news.
            </p>

            <div style={styles.inputRow}>
              <input type="email" placeholder="Your email address" style={styles.input} />
            </div>

            <label style={styles.checkboxRow}>
              <input type="checkbox" style={styles.checkbox} />
              <span style={styles.text}>I have read and agree to the terms &amp; conditions</span>
            </label>

            <button type="button" style={styles.signUpBtn}>
              Sign up
            </button>
          </div>
        </div>

        {/* Middle: Contact - MOBILE CENTERED */}
        <div style={styles.column}>
          <div style={styles.contactContent}>
            <h2 style={styles.heading}>{contactTitle}</h2>
            <p style={{ ...styles.subText, color: "#d57a3c" }}>We want to hear from you</p>

            <p style={styles.text}>
              Dufil Prima Food Ltd.
              <br />
              44 Jimoh Odutola Street
              <br />
              Off Eric Moore Road,
              <br />
              Surulere, Lagos, Nigeria
            </p>

            <div style={styles.iconTextRow}>
              <span style={styles.icon}>✉️</span>
              <span style={styles.text}>info@indomie.ng</span>
            </div>

            <div style={styles.iconTextRow}>
              <span style={styles.icon}>📞</span>
              <span style={styles.text}>08004636643; 07004636643</span>
            </div>
          </div>
        </div>

        {/* Right: Follow Us - MOBILE CENTERED */}
        <div style={styles.column}>
          <div style={styles.followContent}>
            <h2 style={styles.heading}>{followTitle}</h2>
            <div style={styles.socialContainer}>
              <div style={styles.socialRow}>
                <button style={styles.socialIconBtn}>f</button>
                <button style={styles.socialIconBtn}>t</button>
                <button style={styles.socialIconBtn}>⧖</button>
                <button style={styles.socialIconBtn}>▶</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div style={styles.bottomBar}>
        <nav style={styles.bottomNav}>
          {[
            "HOME",
            "ABOUT US",
            "OUR RANGE",
            "RECIPES",
            "FANCLUB",
            "INDOMIE CAFE",
            "IHA",
            "STAY UPDATED",
            "GET IN TOUCH",
          ].map((item) => (
            <a key={item} href="#" style={styles.bottomLink}>
              {item}
            </a>
          ))}
        </nav>

        <p style={styles.copy}>© 2019 Indomie AU. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#000000",
    color: "#ffffff",
    padding: "60px 20px 30px",
    fontFamily: "Arial, sans-serif",
  },
  inner: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    flexWrap: "wrap",
    gap: "40px",
  },
  column: {
    flex: "1 1 280px",
    minWidth: "260px",
    display: "flex",
    flexDirection: "column",
  },
  // NEW: Content containers for centering
  newsletterContent: {
    display: "flex",
    flexDirection: "column",
  },
  contactContent: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left", // Desktop: left-aligned
    '@media (max-width: 768px)': {
      alignItems: "center",
      textAlign: "center",
    },
  },
  followContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start", // Desktop: left-aligned
    '@media (max-width: 768px)': {
      alignItems: "center",
    },
  },
  heading: {
    color: "#d57a3c",
    fontSize: "2.4rem",
    fontWeight: "700",
    margin: "0 0 16px 0",
  },
  text: {
    color: "#ffffff",
    fontSize: "0.7rem",
    lineHeight: 1.6,
    margin: "0 0 12px 0",
  },
  subText: {
    color: "#ffffff",
    fontSize: "0.6rem",
    margin: "0 0 14px 0",
  },
  inputRow: {
    marginTop: "20px",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "4px",
    border: "none",
    fontSize: "0.95rem",
  },
  checkboxRow: {
    marginTop: "14px",
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },
  checkbox: {
    width: "16px",
    height: "16px",
  },
  signUpBtn: {
    marginTop: "16px",
    padding: "10px 16px",
    backgroundColor: "#d57a3c",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontWeight: "600",
    cursor: "pointer",
  },
  iconTextRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "8px",
    '@media (max-width: 768px)': {
      justifyContent: "center",
    },
  },
  icon: {
    fontSize: "1.2rem",
    minWidth: "24px",
  },
  socialContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  socialRow: {
    display: "flex",
    gap: "7px",
    flexWrap: "wrap",
    justifyContent: "center",
    '@media (max-width: 768px)': {
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
    },
  },
  socialIconBtn: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    backgroundColor: "#d57a3c",
    border: "none",
    color: "#fff",
    fontSize: "1.2rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomBar: {
    borderTop: "1px solid #333",
    marginTop: "40px",
    paddingTop: "20px",
    textAlign: "center",
  },
  bottomNav: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "18px",
    marginBottom: "12px",
  },
  bottomLink: {
    color: "#d57a3c",
    textDecoration: "none",
    fontSize: "0.5rem",
  },
  copy: {
    color: "#777",
    fontSize: "0.85rem",
    marginTop: "10px",
  },
};

export default Footer;
