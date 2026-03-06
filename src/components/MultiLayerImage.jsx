import React from "react";
import { motion } from "framer-motion";
import "../styles/multiLayerImage.css";

const layers = [
  { src: "https://i.imgur.com/gu2o0GQ.png", zIndex: 500, delay: 0, variant: "smalltoBig" },
  { src: "https://i.imgur.com/VZt4VrL.png", zIndex: 400, delay: 0.1, variant: "leftToRight" },
  { src: "https://i.imgur.com/HebXnVa.png", zIndex: 300, delay: 0.2, variant: "rightToLeft" },
  { src: "https://i.imgur.com/AhwueAu.png", zIndex: 200, delay: 0.3, variant: "leftToRight" },
  { src: "https://i.imgur.com/FAoWnFV.png", zIndex: 100, delay: 0.4, variant: "rightToLeft" },
  { src: "https://i.imgur.com/vuNymy9.png", zIndex: 50, delay: 0.4, variant: "leftToRight" },
];

const variants = {
//   fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  smalltoBig: { 
    hidden: { opacity: 0, scale: 0.8 },  // start smaller
    visible: { opacity: 1, scale: 1 }    // scale up to normal
  },
  leftToRight: { hidden: { opacity: 0, x: -100 }, visible: { opacity: 1, x: 0 } },
  rightToLeft: { hidden: { opacity: 0, x: 100 }, visible: { opacity: 1, x: 0 } },
};

export default function MultiLayerImage() {
  return (
    <div className="multi-layer-container">
      {layers.map((layer, idx) => (
        <motion.img
          key={idx}
          src={layer.src}
          alt=""
          className="layer"
          style={{ zIndex: layer.zIndex }}
          initial={variants[layer.variant].hidden}
          whileInView={variants[layer.variant].visible}  // ← 使用 whileInView
          viewport={{ once: false, amount: 0.5 }}       // ← 每次进入都触发
          transition={{ duration: 0.3, delay: layer.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
