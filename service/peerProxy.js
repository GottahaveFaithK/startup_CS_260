const { WebSocketServer, WebSocket } = require('ws');

function peerProxy(httpServer) {
    const socketServer = new WebSocketServer({
        server: httpServer,
        path: '/ws'
    });

    function broadcastScore(score) {
        const message = JSON.stringify({
            type: 'scoreSubmitted',
            score
        });

        socketServer.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    }

    return broadcastScore;
}

module.exports = { peerProxy };