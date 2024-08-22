const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

let gameState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";

server.on('connection', (ws) => {
  ws.send(JSON.stringify({
    type: 'init',
    state: gameState,
    player: currentPlayer,
    symbol: currentPlayer,
  }));

  ws.on('message', (message) => {
    const data = JSON.parse(message);

    if (data.type === 'move') {
      gameState[data.index] = currentPlayer;
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      broadcastGameState();
    }
  });
});

function broadcastGameState() {
  server.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({
        type: 'update',
        state: gameState,
      }));
    }
  });
}
