import React, { useRef } from "react";

export default function ContainerRotate({
  imageUrl,
  className = "",
}) {
  const cardRef = useRef(null);

  function handleMouseMove(e) {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const px = x / rect.width - 0.5;
    const py = y / rect.height - 0.5;

    const rotateX = py * -25;
    const rotateY = px * 25;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.03)
    `;
  }

  function handleMouseLeave() {
    const card = cardRef.current;

    card.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;
  }

  return (
    <div className="flex items-center justify-center">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`
          relative w-[400px] h-[400px]
          rounded-2xl
          border border-white/10
          shadow-[0_20px_60px_rgba(0,0,0,0.1)]
          backdrop-blur-xl
          overflow-hidden
          transition-transform duration-200 ease-out
          flex items-center justify-center
          ${className}
        `}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <img
          src={imageUrl}
          className="w-full h-full object-contain drop-shadow-2xl"
          style={{
            transform: "translateZ(60px)",
          }}
        />
      </div>
    </div>
  );
}