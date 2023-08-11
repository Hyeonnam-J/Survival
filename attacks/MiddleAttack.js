import { mySetCircle } from "../utility/Collision.js";

export default class MiddleAttack extends Phaser.Physics.Arcade.Image {

    static level = 3;
    static finalLevel = 4;
    static descriptions = {
        1: 'Middle-1',
        2: 'Middle-2',
        3: 'Middle-3',
        4: 'Middle-4'
    };

    static levelOneAbility = {
        speed: 5555,
        duration: 5555,
        power: 5555,
        cooldown: 5555,
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

    constructor(scene, hero) {
        const x = hero.x;
        const y = hero.y;
        super(scene, x, y, "fireBall_img");
    }
}