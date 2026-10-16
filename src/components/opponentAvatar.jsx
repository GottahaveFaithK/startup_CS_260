
function OpponentAvatar({ opponent, animation = 'idle' }) {
    const animationClass = `animation-${animation}`;

    return (
        <div
            className={`opponent-avatar ${animationClass}`}
            style={{
                backgroundImage: `url("${opponent.spriteSheet}")`
            }}
            role="img"
            aria-label={`${opponent.name} ${animation} animation`}
        />
    );
}

export default OpponentAvatar;