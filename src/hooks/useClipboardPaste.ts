import { useState, useEffect } from 'react';

export const useClipboardPaste = (): string | null => {
  const [pastedText, setPastedText] = useState<string | null>(null);

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const clipboardData = event.clipboardData || window.clipboardData;
      const text = clipboardData.getData('text');
      setPastedText(text);
    };

    window.addEventListener('paste', handlePaste);

    return () => {
      window.removeEventListener('paste', handlePaste);
    };
  }, []);

  return pastedText;
};
