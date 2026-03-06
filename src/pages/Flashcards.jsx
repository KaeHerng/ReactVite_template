import React, { useState } from "react";
import "../styles/flashcards.css";

const initialCards = [
  { id: 1, front: "What is 2+2?", back: "4", status: "new", category: "Math" },
  { id: 2, front: "Capital of France?", back: "Paris", status: "new", category: "Geography" },
  { id: 3, front: "React is a ___ library?", back: "JavaScript", status: "new", category: "Programming" },
  { id: 4, front: "What color do you get mixing red and blue?", back: "Purple", status: "new", category: "Art" },
  { id: 5, front: "Largest planet in our solar system?", back: "Jupiter", status: "new", category: "Science" },
];

export default function Flashcards() {
  const [cards, setCards] = useState(initialCards);
  const [flippedCardId, setFlippedCardId] = useState(null);
  const [filter, setFilter] = useState("all");

  // Filter cards based on status or category
  const filteredCards = cards.filter(card => {
    if (filter === "all") return true;
    if (filter === "known") return card.status === "known";
    if (filter === "new") return card.status === "new";
    return card.category === filter;
  });

  // Flip card
  const handleFlip = (id) => {
    setFlippedCardId(flippedCardId === id ? null : id);
  };

  // Mark card as known
  const markKnown = (id) => {
    setCards(cards.map(card => card.id === id ? { ...card, status: "known" } : card));
    setFlippedCardId(null);
  };

  // Study progress
  const total = cards.length;
  const knownCount = cards.filter(c => c.status === "known").length;

  return (
    <div className="flashcards-page">
      <h2>📚 Flashcards App</h2>

      {/* Progress */}
      <div className="stats">
        <p>Progress: {knownCount}/{total} cards</p>
      </div>

      {/* Filter buttons */}
      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("new")}>New</button>
        <button onClick={() => setFilter("known")}>Known</button>
        <button onClick={() => setFilter("Math")}>Math</button>
        <button onClick={() => setFilter("Science")}>Science</button>
        <button onClick={() => setFilter("Geography")}>Geography</button>
        <button onClick={() => setFilter("Programming")}>Programming</button>
        <button onClick={() => setFilter("Art")}>Art</button>
      </div>

      {/* Cards */}
      <div className="cards-container">
        {filteredCards.map(card => (
          <div
            key={card.id}
            className={`card ${flippedCardId === card.id ? "flipped" : ""}`}
            onClick={() => handleFlip(card.id)}>
            <div className="front">{card.front}</div>
            <div className="back">
              {card.back}
              {card.status !== "known" && (
                <button className="known-btn" onClick={(e) => { e.stopPropagation(); markKnown(card.id); }}>
                  Mark as Known
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
