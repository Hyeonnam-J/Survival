import config from "../config.js";
import Button from "../ui/Button.js";

export default class ModalScene extends Phaser.Scene {
  constructor() {
      super("ModalScene");

      this.border = config.height / 10;
  }

  init(data) {
    this.playingScene = data.playingScene;
  }

  create() {
    this.drawScene();
    this.drawSelectButton();

    
  }

  drawScene(){
    const bg = this.add.graphics();
    bg.fillStyle(0xffffff);
    bg.fillRect(this.border, this.border, config.width - 2 * this.border, config.height - 2 * this.border);
    bg.setScrollFactor(0); 
  }

  drawSelectButton(){
    new Button(
      this,
      'Select', 
      this.resumeGame.bind(this),
      // 객체의 메서드가 호출되면 this는 객체를 참고하지만,
      // 이벤트 핸들러나 콜백으로 호출되면 this는 다른 것을 참조할 수 있다.
      // 그래서 this가 이 객체를 참조하도록 바인딩.
      // this.resumeGame이 어떤 컨텍스트를 갖게 할 거냐?
      // -> .bind(this) 즉 .bind 안 파라미터 this(지금 이 씬)를 컨텍스트로 갖게 한다.
      config.width / 2 - config.height / 5, 
      config.height / 2 + config.height / 3,
    );

    new Button(
      this,
      'No Select', 
      this.resumeGame.bind(this),
      config.width / 2 + config.height / 5, 
      config.height / 2 + config.height / 3,
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