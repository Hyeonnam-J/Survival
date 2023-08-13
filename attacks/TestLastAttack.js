import { mySetCircle } from "../utility/Collision.js";
import config from '../config.js';

export default class TestLastAttack extends Phaser.Physics.Arcade.Image {

    static name = '테스트 Last';
    static level = 4;
    static finalLevel = 4;
    static descriptions = {
        1: 'Last-1',
        2: 'Last-2',
        3: 'Last-3',
        4: 'Last-4'
    };

    static levelOneAbility = {
        speed: 9999,
        duration: 9999,
        power: 9999,
        cooldown: 9999,
    };

    static levelUpModifiers = {
      2: {
          speed: (prev) => prev,
          duration: (prev) => prev,
          power: (prev) => prev,
          cooldown: (prev) => prev
      },
      3: {
          speed: (prev) => prev,
          duration: (prev) => prev, 
          power: (prev) => prev,
          cooldown: (prev) => prev,
      },
      4: {
        speed: (prev) => prev,
        duration: (prev) => prev, 
        power: (prev) => prev,
        cooldown: (prev) => prev,
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
        return scene.add.image(config.width / 2, config.height / 2, "fireBall_img");
    }

    constructor(scene, hero) {
        const x = hero.x;
        const y = hero.y;
        super(scene, x, y, "fireBall_img");
    }
}