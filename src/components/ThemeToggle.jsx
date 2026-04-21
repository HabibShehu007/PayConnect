import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex items-center gap-2 px-4 py-2 rounded-md 
                 bg-green-600 text-white hover:bg-green-700 transition"
    >
      {theme === "dark" ? (
        <>
          <FiSun /> <span>Light Mode</span>
        </>
      ) : (
        <>
          <FiMoon /> <span>Dark Mode</span>
        </>
      )}
    </button>
  );
}
