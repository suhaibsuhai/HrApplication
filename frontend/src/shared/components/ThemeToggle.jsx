import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../app/providers/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}