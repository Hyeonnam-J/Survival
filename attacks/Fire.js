import { mySetCircle } from "../utility/Collision.js";

export default class Fire extends Phaser.Physics.Arcade.Image {
  constructor(scene, fireRing) {
    super(scene, fireRing.x, fireRing.y, "fire_img");

    this.duration = 4000;
    this.power = 10;

    scene.add.existing(this);
    scene.physics.world.enableBody(this);

    mySetCircle(this, 0.2, 0.1);

    scene.attackGroup.add(this);
    scene.fire_sound.play();

    setTimeout(() => this.destroy(), this.duration);
  }

  effect(enemy){
    
  }

  update(deltaTime) {
    this.scene.enemyGroup.getChildren().forEach(enemy => {
      if (this.scene.physics.overlap(this, enemy)) {
          enemy.hp -= this.power * (deltaTime / 1000);
      }
    });
  }
}