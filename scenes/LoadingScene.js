export default class LoadingScene extends Phaser.Scene {
  constructor() {
    super("LoadingScene");
  }

  preload(){
    this.load.image("background", "assets/images/background.jpg");

    //frame 너비와 높이로 사진을 그냥 잘라버린다. 단위는 px. 사진의 크기를 보고 값을 매길 것.
    this.load.spritesheet("hero", "assets/spritesheets/hero.png", {
      frameWidth: 144.3,
      frameHeight: 144.25
    });
  }

  create() {
    this.add.text(20, 20, "Loading game...");
    this.scene.start("PlayingScene");
/*
    this.anims.create({
      key: "hero_anim",
      frames: this.anims.generateFrameNumbers('hero'),
      frameRate: 10,  //초당 프레임
      repeat: -1
    });
*/
    this.anims.create({
      key: "hero_downAnim",
      frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "hero_leftAnim",
      frames: this.anims.generateFrameNumbers('hero', { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "hero_rightAnim",
      frames: this.anims.generateFrameNumbers('hero', { start: 6, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "hero_upAnim",
      frames: this.anims.generateFrameNumbers('hero', { start: 9, end: 11 }),
      frameRate: 10,
      repeat: -1
    });
  }
}
