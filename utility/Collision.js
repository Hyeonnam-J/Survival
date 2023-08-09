import Explosion from '../effects/Explosion.js';

export function hit(scene, attack, enemy, damage, score){
  attack.destroy();
  enemy.hp -= damage;

  enemyBlink(scene, enemy);

  // hp가 0 이하면 인스턴스의 모든 이벤트를 제거하고 삭제
  if(enemy.hp <= 0){
    new Explosion(scene, enemy.x, enemy.y);
    scene.explosion_sound.play();
    enemy.move.forEach(event => {
      event.remove();
    });

    scene.score += score;
    scene.scoreLabel.setText(scene.getScoreText());
    enemy.destroy();
  }
}

/**
 * enemy는 애니메이션이 적용된 상태라서 충돌 문제로 tweens가 동작하지 않는다?
 */
function enemyBlink(scene, enemy){
  let repeatCount = 10;

  //타이머는 5회 반복 후 자동 파괴.
  scene.time.addEvent({
    delay: 50, 
    repeat: repeatCount,
    callback: () => {
      if (enemy.alpha == 1) {
        enemy.alpha = 0.1;
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

export function hurt(scene, hero, damage){
  if(hero.alpha < 1) return;
  
  scene.hurt_sound.play();
  hero.currentHp -= damage;
  scene.status.drawBar(scene, scene.status.hpBar, scene.status.border, scene.status.border, 0xff0000);

  if(hero.currentHp <= 0){
    scene.scene.start("GameOverScene", { score : scene.score });
  }
  
  hero.disableBody(true, false);
  hero.alpha = 0.5;

  // 공격받은 후 1초 쿨타임
  scene.time.addEvent({
      delay: 1000,
      callback: () => resetHero(hero),
      callbackScope: this,
      loop: false
  });
}

function resetHero(hero) {
  hero.enableBody(true, hero.x, hero.y, true, true);
  hero.alpha = 1;
}

/**
 * 
 * 스케일과 히트박스 동시 조정.
 */
export function mySetSize(gameObject, value){
  gameObject.setScale(value);

  // setScale을 먼저 적용했다면 width의 값이 그만큼 증가하기 때문에 scale 값으로 나눠줌.
  let originalWidth = gameObject.width / gameObject.scaleX;
  let originalHeight = gameObject.height / gameObject.scaleY;
  gameObject.body.setSize(originalWidth * value, originalHeight * value);

}

/**
 * 
 * 스케일과 히트박스 동시 조정.
 */
export function mySetCircle(gameObject, value){
  gameObject.setScale(value);
  // setScale을 먼저 적용했다면 width의 값이 그만큼 증가하기 때문에 scale 값으로 나눠줌.
  const r = (gameObject.width / gameObject.scaleX) / 2;
  gameObject.setCircle(r * value); //setScale과 다르게 setCircle의 인수는 반지름의 길이.
}