import { mySetSize, enemyMove } from "../utility/Collision.js";
import Explosion from '../effects/Explosion.js';
import Jewel from '../items/Jewel.js';

export default class Bat extends Phaser.Physics.Arcade.Sprite{

  static generationDelay = 2000;

  constructor(scene, x, y, texture, animKey){
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    mySetSize(this, 1.5, 1.5);

    if(animKey){
      this.play(animKey);
    };
    
    this.speed = 50;
    this.hp = 20;
    this.exp = 2;
    this.power = 10;
    
    this.move = [];
    enemyMove(this, scene, this.move, this.speed);
  };
  
  deathEffect(scene, enemy){
    new Explosion(scene, enemy.x, enemy.y);

    // 30% 확률로 jewel drop
    if(0 == Phaser.Math.Between(0, 2)){
      new Jewel(scene, enemy.x, enemy.y);
    }
    
    scene.burning_sound.play();
  }
}