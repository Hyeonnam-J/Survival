import config from '../config.js';
import Hero from '../characters/Hero.js';
import Bat from '../characters/Bat.js';
import Status from '../ui/Status.js';
import { getRandomPosition } from '../utility/Math.js';
import { hit, hurt, gain } from '../utility/Collision.js';
import Fire from '../attacks/Fire.js';
import PlayTime from '../ui/PlayTime.js';

export default class PlayingScene extends Phaser.Scene {

  constructor() {
    super("PlayingScene");
  }

  create() {

    // 키보드 입력 활성화.
    this.cursors = this.input.keyboard.createCursorKeys();
    // escKey 입력 활성화.
    this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    //사운드
    this.fireBall_sound = this.sound.add('fireBall_audio');
    this.burning_sound = this.sound.add('burning_audio');
    this.destroy_sound = this.sound.add('destroy_audio');
    this.hurt_sound = this.sound.add('hurt_audio');
    this.fire_sound = this.sound.add('fire_audio');
    this.gain_sound = this.sound.add('gain_audio');
    this.gameover_sound = this.sound.add('gameover_audio');
    this.levelup_sound = this.sound.add('levelup_audio');

    //배경
    this.background = this.add.tileSprite(0, 0, config.width, config.height, "background_img");
    this.background.setOrigin(0, 0);
    this.background.setDepth(-99);
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
    this.addEnemy(Bat, "bat_sprite", "bat_anim", Bat.generationDelay);

    //공격
    this.attackGroup = this.add.group();  //공격은 물리효과 없음.

    //item
    this.itemGroup = this.add.group();

    //충돌
    //enemyGroup이 가져야 할 멤버 hp, power, exp, [, deathEffect]
    //attackGroup이 가져야 할 멤버 power [, attackEffect]
    this.physics.add.overlap(this.attackGroup, this.enemyGroup, (attack, enemy) => {
      hit(this, attack, enemy, attack.power, enemy.exp);
    }, null, this);

    this.physics.add.overlap(this.hero, this.enemyGroup, (hero, enemy) => {
      hurt(this, hero, enemy.power);
    }, null, this);

    this.physics.add.overlap(this.hero, this.itemGroup, (hero, item) => {
      gain(this, hero, item);
    }, null, this);

    // status
    // 맵을 확장해서 쓸 경우를 고려해 플레이어 기준으로 좌표 설정.
    this.status = new Status(this, this.hero);
    this.status.setDepth(10);

    // PlayTime
    this.playTime = new PlayTime(this);
  }

  // time 안 쓰더라도 없으면 deltaTime 적용이 안 됨.
  update(time, deltaTime){
    this.hero.update(this.cursors);

    if (this.escKey.isDown) {
      this.escKey.isDown = false; //게임을 일시중지하고 다시 돌아올 때까지 esc 입력이 유지된 상태로 처리될 수 있다.
      this.scene.pause();
      this.scene.launch('StatusScene', { playingScene: this, hero: this.hero });
    }

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

    // playTime 배경 상단 고정
    this.playTime.setPosition(
      this.hero.x,
      this.hero.y - config.height / 2 + config.height / 20
    )

    // 가장 가까운 적 찾기
    this.selectClosest = this.getClosestEnemyToPlayer();

    // Splash damage
    this.attackGroup.getChildren().forEach(attack => {
      if (attack instanceof Fire) {
          attack.update(deltaTime);
      }
    });
  }

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

  addEnemy(Type, texture, animKey, delay) {
    this.time.addEvent({
      delay: delay,
      callback: () => {
          let [x, y] = getRandomPosition(this.hero.x, this.hero.y);
          this.enemyGroup.add(new Type(this, x, y, texture, animKey));
      },
      loop: true,
    });
  }
}
