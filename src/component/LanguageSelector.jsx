import { useState } from "react";

export default function LanguageSelector({ onSelect }) {
  const [name, setName] = useState("");

  return (
    <div className="lang-container">
      <h2>Please Enter Your Name</h2>

      <input
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div>
        <button onClick={() => onSelect("en", name)}>English</button>
        <button onClick={() => onSelect("hi", name)}>हिंदी</button>
      </div>
    </div>
  );
}