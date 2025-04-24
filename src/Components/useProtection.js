'use client';
import { useEffect } from "react";

const useScreenProtection = () => {
  useEffect(() => {
    // Disable right-click
    const handleContextMenu = (event) => event.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);

    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+C, etc.
    const handleKeyDown = (event) => {
      if (
        event.key === "F12" ||
        (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "C" || event.key === "J"))
      ) {
        event.preventDefault();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
};

export default useScreenProtection;
