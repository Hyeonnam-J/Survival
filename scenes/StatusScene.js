import config from "../config.js";
import Button from "../ui/Button.js";
import PlayingScene from "./PlayingScene.js";

export default class StatusScene extends Phaser.Scene {
  constructor() {
      super("StatusScene");
  }

  init(data){
    this.playingScene = data.playingScene;
    this.hero = data.hero;
  }

  create() {
    const bg = this.add.graphics();
    bg.fillStyle(0xbbdefb);
    bg.fillRect(0, 0, config.width, config.height);
    bg.setScrollFactor(0); 

    this.add.bitmapText(config.width / 2, 150, 'font', 'Dragon Survival', 40).setOrigin(0.5);

    new Button(
      this,
      'back to the game', 
      () => this.resumeGame()
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

  resumeGame(){
    // 이곳에서 console.log(this)를 찍었을 때 먹통이 되는 이유는,
    // this가 복잡한 구조일 때 발생하는 성능 이슈일 수 있다.
    // 반면 console.log(this.playingScene)은 범위가 좁혀진 관계로 문제가 없는 경우.
    
    this.scene.stop(this.scene.key);
    this.scene.resume(this.playingScene.scene.key);

  }
}