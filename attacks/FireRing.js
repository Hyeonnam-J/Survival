import { mySetCircle } from "../utility/Collision.js";
import Fire from "./Fire.js";
import config from '../config.js';

export default class FireRing extends Phaser.Physics.Arcade.Image {

    static name = '파이어 링';
    static level = 0;
    static finalLevel = 4;
    static descriptions = {
        1: '파이어 링 공격을 사용할 수 있다',
        2: '레벨 2 달성 시 파이어 링 위력 10% 향상',
        3: '레벨 3 달성 시 파이어 링 위력 10% 향상',
        4: '레벨 4 달성 시 파이어 링 위력 10% 향상'
    };

    static levelOneAbility = {
        speed: 150,
        duration: 2000,
        power: 0,
        cooldown: 4000
    };

    static levelUpModifiers = {
        2: {
            speed: (prev) => prev * 1.1,
            duration: (prev) => prev * 1.1,
            power: (prev) => prev * 1.1,
            cooldown: (prev) => prev * 1.1
        },
        3: {
            speed: (prev) => prev * 1.1,
            duration: (prev) => prev * 1.1, 
            power: (prev) => prev * 1.1,
            cooldown: (prev) => prev * 1.1
        },
        4: {
            speed: (prev) => prev * 1.1,
            duration: (prev) => prev * 1.1, 
            power: (prev) => prev * 1.1,
            cooldown: (prev) => prev * 1.1
        }
    };

    static getLevelAbility(level) {
        let ability = { ...this.levelOneAbility };
    
        for (let i = 2; i <= level; i++) {
            if (this.levelUpModifiers[i]) {
                const modifiers = this.levelUpModifiers[i];
                ability.speed = modifiers.speed(ability.speed);
                ability.duration = modifiers.duration(ability.duration);
                ability.power = modifiers.power(ability.power);
                ability.cooldown = modifiers.cooldown(ability.cooldown);
            }
        }
    
        return ability;
    }

    static setImageFromScene(scene) {
        return scene.add.image(config.width / 2, config.height / 2, "fireRing_img");
    }

    constructor(scene, hero) {
        const x = hero.x;
        const y = hero.y;
        super(scene, x, y, "fireRing_img");

        const ability = FireRing.getLevelAbility(FireRing.level);
        this.speed = ability.speed;
        this.duration = ability.duration;
        this.power = ability.power;

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

    attackEffect(enemy){
        new Fire(this.scene, this);
        this.destroy();
    }
}