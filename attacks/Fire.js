import { mySetCircle } from "../utility/Collision.js";
import FireRing from "./FireRing.js";

/**
 * FireRing으로부터 생성되는 공격 오브젝트.
 * Events class에서 randomPick 되지도 않고,
 * 레벨은 FireRing의 레벨을 따라가고,
 * description 객체도 FireRing에서 처리.
 */
export default class Fire extends Phaser.Physics.Arcade.Image {

  static level = 0;

  static levelOneAbility = {
    duration: 4000,
    power: 10
  };

  static levelUpModifiers = {
    2: {
        duration: (prev) => prev,
        power: (prev) => prev
    },
    3: {
        duration: (prev) => prev, 
        power: (prev) => prev
    }
  };

  static getLevelAbility(level) {
    let ability = { ...this.levelOneAbility };

    for (let i = 2; i <= level; i++) {
        if (this.levelUpModifiers[i]) {
            const modifiers = this.levelUpModifiers[i];
            ability.duration = modifiers.duration(ability.duration);
            ability.power = modifiers.power(ability.power);
        }
    }

    return ability;
  }

  constructor(scene, fireRing) {
    super(scene, fireRing.x, fireRing.y, "fire_img");

    Fire.level = FireRing.level;
    const ability = Fire.getLevelAbility(FireRing.level);    
    this.duration = ability.duration;
    this.power = ability.power;

    scene.add.existing(this);
    scene.physics.world.enableBody(this);

    mySetCircle(this, 0.2, 0.1);

    scene.attackGroup.add(this);
    scene.fire_sound.play();

    setTimeout(() => this.destroy(), this.duration);
  }

  attackEffect(enemy){
    // hit에서 공격 사라지고 적에게 데미지주는 로직으로 안 가기 위한 빈 메서드.
  }

  update(deltaTime) {
    this.scene.enemyGroup.getChildren().forEach(enemy => {
      if (this.scene.physics.overlap(this, enemy)) {
          enemy.hp -= this.power * (deltaTime / 1000);
      }
    });
  }
}