import { mySetSize } from "../utility/Collision.js";
import Explosion from "../effects/Explosion.js";

export default class Battleship extends Phaser.Physics.Arcade.Image{
  constructor(scene, x, y, texture, animKey){
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    mySetSize(this, 0.2, 0.2);
    
    this.speed = 30;
    this.hp = 40;
    this.score = 2;
    this.power = 25;

    this.move = [];
    this.move.push(this.scene.time.addEvent({
      delay: 100,
      callback: () => {
        scene.physics.moveToObject(this, scene.hero, this.speed);
      },
      loop: true,
    }));
  };

  deathEffect(scene, enemy){
    new Explosion(scene, enemy.x, enemy.y);
    scene.destroy_sound.play();
  }
}