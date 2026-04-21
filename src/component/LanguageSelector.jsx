import { useState } from "react";

export default function LanguageSelector({ onSelect }) {
  const [name, setName] = useState("");
  const [song, setSong] = useState("");

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

<select onChange={(e) => setSong(e.target.value)}>
  <option value="">Select Song</option>
  <option value="maa">Maa – Taare Zameen Par</option>
  <option value="meri-maa">Meri Maa – Yaariyan</option>
  <option value="tu-kitni">Tu Kitni Achhi Hai</option>
  <option value="luka">Luka Chuppi</option>
  <option value="aisa">Aisa Kyun Maa</option>
</select>
      </div>
    </div>
  );
}