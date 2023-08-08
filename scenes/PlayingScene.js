import config from '../config.js';
import Hero from '../characters/Hero.js';

export default class PlayingScene extends Phaser.Scene {
  constructor() {
    super("PlayingScene");
  }

  create() {
    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
    this.background.setOrigin(0, 0);
    this.background.setScale(
      this.sys.canvas.width / this.background.width,
      this.sys.canvas.height / this.background.height
    )

    this.hero = new Hero(this, config.width / 2, config.height / 2, "hero");

    this.add.text(20, 20, "Playing game", {
      font: "25px Arial",
      fill: "yellow"
    });

    //키보드 입력 활성화.
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update(){
    this.hero.update(this.cursors);
  }
}
