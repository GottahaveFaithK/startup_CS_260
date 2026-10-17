
function OpponentAvatar({ opponent, animation = 'idle', onAnimationEnd }) {
    const animationClass = `animation-${animation}`;

    return (
        <div
            className={`opponent-avatar ${animationClass}`}
            style={{
                backgroundImage: `url("${opponent.spriteSheet}")`
            }}
            onAnimationEnd={onAnimationEnd}
            role="img"
            aria-label={`${opponent.name} ${animation} animation`}
        />
    );
}

export default OpponentAvatar;