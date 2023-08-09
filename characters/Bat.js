import { mySetSize } from "../utility/Collision.js";

export default class Bat extends Phaser.Physics.Arcade.Sprite{
  constructor(scene, x, y, texture, animKey){
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    mySetSize(this, 2);
    
    this.speed = 50;
    this.hp = 20;
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
}