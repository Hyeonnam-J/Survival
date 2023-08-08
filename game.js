import config from './config.js';

let game;

// 초기화
window.addEventListener('load', () => {
  updateConfigSize();
  game = new Phaser.Game(config);
});

// 창 크기가 변경될 때마다 컨피그 업데이트
window.addEventListener('resize', updateConfigSize);

// 창 크기 변경 시 컨피그 업데이트
function updateConfigSize() {
  config.width = window.innerWidth;
  config.height = window.innerHeight;
  if(game){
    game.scale.resize(config.width, config.height);
  }
}

export default game;
