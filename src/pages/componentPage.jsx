import { useState, useEffect } from "react";
import MultiSelectDropdown from "../components/MultiSelectDropDown";
import RadioGroup from "../components/RadioGroup";
import CheckboxGroup from "../components/CheckboxGroup";

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
        <div className="container"> 
            <div className="mb-10 font-semibold">Checkbox Group</div>
            <CheckboxGroup
              options={checkoptions}
              value={skills}
              onChange={setSkills}
              variant="card"
              selectAll
            />
        </div>
        <div className="container"> xxx </div>
        <div className="container"> xxx </div>
        <div className="container"> xxx </div>
        <div className="container"> xxx </div>
      </div>
    </div>
  );
}
