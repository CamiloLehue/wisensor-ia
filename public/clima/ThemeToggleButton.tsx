import { useTheme } from "../hooks/useTheme";
import Button from "./ui/Button";
import { BiMoon, BiSun } from "react-icons/bi";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      className="group absolute left-45 top-1 px-10 pb-10   text-blue-50 "
      aria-label="Toggle theme"
      variant="ghost"
      rounded="full"
    >
      {theme === "dark" ? (
        <BiSun className="text-yellow-400" />
      ) : (
        <BiMoon className="text-blue-50 group-hover:text-blue-500" />
      )}
    </Button>
  );
}
