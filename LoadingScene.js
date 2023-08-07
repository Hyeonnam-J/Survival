export default class LoadingScene extends Phaser.Scene {
  constructor() {
    super("LoadingScene");
  }

  preload(){
    this.load.image("background", "assets/images/background.jpg");

    //frame 크기가 바뀌면 에러
    this.load.spritesheet("hero", "assets/spritesheets/hero.png", {
      frameWidth: 16,
      frameHeight: 16
    });
  }

  create() {
    this.add.text(20, 20, "Loading game...");
    this.scene.start("PlayingScene");

    this.anims.create({
      key: "hero_anim",
      frames: this.anims.generateFrameNumbers('hero'),
      frameRate: 10,  //초당 프레임
      repeat: -1
    });
  }
}
