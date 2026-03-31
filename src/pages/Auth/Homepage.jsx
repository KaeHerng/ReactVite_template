import { useEffect, useRef } from "react";

export default function BoldAgency() {
  const cursorRef = useRef(null);
  const magneticRef = useRef(null);
  const magneticBtnRef = useRef(null);

  const tickerRef = useRef(null);

  /* ---------------- CURSOR ---------------- */
  useEffect(() => {
    const cursor = cursorRef.current;

    const move = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    document.addEventListener("mousemove", move);
    return () => document.removeEventListener("mousemove", move);
  }, []);

  /* ---------------- MAGNETIC BUTTON ---------------- */
  useEffect(() => {
    const area = magneticRef.current;
    const btn = magneticBtnRef.current;

    const move = (e) => {
      const rect = area.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    };

    const reset = () => {
      btn.style.transform = "translate(0,0)";
    };

    area.addEventListener("mousemove", move);
    area.addEventListener("mouseleave", reset);

    return () => {
      area.removeEventListener("mousemove", move);
      area.removeEventListener("mouseleave", reset);
    };
  }, []);

  /* ---------------- HOVER CURSOR ---------------- */
  const onHover = (state) => {
    cursorRef.current.classList.toggle("scale-150 bg-accent", state);
  };

  /* ---------------- Scroll-driven (marquee) ---------------- */
  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;
  
    let position = 0;
    const speed = -0.6; // 调这个：- 向左，+ 向右
    const halfWidth = ticker.scrollWidth / 2;
  
    const animate = () => {
      position += speed;
  
      if (position <= -halfWidth) position += halfWidth;
      if (position >= 0) position -= halfWidth;
  
      ticker.style.transform = `translateX(${position}px)`;
      requestAnimationFrame(animate);
    };
  
    requestAnimationFrame(animate);
  }, []);

  return (
    <div className="bg-[#242424]">
      {/* CURSOR */}
      <div
        ref={cursorRef}
        className="fixed z-[9999] w-5 h-5 border-2 border-accent rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-all"
      />

      {/* HEADER */}
      <header className="fixed top-0 w-full flex justify-between items-center p-8 z-50 mix-blend-difference">
        <div className="font-heading text-2xl tracking-widest">BOLD.</div>
        <nav className="hidden md:block">
          <ul className="flex gap-8 uppercase text-sm font-semibold">
            {["Work", "Services", "Contact"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  onMouseEnter={() => onHover(true)}
                  onMouseLeave={() => onHover(false)}
                  className="relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-accent hover:after:w-full after:transition-all">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* HERO */}
      {/* <section className="h-screen flex flex-col justify-center items-center text-center border-b border-border relative">
        <h1 className="font-heading text-[clamp(4rem,15vw,12rem)] leading-[0.90] uppercase font-bold tracking-[-0.11em]">
          Visual
          <span className="relative z-20 block -mt-10 text-black stroke-text bg-yellow-300 py-10">Impact</span>
        </h1>

        <div
          ref={magneticRef}
          onMouseEnter={() => onHover(true)}
          onMouseLeave={() => onHover(false)}
          className="mt-5">
          <button
            ref={magneticBtnRef}
            className="tracking-[-0.05em] font-bold uppercase bg-accent text-bg px-16 py-6 rounded-full font-heading text-xl flex items-center gap-4 transition-transform bg-[#ccff00] text-black">
            Start Project →
          </button>
        </div>
      </section> */}

      <section className="h-screen flex flex-col justify-center items-center text-center border-b border-border relative overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-2"
          src="/assets/background1.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/assets/background1-poster.jpg"
        />

        <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-3"></div>

        <h1 className="font-heading text-[clamp(4rem,15vw,12rem)] leading-[0.90] uppercase font-black tracking-[-0.11em] relative z-10">
          Chong
          <span className="relative z-20 block -mt-10 text-black stroke-text bg-yellow-300 py-10">
            Kae Herng
          </span>
        </h1>
          
        <div
          ref={magneticRef}
          onMouseEnter={() => onHover(true)}
          onMouseLeave={() => onHover(false)}
          className="mt-5 relative z-10">
          <button
            ref={magneticBtnRef}
            className="tracking-[-0.05em] font-bold uppercase bg-accent text-bg px-16 py-6 rounded-full font-heading text-xl flex items-center gap-4 transition-transform bg-[#ccff00] text-black">
            Start Project →
          </button>
        </div>
      </section>

      {/* TICKER */}
      <div className="bg-[#ccff00] overflow-hidden py-6 border-b border-border text-black font-bold">
        <div
          ref={tickerRef}
          className="flex w-[200%] whitespace-nowrap tracking-[-0.09em]">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex">
              {Array(4)
                .fill("Strategy // Branding // Development // Motion //")
                .map((text, j) => (
                  <div
                    key={j}
                    className="font-heading text-5xl pr-16 flex items-center">
                    {text}
                    <span className="ml-16 text-3xl">✦</span>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>


      {/* SERVICES */}
      <section id="services" className="max-w-7xl mx-auto px-8 py-24">
        <h2 className="font-heading text-6xl uppercase mb-12 tracking-[-0.05em]">What we do</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            ["01", "Branding"],
            ["02", "Development"],
            ["03", "Motion"],
          ].map(([num, title]) => (
            <div
              key={num}
              onMouseEnter={() => onHover(true)}
              onMouseLeave={() => onHover(false)}
              className="border-4 border-text p-8 min-h-[300px] transition-all hover:bg-text hover:text-bg hover:-translate-y-2 hover:shadow-[10px_10px_0_#ccff00]">
              <span className="font-heading text-6xl opacity-50">{num}</span>
              <h3 className="font-heading text-4xl uppercase mt-6">
                {title}
              </h3>
              <p className="mt-4 font-semibold opacity-80">
                Loud, bold, and impossible to ignore.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* WORK */}
      <section id="work">
        <h2 className="font-heading text-6xl uppercase px-8 mb-12 font-bold tracking-[-0.05em]">
          Selected Work
        </h2>

        <div className="grid md:grid-cols-2 border-t border-l border-border">
          {[1, 2].map((i) => (
            <article
              key={i}
              onMouseEnter={() => onHover(true)}
              onMouseLeave={() => onHover(false)}
              className="relative h-[600px] overflow-hidden border-r border-b border-border">
              <img
                src={`https://picsum.photos/seed/brutal${i}/800/800`}
                className="w-full h-full object-cover grayscale hover:grayscale-0 hover:scale-110 transition-all duration-700"
              />
              <div className="absolute bottom-0 p-8 bg-gradient-to-t from-black to-transparent w-full">
                <h4 className="font-heading text-3xl text-[#ccff00] uppercase font-bold tracking-[-0.05em]">
                  Project {i}
                </h4>
                <div className="font-[600]">31/10/2026</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="py-24 text-center border-t border-border">
        <h2 className="font-heading text-[clamp(3rem,8vw,8rem)] uppercase mb-8 tracking-[-0.13em] font-bold">
          Let’s build
          <br />
          something ugly.
        </h2>

        <a
          href="mailto:hello@bold.agency"
          onMouseEnter={() => onHover(true)}
          onMouseLeave={() => onHover(false)}
          className="text-2xl underline underline-offset-8">
          hello@bold.agency
        </a>
      </footer>
    </div>
  );
}
