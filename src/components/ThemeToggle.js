import React from 'react';
import './ThemeToggle.css';

const ThemeToggle = ({ isDarkMode, onToggle }) => {
  return (
    <button
      className={`theme-toggle ${isDarkMode ? 'dark' : 'light'}`}
      onClick={onToggle}
      aria-label="Toggle dark/light mode"
    >
      <span className="theme-toggle-track">
        <span className="theme-toggle-thumb">
          <span className="theme-icon">{isDarkMode ? '🌙' : '☀️'}</span>
        </span>
      </span>
      <span className="theme-label">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
    </button>
  );
};

export default ThemeToggle;