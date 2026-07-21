(() => {
  const canvas = document.querySelector('#snake-game');
  if (!canvas) return;

  const context = canvas.getContext('2d');
  const gridSize = 20;
  const cellSize = canvas.width / gridSize;
  const highScoreKey = 'nasang-snake-high-score';
  const directions = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
  };
  const state = {
    snake: [],
    direction: directions.right,
    queuedDirection: directions.right,
    food: null,
    obstacles: [],
    spawnedObstacles: 0,
    score: 0,
    highScore: readHighScore(),
    phase: 'idle',
    gameTimer: null,
    obstacleTimer: null,
    pausedAt: 0,
  };

  const scoreElement = document.querySelector('#game-score');
  const highScoreElement = document.querySelector('#game-high-score');
  const statusElement = document.querySelector('#game-status');

  function readHighScore() {
    try {
      return Number.parseInt(localStorage.getItem(highScoreKey) || '0', 10) || 0;
    } catch {
      return 0;
    }
  }

  function writeHighScore() {
    try {
      localStorage.setItem(highScoreKey, String(state.highScore));
    } catch {
      // The game remains playable when storage is unavailable.
    }
  }

  function setStatus(value) {
    statusElement.textContent = value;
  }

  function updateHud() {
    scoreElement.textContent = String(state.score);
    highScoreElement.textContent = String(state.highScore);
  }

  function samePosition(first, second) {
    return first.x === second.x && first.y === second.y;
  }

  function randomPosition() {
    for (let attempt = 0; attempt < 400; attempt += 1) {
      const position = {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize),
      };
      if (state.snake.some((part) => samePosition(part, position))) continue;
      if (state.obstacles.some((obstacle) => samePosition(obstacle, position))) continue;
      if (state.food && samePosition(state.food, position)) continue;
      return position;
    }
    return { x: 0, y: 0 };
  }

  function clearTimers() {
    if (state.gameTimer !== null) clearInterval(state.gameTimer);
    if (state.obstacleTimer !== null) clearInterval(state.obstacleTimer);
    state.gameTimer = null;
    state.obstacleTimer = null;
  }

  function startTimers() {
    clearTimers();
    state.gameTimer = setInterval(tick, 150);
    state.obstacleTimer = setInterval(spawnObstacle, 4000);
  }

  function resetState() {
    clearTimers();
    state.snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
    state.direction = directions.right;
    state.queuedDirection = directions.right;
    state.obstacles = [];
    state.spawnedObstacles = 0;
    state.score = 0;
    state.food = randomPosition();
    state.pausedAt = 0;
    updateHud();
    draw();
  }

  function beginGame() {
    resetState();
    state.phase = 'running';
    setStatus('RUNNING');
    startTimers();
  }

  function resumeGame() {
    if (state.phase !== 'paused') return;
    const pausedDuration = Date.now() - state.pausedAt;
    state.obstacles.forEach((obstacle) => { obstacle.expiresAt += pausedDuration; });
    state.phase = 'running';
    setStatus('RUNNING');
    startTimers();
  }

  function pauseGame() {
    if (state.phase !== 'running') return;
    clearTimers();
    state.pausedAt = Date.now();
    state.phase = 'paused';
    setStatus('PAUSED');
  }

  function endGame() {
    clearTimers();
    state.phase = 'over';
    if (state.score > state.highScore) {
      state.highScore = state.score;
      writeHighScore();
    }
    updateHud();
    setStatus('GAME OVER');
    draw();
  }

  function setDirection(nextDirection) {
    if (state.phase !== 'running') return;
    const current = state.queuedDirection;
    if (state.snake.length > 1 && nextDirection.x === -current.x && nextDirection.y === -current.y) return;
    state.queuedDirection = nextDirection;
  }

  function cleanupObstacles() {
    const now = Date.now();
    state.obstacles = state.obstacles.filter((obstacle) => obstacle.expiresAt > now);
  }

  function spawnObstacle() {
    if (state.phase !== 'running' || state.spawnedObstacles >= 5) return;
    cleanupObstacles();
    if (state.obstacles.length >= 3) return;
    const position = randomPosition();
    state.obstacles.push({ ...position, expiresAt: Date.now() + 4000 });
    state.spawnedObstacles += 1;
    draw();
  }

  function hitsObstacle(position) {
    return state.obstacles.some((obstacle) => samePosition(obstacle, position));
  }

  function hitsSnake(position) {
    return state.snake.some((part) => samePosition(part, position));
  }

  function tick() {
    cleanupObstacles();
    state.direction = state.queuedDirection;
    const head = state.snake[0];
    const nextHead = { x: head.x + state.direction.x, y: head.y + state.direction.y };
    const outside = nextHead.x < 0 || nextHead.x >= gridSize || nextHead.y < 0 || nextHead.y >= gridSize;
    if (outside || hitsSnake(nextHead) || hitsObstacle(nextHead)) {
      endGame();
      return;
    }

    state.snake.unshift(nextHead);
    if (state.food && samePosition(nextHead, state.food)) {
      state.score += 10;
      if (state.score > state.highScore) state.highScore = state.score;
      state.food = randomPosition();
      updateHud();
    } else {
      state.snake.pop();
    }
    draw();
  }

  function drawCell(position, color) {
    context.fillStyle = color;
    context.fillRect(position.x * cellSize + 1, position.y * cellSize + 1, cellSize - 2, cellSize - 2);
  }

  function draw() {
    context.fillStyle = '#020403';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = 'rgba(101, 244, 154, 0.08)';
    for (let line = 0; line <= gridSize; line += 1) {
      context.beginPath();
      context.moveTo(line * cellSize, 0);
      context.lineTo(line * cellSize, canvas.height);
      context.stroke();
      context.beginPath();
      context.moveTo(0, line * cellSize);
      context.lineTo(canvas.width, line * cellSize);
      context.stroke();
    }
    state.obstacles.forEach((obstacle) => drawCell(obstacle, '#e86565'));
    if (state.food) drawCell(state.food, '#f5d76e');
    state.snake.forEach((part, index) => drawCell(part, index === 0 ? '#e3f8ed' : '#65f49a'));
  }

  const keyDirections = {
    ArrowUp: directions.up, w: directions.up, W: directions.up,
    ArrowDown: directions.down, s: directions.down, S: directions.down,
    ArrowLeft: directions.left, a: directions.left, A: directions.left,
    ArrowRight: directions.right, d: directions.right, D: directions.right,
  };

  document.addEventListener('keydown', (event) => {
    const nextDirection = keyDirections[event.key];
    if (!nextDirection) return;
    event.preventDefault();
    setDirection(nextDirection);
  });

  document.querySelectorAll('[data-direction]').forEach((button) => {
    const move = (event) => {
      event.preventDefault();
      setDirection(directions[button.dataset.direction]);
    };
    button.addEventListener('pointerdown', move);
    button.addEventListener('touchstart', move, { passive: false });
  });

  document.querySelector('#game-start').addEventListener('click', () => {
    if (state.phase === 'paused') resumeGame();
    else beginGame();
  });
  document.querySelector('#game-pause').addEventListener('click', pauseGame);
  document.querySelector('#game-restart').addEventListener('click', beginGame);

  resetState();
  window.snakeGame = {
    getState: () => ({ phase: state.phase, score: state.score, highScore: state.highScore, obstacles: state.obstacles.length }),
  };
})();
