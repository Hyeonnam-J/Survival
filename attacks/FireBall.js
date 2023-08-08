export default class FireBall extends Phaser.Physics.Arcade.Image {
    constructor(scene, hero) {
        const x = hero.x;
        const y = hero.y;
        super(scene, x, y, "fireBall_img");
        this.setScale(0.2);

        this.speed = 200;
        this.duration = 1000;
        this.damege = 10;

        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.setCircle(30);
        this.setVelocity();

        scene.attackGroup.add(this);
        scene.fireBall_sound.play();

        setTimeout(() => this.destroy(), this.duration);
    }

    setVelocity() {
        if (! this.scene.selectClosest) {
            this.setVelocityY(-this.speed);
            return;
        }      
        
        const _x = this.scene.selectClosest.x - this.x;
        const _y = this.scene.selectClosest.y - this.y;
        const _r = Math.sqrt(_x*_x + _y*_y);
        
        this.body.velocity.x = (_x / _r) * this.speed;
        this.body.velocity.y = (_y / _r) * this.speed;
    }
}