import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import "../styles/components/ThreeDImageCarousel.css";

export default function ThreeDImageCarousel({
  slides,
  itemCount = 3,
  autoplay = false,
  delay = 3,
  pauseOnHover = true,
  className = ""
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const autoplayRef = useRef(null);
  const total = slides.length;

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const swipeThreshold = 50;

  const navigate = useCallback(
    (direction) => {
      setActiveIndex((current) => {
        if (direction === "next") return (current + 1) % total;
        return (current - 1 + total) % total;
      });
    },
    [total]
  );

  const startAutoplay = useCallback(() => {
    if (!autoplay || total <= 1) return;

    clearInterval(autoplayRef.current);

    autoplayRef.current = setInterval(() => {
      navigate("next");
    }, delay * 1000);
  }, [autoplay, delay, navigate, total]);

  const stopAutoplay = () => {
    clearInterval(autoplayRef.current);
  };

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [startAutoplay]);

  const handleStart = (x) => {
    setIsDragging(true);
    setStartX(x);
    stopAutoplay();
  };

  const handleEnd = (x) => {
    if (!isDragging) return;

    const distance = x - startX;

    if (Math.abs(distance) > swipeThreshold) {
      distance < 0 ? navigate("next") : navigate("prev");
    }

    setIsDragging(false);
    setStartX(0);
  };

  const getSlideClasses = (index) => {
    const diff = index - activeIndex;

    if (diff === 0) return "now";
    if (diff === 1 || diff === -total + 1) return "next";
    if (diff === -1 || diff === total - 1) return "prev";

    if (itemCount === 5) {
      if (diff === 2 || diff === -total + 2) return "next2";
      if (diff === -2 || diff === total - 2) return "prev2";
    }

    return "";
  };

  return (
    <div
      className={`cascade-slider_container ${className}`}
      onMouseEnter={() => pauseOnHover && stopAutoplay()}
      onMouseLeave={() => pauseOnHover && startAutoplay()}
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseUp={(e) => {
        handleEnd(e.clientX);
        startAutoplay();
      }}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchEnd={(e) => {
        handleEnd(e.changedTouches[0].clientX);
        startAutoplay();
      }}>
      <div className="cascade-slider_slides">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`cascade-slider_item ${getSlideClasses(index)}`}>
            <a href={slide.href}>
              <img src={slide.src} alt="" />
            </a>
          </div>
        ))}
      </div>

      {total > 1 && (
        <>
          <span
            className="cascade-slider_arrow cascade-slider_arrow-left"
            onClick={() => navigate("prev")}>
            <ArrowLeftCircle size={30} />
          </span>

          <span
            className="cascade-slider_arrow cascade-slider_arrow-right"
            onClick={() => navigate("next")}>
            <ArrowRightCircle size={30} />
          </span>
        </>
      )}
    </div>
  );
}