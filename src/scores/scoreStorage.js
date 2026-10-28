export function saveScore(score) {
    const savedScores = JSON.parse(
        localStorage.getItem('leaderboardScores') || '[]'
    );

    savedScores.push(score);

    localStorage.setItem(
        'leaderboardScores',
        JSON.stringify(savedScores)
    );
}