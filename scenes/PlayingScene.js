import config from '../config.js';
import Hero from '../characters/Hero.js';
import Bat from '../characters/Bat.js';
import { getRandomPosition } from '../utility/Math.js';

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

    this.hero = new Hero(this, config.width / 2, config.height / 2, "hero", "hero_upAnim");
    this.cameras.main.startFollow(this.hero);

    this.batGroup = this.physics.add.group();  //적은 물리효과 받음.
    this.addBat("bat", "bat_anim", 10);

    //this.bat = new Bat(this, config.width / 2 + 50, config.height / 2 + 50, "bat", "bat_anim");
    
    this.add.text(20, 20, "Playing game", {
      font: "25px Arial",
      fill: "yellow"
    });

    //키보드 입력 활성화.
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update(){
    this.hero.update(this.cursors);

    this.background.setX(this.hero.x - config.width / 2);
    this.background.setY(this.hero.y - config.height / 2);
    this.background.tilePositionX = this.hero.x - config.width / 2;
    this.background.tilePositionY = this.hero.y - config.height / 2;
    
  }

  addBat(texture, animKey, hp) {
    this.time.addEvent({
      delay: 1000,
      callback: () => {
          let [x, y] = getRandomPosition(this.hero.x, this.hero.y); //배열 비구조화 할당?
          this.batGroup.add(new Bat(this, x, y, texture, animKey, hp));
      },
      loop: true,
    });
  }
}
