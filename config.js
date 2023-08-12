import LoadingScene from './scenes/LoadingScene.js';
import MainScene from './scenes/MainScene.js';
import PlayingScene from './scenes/PlayingScene.js';
import StatusScene from './scenes/StatusScene.js';
import LevelUpScene from './scenes/LevelUpScene.js';
import GameOverScene from './scenes/GameOverScene.js';

var config = {
  width: 800,
  height: 600,
  backgroundColor: 0x000000,
  scene: [LoadingScene, MainScene, PlayingScene, StatusScene, LevelUpScene, GameOverScene],
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  },
}

export default config;