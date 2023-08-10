import { mySetCircle } from "../utility/Collision.js";
import Fire from "./Fire.js";

export default class FireRing extends Phaser.Physics.Arcade.Image {
    constructor(scene, hero) {
        const x = hero.x;
        const y = hero.y;
        super(scene, x, y, "fireRing_img");

        this.speed = 150;
        this.duration = 2000;
        this.power = 0;

        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        
        mySetCircle(this, 0.075, 0.075); // 물리성 부여 후에 setCircle 사용 가능.

        this.setVelocity();

        scene.attackGroup.add(this);
        //scene.fireBall_sound.play();

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

    effect(enemy){
        new Fire(this.scene, this);
        this.destroy();
    }
}