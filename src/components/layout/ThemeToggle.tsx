"use client";

import { MoonIcon, SunIcon } from "@/components/icons";

export function ThemeToggle() {
  function toggleTheme() {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    if (isLight) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }

  return (
    <button type="button" className="theme-toggle" aria-label="Toggle light / dark theme" onClick={toggleTheme}>
      <span className="theme-toggle-icon theme-toggle-icon-sun">
        <SunIcon />
      </span>
      <span className="theme-toggle-icon theme-toggle-icon-moon">
        <MoonIcon />
      </span>
    </button>
  );
}
