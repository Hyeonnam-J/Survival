export default class LoadingScene extends Phaser.Scene {
  constructor() {
    super("LoadingScene");
  }

  preload(){
    this.load.bitmapFont(
      "font", 
      '../assets/font/font.png', 
      '../assets/font/font.xml'
    );

    this.load.audio('fireBall_audio', '../assets/sounds/fireBall.ogg');
    this.load.audio('burning_audio', '../assets/sounds/burning.mp3');
    this.load.audio('destroy_audio', '../assets/sounds/destroy.mp3');
    this.load.audio('hurt_audio', '../assets/sounds/hurt.mp3');
    this.load.audio('fire_audio', '../assets/sounds/fire.mp3');
    this.load.audio('gain_audio', '../assets/sounds/gain.ogg');
    this.load.audio('gameover_audio', '../assets/sounds/gameover.ogg');
    this.load.audio('levelup_audio', '../assets/sounds/levelup.mp3');

    this.load.image("playingSceneBackground_img", "../assets/images/playingSceneBackground.jpg");
    this.load.image("mainSceneBackground_img", "../assets/images/mainSceneBackground.jpg");
    this.load.image("fireBall_img", "../assets/images/fireBall.png");
    this.load.image("battleship_img", "../assets/images/battleship.png");
    this.load.image("fireRing_img", "../assets/images/fireRing.png");
    this.load.image("fire_img", "../assets/images/fire.png");

    //frame 너비와 높이로 사진을 그냥 잘라버린다. 단위는 px. 사진의 크기를 보고 값을 매길 것.
    this.load.spritesheet("hero_sprite", "../assets/spritesheets/hero.png", {
      frameWidth: 144.3,
      frameHeight: 144.25
    });

    this.load.spritesheet("bat_sprite", "../assets/spritesheets/bat.png", {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.spritesheet("explosion_sprite", "../assets/spritesheets/explosion.png", {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.spritesheet("jewel_sprite", "../assets/spritesheets/jewel.png", {
      frameWidth: 16,
      frameHeight: 16
    });
  }

  create() {
    this.add.text(20, 20, "Loading game...", {
      fontSize: '32px',
    });

    this.scene.start("MainScene");

    this.anims.create({
      key: "hero_downAnim",
      frames: this.anims.generateFrameNumbers('hero_sprite', { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "hero_leftAnim",
      frames: this.anims.generateFrameNumbers('hero_sprite', { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "hero_rightAnim",
      frames: this.anims.generateFrameNumbers('hero_sprite', { start: 6, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "hero_upAnim",
      frames: this.anims.generateFrameNumbers('hero_sprite', { start: 9, end: 11 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "bat_anim",
      frames: this.anims.generateFrameNumbers('bat_sprite'),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "explosion_anim",
      frames: this.anims.generateFrameNumbers('explosion_sprite'),
      frameRate: 10,
      repeat: 0,
      hideOnComplete: true
    });
  }
}
