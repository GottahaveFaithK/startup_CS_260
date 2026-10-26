import React from 'react';
import OpponentAvatar from './OpponentAvatar';
import DialogueBox from './DialogueBox';

function OpponentPanel({
    opponent,
    animation,
    blinkRequested,
    setBlinkRequested,
    setAvatarAnimation,
    dialogue,
    onDialogueComplete,
}) {
    return (
        <section className="game-panel opponent-panel col-md-4 order-1">
            <h2>Opponent</h2>

            <OpponentAvatar
                opponent={opponent}
                animation={animation}
                onAnimationIteration={() => {
                    if (animation === 'idle' && blinkRequested) {
                        setBlinkRequested(false);
                        setAvatarAnimation('blink');
                    }
                }}
                onAnimationEnd={() => {
                    if (animation === 'blink') {
                        setAvatarAnimation('idle');
                    }
                }}
            />

            <p className="opponent-name">{opponent.name}</p>

            <DialogueBox
                text={dialogue}
                onComplete={onDialogueComplete}
            />
        </section>
    );
}

export default OpponentPanel;