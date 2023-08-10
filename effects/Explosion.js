export default class Burning extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
      super(scene, x, y, "explosion_sprite");
      scene.add.existing(this);
      this.setScale(2);
      this.play("explosion_anim");
  }
}