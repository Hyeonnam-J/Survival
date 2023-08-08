import FireBall from "../attacks/FireBall.js";

export default class Hero extends Phaser.Physics.Arcade.Sprite{
  constructor(scene, x, y, texture, animKey){
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.currentAnimKey = animKey;
    this.play(this.currentAnimKey);

    this.speed = 5;

    scene.time.addEvent({
      delay: 1000,
      callback: () => {
          this.shootFireBall();
      },
      loop: true,
    });

  };

  update(cursors){
    this.handleInput(cursors);
  }

  handleInput(cursors) {
    if (cursors.left.isDown) {
      this.currentAnimKey = 'hero_leftAnim';
      this.x -= this.speed;
    } else if (cursors.right.isDown) {
      this.currentAnimKey = 'hero_rightAnim';
      this.x += this.speed;
    }

    if (cursors.up.isDown) {
      this.currentAnimKey = 'hero_upAnim';
      this.y -= this.speed;
    } else if (cursors.down.isDown) {
      this.currentAnimKey = 'hero_downAnim';
      this.y += this.speed;
    }

    if (this.anims.getCurrentKey() !== this.currentAnimKey) {
      this.play(this.currentAnimKey);
    }
  }

  shootFireBall() {
    new FireBall(this.scene, this);
  }
}