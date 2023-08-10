import FireBall from "../attacks/FireBall.js";
import FireRing from "../attacks/FireRing.js";
import { mySetCircle, mySetSize } from "../utility/Collision.js";

export default class Hero extends Phaser.Physics.Arcade.Sprite{
  static jewel_0 = 0;
  static jewel_1 = 0;
  static jewel_2 = 0;
  static jewel_3 = 0;

  constructor(scene, x, y, texture, animKey){
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    mySetCircle(this, 1, 0.5);

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
      FireRing: {
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
  
    if (this.canAttack('FireRing')) {
      new FireRing(this.scene, this);
      this.updateAttackLastUsed('FireRing');
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