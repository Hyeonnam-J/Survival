import config from "../config.js";
import Button from "../ui/Button.js";

export default class MainScene extends Phaser.Scene {
  constructor() {
      super("MainScene");
  }

  create() {
    const bg = this.add.graphics();
    bg.fillStyle(0xbbdefb);
    bg.fillRect(0, 0, config.width, config.height);
    bg.setScrollFactor(0); 

    this.add.bitmapText(config.width / 2, 150, 'font', 'Dragon Survival', 40).setOrigin(0.5);

    this.add.image(config.width / 2, config.height / 2, 'hero_sprite');

    new Button(config.width / 2, config.height / 2 + 150, 'Start Game', this,
        () => this.scene.start("PlayingScene")
    );
  }
}