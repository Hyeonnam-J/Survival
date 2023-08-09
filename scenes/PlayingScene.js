import config from '../config.js';
import Hero from '../characters/Hero.js';
import Bat from '../characters/Bat.js';
import Status from '../ui/Status.js';
import { getRandomPosition } from '../utility/Math.js';
import { hit, hurt } from '../utility/Collision.js';

export default class PlayingScene extends Phaser.Scene {
  constructor() {
    super("PlayingScene");
  }

  create() {

    //키보드 입력 활성화.
    this.cursors = this.input.keyboard.createCursorKeys();

    //사운드
    this.fireBall_sound = this.sound.add('fireBall_audio');
    this.explosion_sound = this.sound.add('explosion_audio');

    //배경
    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background_img");
    this.background.setOrigin(0, 0);
    /*
    this.background.setScale(
      this.sys.canvas.width / this.background.width,
      this.sys.canvas.height / this.background.height
    )*/

    //플레이어
    this.hero = new Hero(this, config.width / 2, config.height / 2, "hero_sprite", "hero_upAnim");
    this.cameras.main.startFollow(this.hero);

    //적
    this.enemyGroup = this.physics.add.group();  //적은 물리효과 있음.
    this.addBat("bat_sprite", "bat_anim");

    //공격
    this.attackGroup = this.add.group();  //공격은 물리효과 없음.

    //충돌
    //enemyGroup이 가져야 할 멤버 hp, damage, score
    //attackGroup이 가져야 할 멤버 damage 
    this.physics.add.overlap(this.attackGroup, this.enemyGroup, (attack, enemy) => {
      hit(this, attack, enemy, attack.power, enemy.score);
    }, null, this);

    this.physics.add.overlap(this.hero, this.enemyGroup, (hero, enemy) => {
      hurt(this, hero, enemy.power);
    }, null, this);

    // score
    this.score = 0;
    this.scoreLabel 
      = this.add.bitmapText(
        config.width - (config.width / 100), 
        config.height / 100, 
        "font", 
        this.getScoreText(), 
        40);
    this.scoreLabel.setOrigin(1, 0);
    this.scoreLabel.setScrollFactor(0);
    this.scoreLabel.setDepth(10);
    /*
    const graphics = this.add.graphics();
    graphics.fillStyle(0x28288C);
    graphics.fillRect(config.width / 2, 0, config.width / 2, 30);
    graphics.setDepth(10);
    graphics.setScrollFactor(0);
    */

    // status
    // 맵을 확장해서 쓸 경우를 고려해 플레이어 기준으로 좌표 설정.
    this.status = new Status(
      this, 
      this.hero.x - config.width / 2 + config.width / 200,
      this.hero.y - config.height / 2 + config.height / 200,
      this.hero
    );
  }

  getScoreText() {
    return `SCORE ${this.score.toString().padStart(6, '0')}`;
  }

  update(){
    this.hero.update(this.cursors);

    // 배경이 주인공 따라오게
    this.background.setX(this.hero.x - config.width / 2);
    this.background.setY(this.hero.y - config.height / 2);
    this.background.tilePositionX = this.hero.x - config.width / 2;
    this.background.tilePositionY = this.hero.y - config.height / 2;

    // 상태바 배경 좌상단 고정
    this.status.setPosition(
      this.hero.x - config.width / 2 + config.width / 200,
      this.hero.y - config.height / 2 + config.height / 200
    );

    this.selectClosest = this.getClosestEnemyToPlayer();
  }

  //가장 가까운 적 찾기.
  getClosestEnemyToPlayer() {
    let closestEnemy = null;
    let closestDistance = Number.MAX_VALUE;

    //phaser 스크립트를 index.html에 태그한 경우에는 Phaser을 따로 import 안 해도 쓸 수 있네?
    this.enemyGroup.getChildren().forEach(enemy => {
        let distance = Phaser.Math.Distance.Between(this.hero.x, this.hero.y, enemy.x, enemy.y);
        
        if (distance < closestDistance) {
            closestDistance = distance;
            closestEnemy = enemy;
        }
    });

    return closestEnemy;
  }

  addBat(texture, animKey) {
    this.time.addEvent({
      delay: 1000,
      callback: () => {
          let [x, y] = getRandomPosition(this.hero.x, this.hero.y);
          this.enemyGroup.add(new Bat(this, x, y, texture, animKey));
      },
      loop: true,
    });
  }
}
