import React from "react";
import "../styles/AboutProduct.css";

export default function AboutProduct() {
  return (
    <div className="about-product-page">
      {/* Fixed background behind everything */}
      <div className="background"></div>

      {/* Scrollable content sections */}
      <div className="content">
        <section className="section">
          <h1>Our Product</h1>
          <p>Welcome to our product page!</p>
        </section>

        <section className="section" style={{ backgroundColor: "white" }}>
          <h2>Features</h2>
          <p>Cool features explained here.</p>
        </section>

        <section className="section">
          <h2>Pricing</h2>
          <p>Pricing info goes here.</p>
        </section>

        <section style={{ backgroundColor: "white" }}>
          <h2>Contact</h2>
          <p>Contact details or call-to-action here.</p>
        </section>
      </div>
    </div>
  );
}
