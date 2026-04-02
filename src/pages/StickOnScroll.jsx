import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ContainerRotate from "../components/ContainerRotate";
import { image } from "framer-motion/client";

export default function StickOnScroll() {
  const [active, setActive] = useState(0);

  const parts = [
    {
      title: "Frontend Development",
      desc: "Building modern, responsive user interfaces using JavaScript frameworks like React.js, Next.js, and Vue.js. Focused on performance, clean architecture, and scalable component design.",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/960px-React-icon.svg.png",
    },
    {
      title: "Backend Development",
      desc: "Developing robust server-side applications with Node.js, handling APIs, authentication, and database integration. Ensuring performance, security, and maintainability.",
      imageUrl: "https://cdn3d.iconscout.com/3d/premium/thumb/next-js-3d-icon-png-download-14503684.png",
    },
    {
      title: "UI / Styling & Experience",
      desc: "Crafting clean and modern interfaces using CSS and Tailwind CSS. Focused on responsive design, layout systems, and creating smooth, engaging user experiences.",
      imageUrl: "https://nicodeprogram.altervista.org/wp-content/uploads/2025/05/HTML-CSS-JS-Logo.png",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
      },
    },
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      // Section B starts after Section A
      const offset = scrollY - vh * 2;

      if (offset < 0) {
        setActive(0);
        return;
      }

      const index = Math.floor(offset / vh);

      // clamp to prevent overflow
      const clamped = Math.max(0, Math.min(parts.length - 1, index));

      setActive(clamped);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [parts.length]);

  return (
    <div className="font-sans">

      {/* SECTION A */}
      <section className="relative h-screen flex items-center justify-center bg-black text-white overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/assets/RedEyes.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70" />
        <h1 className="text-5xl font-bold z-10 relative flex flex-col items-center justify-center">
          <div>Section A</div>
        </h1>
      </section>

      <section className="h-screen flex items-center justify-center bg-black text-white">
        <h1 className="text-5xl font-bold">Section B</h1>
      </section>

      {/* SECTION C (PINNED STORY SECTION) */}
      <section className="relative h-[400vh] bg-gradient-to-b from-[#6d28d9] via-[#2563eb] via-[#06b6d4] to-[#34d399]">
        
        
        <div className="sticky top-0 h-screen w-full flex items-center justify-center">
          <div className="text-white w-full px-10">
            <h2 className="text-4xl font-bold mb-10 text-center">
              Section C
            </h2>
      
            {parts.map((item, i) => (
              active === i && (
                <div key={i}
                  className="h-[80vh] w-full"
                >
                  <div className="w-full flex flex-col md:flex-row justify-between items-center">
              
                    <div className="flex flex-col justify-center items-center w-full md:w-1/2 md:pl-30 min-w-0 py-10">
                      <div className="break-words w-full text-xl">
                        <p className="indent-8">
                          {`    Frontend Developer with strong experience in building modern, responsive web applications using React.js, Next.js, and Vue.js. Skilled in creating scalable, maintainable UI architectures and delivering clean user experiences.`}
                        </p>

                        <p className="indent-8">
                          {`    Possess basic backend knowledge with Node.js, allowing for better understanding of full-stack workflows and API integration. Focused on writing efficient code, improving performance, and continuously learning new technologies.`}
                        </p>
                      </div>
                      <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={cardVariants}
                      className="break-words w-full flex">
                        <div className="py-6 pr-6 flex flex-col gap-2">
                            {[0, 1, 2].map((step) => (
                              <div
                                key={step}
                                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300
                                  ${active === step
                                      ? "bg-[#37ded7] text-white"
                                      : "bg-transparent border border-gray-500 text-gray-400"}`}>
                                {step + 1}
                              </div>
                            ))}
                        </div>
                        <div className="py-6 rounded-lg w-full">
                          <h3 className="text-4xl font-bold mb-4 text-[#37ded7]">{item.title}</h3>
                          <p className="text-gray-300 break-words w-full">{item.desc}</p>
                        </div>
                      </motion.div>
                    </div>
              
                    <motion.div 
                      initial="hidden"
                      animate="visible"
                      variants={imageVariants} className="flex justify-center w-full md:w-1/2">
                      {/* <div className="border-2 border-dashed border-gray-400 w-full md:w-[80%] h-full flex flex-col items-center justify-center p-4">
                        <div>xxxxx</div>
                        <div>ssss</div>
                      </div> */}
                         <ContainerRotate imageUrl={item.imageUrl} />
                    </motion.div>
              
                  </div>
                </div>
              )
            ))}
      
          </div>
      
        </div>
      </section>

      {/* SECTION D */}
      <section className="h-screen flex items-center justify-center bg-black text-white">
        <h1 className="text-5xl font-bold">Section D</h1>
      </section>
      

    </div>
  );
}