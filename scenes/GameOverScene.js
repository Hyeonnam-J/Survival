import config from "../config.js";
import Button from "../ui/Button.js";

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOverScene");
  }

  //생성자는 최초 한번이지만 init은 씬이 전환될 때마다 실행된다.
  init(data) {
    this.score = data.score;
  }

  create() {
    const bg = this.add.graphics();
    bg.fillStyle(0x5c6bc0);
    bg.fillRect(0, 0, config.width, config.height);
    bg.setScrollFactor(0);

    this.add.bitmapText(config.width / 2, config.height / 2 - 100, "font", 'Game Over', 40).setOrigin(0.5);

    this.add.bitmapText(config.width / 2, config.height / 2, "font", `SCORE : ${this.score}`, 30).setOrigin(0.5);

    new Button(
      this,
      'Go to Main', 
      () => this.scene.start("MainScene"),
    );
  }
}