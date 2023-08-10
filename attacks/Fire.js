import { mySetCircle } from "../utility/Collision.js";
import Unit from "../utility/Unit.js";

export default class Fire extends Phaser.Physics.Arcade.Image {
  constructor(scene, fireRing) {
    super(scene, fireRing.x, fireRing.y, "fire_img");
    //this.setDepth(50);

    this.duration = Unit.heroAttackValidTime * 4;
    this.power = Unit.heroPower;

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