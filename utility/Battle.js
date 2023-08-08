import Explosion from '../effects/Explosion.js';

export function hurt(scene, attack, enemy, damage){
  attack.destroy();
  enemy.hp -= damage;

  blink(scene, enemy);

  if(enemy.hp <= 0){
    new Explosion(scene, enemy.x, enemy.y);
    scene.explosion_sound.play();
    enemy.move.forEach(event => {
      event.remove();
    });
    enemy.destroy();
  }
}

/**
 * enemy는 애니메이션이 적용된 상태라서 충돌 문제로 tweens가 동작하지 않는다?
 */
function blink(scene, enemy){
  let repeatCount = 10;

  //타이머는 5회 반복 후 자동 파괴.
  scene.time.addEvent({
    delay: 50, 
    repeat: repeatCount,
    callback: () => {
      if (enemy.alpha == 1) {
        enemy.alpha = 0.5;
      } else {
        enemy.alpha = 1;
      }
      repeatCount--;
      if(repeatCount <= 0){
        enemy.alpha = 1;
      }
    }
  });
}