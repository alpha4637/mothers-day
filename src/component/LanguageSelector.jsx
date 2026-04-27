import { useState } from "react";

export default function LanguageSelector({ onSelect }) {
  const [name, setName] = useState("");
  const [song, setSong] = useState("mumma");

  return (
    <div className="lang-container">
      <div className="lang-card">
        <div className="lang-card-icon">💌</div>
        <h2 className="lang-card-title">Mother's Day Letter</h2>
        <p className="lang-card-subtitle">Create a special letter for your mom</p>

        <div className="lang-input-group">
          <label className="lang-label">Your Name</label>
          <input
            className="lang-input"
            placeholder="Enter your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="lang-input-group">
          <label className="lang-label">Background Song 🎵</label>
          <select
            className="lang-select"
            value={song}
            onChange={(e) => setSong(e.target.value)}
          >
            <option value="mumma">Mumma (Default)</option>
            <option value="maa">Maa – Taare Zameen Par</option>
            <option value="meri-maa">Meri Maa – Yaariyan</option>
            <option value="luka">Luka Chuppi – Rang De Basanti</option>
            <option value="aisa">Aisa Kyun Maa – Neerja</option>
          </select>
        </div>

        <div className="lang-input-group">
          <label className="lang-label">Choose Language</label>
          <div className="lang-btn-group">
            <button
              className="lang-btn"
              onClick={() => onSelect("en", name, song)}
              disabled={!name.trim()}
            >
              English
            </button>
            <button
              className="lang-btn lang-btn-hi"
              onClick={() => onSelect("hi", name, song)}
              disabled={!name.trim()}
            >
              हिंदी
            </button>
          </div>
          {!name.trim() && (
            <p className="lang-hint">Please enter your name first</p>
          )}
        </div>
      </div>
    </div>
  );
}