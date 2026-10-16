
import { useEffect, useState } from 'react';

function DialogueBox({ text, speed = 90 }) {
  const [visibleText, setVisibleText] = useState('');

  useEffect(() => {
    setVisibleText('');

    if (!text) return;

    let index = 0;

    const timer = setInterval(() => {
      index += 1;
      setVisibleText(text.slice(0, index));

      if (index >= text.length) {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <div className="dialogue-box" aria-live="polite">
      <p className="opponent-dialogue">
        {visibleText}
      </p>
    </div>
  );
}

export default DialogueBox;
