
import { useEffect, useState, useRef } from 'react';

function DialogueBox({ text, speed = 90, onComplete }) {
    const [visibleText, setVisibleText] = useState('');
    const onCompleteRef = useRef(onComplete);

    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    useEffect(() => {
        setVisibleText('');

        if (!text) return;

        let index = 0;

        const timer = setInterval(() => {
            index += 1;
            setVisibleText(text.slice(0, index));

            if (index >= text.length) {
                clearInterval(timer);
                onCompleteRef.current?.();
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
