import { mySetSize } from "../utility/Collision.js";
import Explosion from '../effects/Explosion.js';
import Jewel from '../items/Jewel.js';

export default class Bat extends Phaser.Physics.Arcade.Sprite{
  constructor(scene, x, y, texture, animKey){
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    mySetSize(this, 1.5, 1.5);

    if(animKey){
      this.play(animKey);
    };
    
    this.speed = 50;
    this.hp = 10;
    this.score = 1;
    this.power = 10;

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
    new Jewel(scene, enemy.x, enemy.y);
    scene.burning_sound.play();
  }
}