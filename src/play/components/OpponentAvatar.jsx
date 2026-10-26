import './opponentAvatar.css';

function OpponentAvatar({ opponent, animation = 'idle', onAnimationEnd, onAnimationIteration}) {
    const animationClass = `animation-${animation}`;

    return (
        <div
            className={`opponent-avatar ${animationClass}`}
            style={{
                backgroundImage: `url("${opponent.spriteSheet}")`
            }}
            onAnimationEnd={onAnimationEnd}
            onAnimationIteration={onAnimationIteration}
            role="img"
            aria-label={`${opponent.name} ${animation} animation`}
        />
    );
}

export default OpponentAvatar;