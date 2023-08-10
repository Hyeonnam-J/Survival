import { mySetSize, enemyMove } from "../utility/Collision.js";
import Explosion from "../effects/Explosion.js";
import Unit from '../utility/Unit.js';

export default class Battleship extends Phaser.Physics.Arcade.Image{
  constructor(scene, x, y, texture, animKey){
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    mySetSize(this, 0.2, 0.2);
    
    this.speed = Unit.enemyMoveSpeed;
    this.hp = Unit.enemyMoveSpeed * 2;
    this.score = Unit.enemyScore * 2;
    this.power = Unit.enemyPower * 2.5;

    this.move = [];
    enemyMove(this, scene, this.move, this.speed);
  };

  deathEffect(scene, enemy){
    new Explosion(scene, enemy.x, enemy.y);
    scene.destroy_sound.play();
  }
}