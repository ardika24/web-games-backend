const gameRouter = require('express').Router();
const GameController = require('../../controllers/gameController');
const restrict = require('../../middlewares/restrict');

gameRouter.get('/', (_, res) => {
  res.send('from game');
});

// @ /api/v1/games
gameRouter.get('/high-score', restrict, GameController.getHighScore);
gameRouter.put('/:id', restrict, GameController.updateScore);

module.exports = gameRouter;
