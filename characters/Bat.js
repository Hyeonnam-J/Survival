import { mySetSize } from "../utility/Collision.js";
import Explosion from '../effects/Explosion.js';
import Jewel from '../items/Jewel.js';
import Unit from '../utility/Unit.js';

export default class Bat extends Phaser.Physics.Arcade.Sprite{
  constructor(scene, x, y, texture, animKey){
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    mySetSize(this, 1.5, 1.5);

    if(animKey){
      this.play(animKey);
    };
    
    this.speed = Unit.enemyMoveSpeed * (5 / 3);
    this.hp = Unit.enemyHp;
    this.score = Unit.enemyScore;
    this.power = Unit.enemyPower;

    this.move = [];
    this.move.push(this.scene.time.addEvent({
      delay: Unit.enemyMoveTerm,
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