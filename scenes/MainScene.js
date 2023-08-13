import config from "../config.js";
import SelectButton from "../ui/SelectButton.js";
import Font from "../utility/Font.js";
import { setScaleCoverBackground } from "../utility/Processing.js";

export default class MainScene extends Phaser.Scene {
  constructor() {
      super("MainScene");
  }

  create() {
    
    this.mainSceneBackground = this.add.image(config.width / 2, config.height / 2, "mainSceneBackground_img");
    setScaleCoverBackground(this.mainSceneBackground);
    /*
    const bg = this.add.graphics();
    bg.fillStyle(0xbbdefb);
    bg.fillRect(0, 0, config.width, config.height);
    bg.setScrollFactor(0);
    */ 

    this.add.bitmapText(config.width / 2, 150, 'font', 'Dragon Survival', Font.size.title).setOrigin(0.5);

    this.add.image(config.width / 2, config.height / 2, 'hero_sprite');

    new SelectButton(
      this,
      'Start Game', 
      () => this.scene.start("PlayingScene")  //화살표 함수를 사용하면 바인딩하지 않아도 된다
      /*
      config.width / 2, 
      config.height / 2 + config.height / 4, 
      200,
      50,
      '#8aacc8',
      '#000',
      '#fff'
      '24px'
      */
    );
  }
}