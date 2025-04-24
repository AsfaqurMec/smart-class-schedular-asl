"use client"; // This should run only on the client side

import { useEffect } from "react";

const PreventScreenshot = () => {
  useEffect(() => {
    // Disable PrintScreen key
    const disablePrintScreen = (event) => {
      if (event.key === "PrintScreen") {
        event.preventDefault();
        alert("Screenshots are not allowed!");
      }
    };

    // Disable Right-Click
    const disableRightClick = (event) => {
      event.preventDefault();
    };

    document.addEventListener("keydown", disablePrintScreen);
    document.addEventListener("contextmenu", disableRightClick);

    return () => {
      document.removeEventListener("keydown", disablePrintScreen);
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);

  return null; // This component only runs the effect, it doesn't render anything
};

export default PreventScreenshot;
