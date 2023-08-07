import config from './config.js';
import Hero from './Hero.js';

export default class PlayingScene extends Phaser.Scene {
  constructor() {
    super("PlayingScene");
  }

  create() {
    this.background = this.add.tileSprite(0, 0, config.width, 0, "background");
    this.background.setOrigin(0, 0);
    this.background.setScale(
      this.sys.canvas.width / this.background.width,
      this.sys.canvas.height / this.background.height
    )
/*
    this.hero = this.add.sprite(config.width / 2, config.height / 2, "hero");
    this.hero.play('hero_anim');
  */
    this.hero = new Hero(this, config.width / 2, config.height / 2, "hero", "hero_anim");

    this.add.text(20, 20, "Playing game", {
      font: "25px Arial",
      fill: "yellow"
    });
  }

  update(){
    
  }
}
