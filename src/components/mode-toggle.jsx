import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { setTheme } = useTheme();
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("theme");
    return savedMode ? savedMode : "system";
  });

  useEffect(() => {
    setTheme(mode);
    if (mode !== "system") {
      localStorage.setItem("theme", mode);
    }
  }, [mode, setTheme]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-12 h-6 rounded-full bg-gray-300 dark:bg-gray-700"
    >
      <span className="absolute left-1 transition-transform duration-300 ease-in-out transform bg-white w-4 h-4 rounded-full dark:translate-x-6" />
      <Sun className="absolute left-1 w-4 h-4 text-yellow-500 dark:hidden" />
      <Moon className="absolute right-1 w-4 h-4 text-blue-500 hidden dark:block" />
    </Button>
  );
}
