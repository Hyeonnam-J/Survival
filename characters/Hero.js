export default class Hero extends Phaser.Physics.Arcade.Sprite{
  constructor(scene, x, y, texture){
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.animKey = 'hero_upAnim';
    this.play(this.animKey);

    this.speed = 5;

  };

  update(cursors){
    this.handleInput(cursors);
  }

  handleInput(cursors) {
    if (cursors.left.isDown) {
      this.animKey = 'hero_leftAnim';
      this.x -= this.speed;
    } else if (cursors.right.isDown) {
      this.animKey = 'hero_rightAnim';
      this.x += this.speed;
    }

    if (cursors.up.isDown) {
      this.animKey = 'hero_upAnim';
      this.y -= this.speed;
    } else if (cursors.down.isDown) {
      this.animKey = 'hero_downAnim';
      this.y += this.speed;
    }

    if (this.anims.getCurrentKey() !== this.animKey) {
      this.play(this.animKey);
    }
  }
}