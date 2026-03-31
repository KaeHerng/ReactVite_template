import { useState, useEffect } from "react";
import MultiSelectDropdown from "../components/MultiSelectDropDown";
import RadioGroup from "../components/RadioGroup";
import CheckboxGroup from "../components/CheckboxGroup";
import ThreeDImageCarousel from "../components/ThreeDImageCarousel";

export default function Components() {

  // -----------------------------
  // 8️⃣ Multi Select Dropdown State
  // -----------------------------
  const [selected, setSelected] = useState([]);

  const options = [
    { label: "React", value: "react" },
    { label: "Angular", value: "angular" },
    { label: "Vue", value: "vue" },
    { label: "Svelte", value: "svelte" },
    { label: "xxxx", value: "xxxx" },
    { label: "xx", value: "xx" },
  ];

  // -----------------------------
  // 8️⃣ Radio Group State
  // -----------------------------
  const [plan, setPlan] = useState("starter");
  const radiooptions = [
    {
      label: "Starter Plan",
      value: "starter",
      description: "Basic features for individuals"
    },
    {
      label: "Pro Plan",
      value: "pro",
      description: "Advanced tools for professionals"
    },
    {
      label: "Enterprise",
      value: "enterprise",
      description: "Full features for companies",
      disabled: true
    }
  ];
  
  // -----------------------------
  // 8️⃣ Radio Group State
  // -----------------------------
  const [skills, setSkills] = useState([]);

  const checkoptions = [
    {
      label: "React",
      value: "react",
      description: "Frontend library"
    },
    {
      label: "Node.js",
      value: "node",
      description: "Backend runtime"
    },
    {
      label: "Python",
      value: "python",
      description: "AI / backend"
    },
    {
      label: "Rust",
      value: "rust",
      disabled: true
    }
  ];

  // -----------------------------
  // 8️⃣ ThreeDImageCarousel State
  // -----------------------------
  const slides = [
    { id: 1, src: "https://png.pngtree.com/png-vector/20240829/ourmid/pngtree-delicious-and-testy-cheese-burger-png-image_13659847.png", href: "#" },
    { id: 2, src: "https://png.pngtree.com/png-clipart/20250510/original/pngtree-burger-png-image_19773597.png", href: "#" },
    { id: 3, src: "https://png.pngtree.com/png-clipart/20240830/original/pngtree-burger-with-floating-ingredient-png-image_15881303.png", href: "#" },
    { id: 4, src: "https://png.pngtree.com/png-clipart/20240610/original/pngtree-fast-food-big-burger-png-image_15295528.png", href: "#" },
    { id: 5, src: "https://img.pikbest.com/png-images/20241202/tasty-fresh-beef-burger-with-delicious-cheese-free-png-and-clipart_11160704.png!w700wp", href: "#" }
  ];

  // -----------------------------
  // 8️⃣ JSX Render
  // -----------------------------
  return (
    <div className="tasks-page">
      <h2 className="largeText" style={{ fontWeight: 'bold' }}>💼 <span style={{ color: 'red' }}>Components</span> Lists</h2>

      <div className={`grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 p-4`}>
        <div className="container"> 
            <div className="mb-10 font-semibold">Multi Select Dropdown</div>
            <div style={{ minWidth: "200px" }}>
              <MultiSelectDropdown
                options={options}
                selected={selected}
                onChange={setSelected}
              />
            </div>
        </div>

        <div className="container"> 
            <div className="mb-10 font-semibold">Radio Group</div>
            <RadioGroup
              options={radiooptions}
              value={plan}
              onChange={setPlan}
              variant="card"
              direction="vertical"
            />
        </div>
        <div className="container" > 
            <div className="mb-10 font-semibold">Checkbox Group</div>
            <CheckboxGroup
              options={checkoptions}
              value={skills}
              onChange={setSkills}
              variant="card"
              selectAll
            />
        </div>
        <div className="container"> 
            <div className="mb-10 font-semibold">3D Image Carousel</div>
            <div style={{ width: '100%' }}>
              <ThreeDImageCarousel
                slides={slides}
                autoplay={true}
                delay={3}
              />
            </div>
        </div>
        <div className="container"> xxx </div>
        <div className="container"> xxx </div>
        <div className="container"> xxx </div>
      </div>
    </div>
  );
}
