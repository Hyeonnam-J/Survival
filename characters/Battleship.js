import { mySetSize, enemyMove } from "../utility/Collision.js";
import Explosion from "../effects/Explosion.js";
import Jewel from '../items/Jewel.js';

export default class Battleship extends Phaser.Physics.Arcade.Image{

  static generationDelay = 4000;

  constructor(scene, x, y, texture, animKey){
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    mySetSize(this, 0.2, 0.2);
    
    this.speed = 30;
    this.hp = 40;
    this.exp = 2;
    this.power = 20;

    this.move = [];
    enemyMove(this, scene, this.move, this.speed);
  };

  deathEffect(scene, enemy){
    new Explosion(scene, enemy.x, enemy.y);

    // 20% 확률로 jewel drop
    if(0 == Phaser.Math.Between(0, 4)){
      new Jewel(scene, enemy.x, enemy.y);
    }
    
    scene.destroy_sound.play();
  }
}