import FireBall from "../attacks/FireBall.js";
import IceRing from "../attacks/IceRing.js";
import { mySetSize } from "../utility/Collision.js";

export default class Hero extends Phaser.Physics.Arcade.Sprite{
  constructor(scene, x, y, texture, animKey){
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    //스프라이트에 배경이 패딩처럼 존재.그래서, 스케일은 내버려 두고, 히트박스만 줄여야 함.
    let originalWidth = this.width / this.scaleX;
    let originalHeight = this.height / this.scaleY;
    this.body.setSize(originalWidth * 0.7, originalHeight * 0.7);

    //스케일이 반영된 렌더링 된 실제 크기에서 히트박스를 빼서 2로 나눈다.
    //이렇게하면 실제 히트박스부터 충돌감지가 시작. 히트박스의 좌상단 0, 0이 기준.
    let offsetX = (this.width - this.body.width) / 2;
    let offsetY = (this.height - this.body.height) / 2;
    this.body.setOffset(offsetX, offsetY);

    this.currentAnimKey = animKey;
    this.play(this.currentAnimKey);

    this.speed = 5;
    this.maxHp = 100;
    this.currentHp = this.maxHp;
    this.maxMp = 100;
    this.currentMp = this.maxMp;

    //중첩 해시 맵 구조.
    this.attacks_map = {
      FireBall: {
        cooldown: 1000,
        lastUsed: 0
      },
      IceRing: {
        cooldown: 4000,
        lastUsed: 0
      }
      
    }

    scene.time.addEvent({
      delay: 1000,
      callback: () => {
          this.attack();
      },
      loop: true,
    });

  };

  update(cursors){
    this.handleInput(cursors);
  }

  handleInput(cursors) {
    if (cursors.left.isDown) {
      this.currentAnimKey = 'hero_leftAnim';
      this.x -= this.speed;
    } else if (cursors.right.isDown) {
      this.currentAnimKey = 'hero_rightAnim';
      this.x += this.speed;
    }

    if (cursors.up.isDown) {
      this.currentAnimKey = 'hero_upAnim';
      this.y -= this.speed;
    } else if (cursors.down.isDown) {
      this.currentAnimKey = 'hero_downAnim';
      this.y += this.speed;
    }

    if (this.anims.getCurrentKey() !== this.currentAnimKey) {
      this.play(this.currentAnimKey);
    }
  }
  
  attack() {
    if (this.canAttack('FireBall')) {
      new FireBall(this.scene, this);
      this.updateAttackLastUsed('FireBall');
    }
  
    if (this.canAttack('IceRing')) {
      new IceRing(this.scene, this);
      this.updateAttackLastUsed('IceRing');
    }
  }

  canAttack(attackName) {
    const now = Date.now();
    return now - this.attacks_map[attackName].lastUsed > this.attacks_map[attackName].cooldown;
  }
  
  updateAttackLastUsed(attackName) {
    this.attacks_map[attackName].lastUsed = Date.now();
  }
}