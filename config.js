import LoadingScene from './LoadingScene.js';
import PlayingScene from './PlayingScene.js';

var config = {
  width: 800,
  height: 600,
  backgroundColor: 0x000000,
  scene: [LoadingScene, PlayingScene],
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  }
}

export default config;