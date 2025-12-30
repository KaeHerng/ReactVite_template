import React from "react";

export default function ImageGrid({ images, cols, gap }) {

    return (
        <div className={`grid gap-${gap} grid-cols-1 md:grid-cols-2 lg:grid-cols-${cols} p-4`}>
            {images.map((img, index) => (
                <img key={index} src={img.src} alt={img.alt} className="w-full" loading="lazy" />
            ))}
        </div>
    );
}