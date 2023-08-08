export default class Bat extends Phaser.Physics.Arcade.Sprite{
  constructor(scene, x, y, texture, animKey, hp){
    super(scene, x, y, texture);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.hp = hp;
    //this.setScale(2);
    this.play(animKey);

    this.speed = 50;

    this.move = [];
    this.move.push(this.scene.time.addEvent({
      delay: 100,
      callback: () => {
        scene.physics.moveToObject(this, scene.hero, this.speed);
      },
      loop: true,
    }));
  };

  hurt(attack, damage){
    attack.destroy();
    //this.scene.m_hitEnemySound.play();
    this.hp -= damage;

    if(this.hp <= 0){
      this.move.forEach(event => {
        event.remove(); // 모든 이벤트를 제거
      });
      this.destroy();
    }
  }
}