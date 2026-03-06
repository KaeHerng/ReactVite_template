import React, { useState } from "react";
import "../styles/typespeed.css";

const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing tests help improve speed and accuracy.",
  "React is a powerful JavaScript library.",
  "Practice makes perfect.",
  "Always double-check your work."
];

export default function MultiSentenceTypingTest() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [times, setTimes] = useState([]);

  const currentSentence = sentences[currentIndex];

  const handleChange = (e) => {
    const value = e.target.value;

    // Start timer on first keystroke
    if (!startTime) {
      setStartTime(Date.now());
    }

    setInput(value);

    // Check if user finished typing the sentence exactly
    if (value === currentSentence) {
      setEndTime(Date.now());
    }
  };

  const handleNext = () => {
    // Record time taken
    if (startTime && endTime) {
      const duration = (endTime - startTime) / 1000; // in seconds
      setTimes([...times, duration]);
    }

    // Reset for next sentence
    setInput("");
    setStartTime(null);
    setEndTime(null);

    // Move to next sentence
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="typespeed-page">
      <h2>🖋 Multi-Sentence Typing Test</h2>

      {currentIndex < sentences.length ? (
        <>
          <p className="test-text">{currentSentence}</p>
          <textarea
            placeholder="Start typing..."
            value={input}
            onChange={handleChange}
            disabled={endTime !== null} // disable input after finishing
          />

          {endTime && (
            <div style={{ marginTop: "12px" }}>
              <p>✅ Time taken: {(endTime - startTime) / 1000} seconds</p>
              <button onClick={handleNext}>Next Sentence</button>
            </div>
          )}
        </>
      ) : (
        <>
          <h3>🎉 All sentences completed!</h3>
          <ul>
            {times.map((t, i) => (
              <li key={i}>
                Sentence {i + 1}: {t.toFixed(2)} seconds
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
