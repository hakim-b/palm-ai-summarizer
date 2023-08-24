import { useState, useEffect } from "react";

export default function useClipboardPaste() {
  const [pastedText, setPastedText] = useState("");

  useEffect(() => {
    function handlePaste(event: ClipboardEvent) {
      const clipboardData = event.clipboardData as DataTransfer;
      const pastedText = clipboardData.getData("text");
      setPastedText(pastedText);
    }

    document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, []);

  const triggerPaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setPastedText(clipboardText);
    } catch (error) {
      console.error("Failed to read clipboard:", error);
    }
  };

  return { pastedText, triggerPaste };
}
