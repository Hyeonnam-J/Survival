import PlayingScene from '../scenes/PlayingScene.js';
import Hero from '../characters/Hero.js';
import { ITEM_TYPE } from "../utility/ItemType.js";
import { levelup } from './LevelUp.js';

export function hit(scene, attack, enemy, damage, exp){

  // 공격 객체에 고유한 효과가 있다면, - 공격 객체 파괴와 적 데미지 피해가 처리되어야 한다
  if(typeof attack.attackEffect === "function"){
    attack.attackEffect(enemy);
  }else{
    attack.destroy();
    enemy.hp -= damage;
  }

  enemyBlink(scene, enemy);

  if(enemy.hp <= 0){

    // 적 객체 죽음에 고유한 효과가 있다면, - 파괴 사운드, 파괴 애니메이션이 처리되어야 한다
    // + item 처리
    if(typeof enemy.deathEffect === "function"){
      enemy.deathEffect(scene, enemy);
    }else{
      // new Explosion(scene, enemy.x, enemy.y);
      // scene.burning_sound.play();
    }

    // 인스턴스의 모든 이벤트를 제거하고 삭제
    enemy.move.forEach(event => {
      event.remove();
    });

    Hero.exp += exp;
    enemy.destroy();

    levelup(scene);
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
  scene.status.drawBar(scene, scene.status.hpBar, scene.status.hpBarX, scene.status.hpBarY, scene.hero.currentHp, scene.hero.maxHp, 0xff0000);

  if(hero.currentHp <= 0){
    scene.gameover_sound.play();
    scene.scene.start("GameOverScene");
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

export function gain(scene, hero, item){
  if(item.itemType == ITEM_TYPE.JEWEL){
    switch(item.jewelNo){
      case 0:
        Hero.jewel_0++;
        break;
      case 1:
        Hero.jewel_1++;
        break;
      case 2:
        Hero.jewel_2++;
        break;
      case 3:
        Hero.jewel_3++;
        break;
    }
  }
  item.destroy();
  scene.gain_sound.play();
}

/**
 * 
 * 스케일과 히트박스 동시 조정.
 */
export function mySetSize(gameObject, scaleValue, hitboxValue){
  gameObject.setScale(scaleValue);

  // setScale을 먼저 적용했다면 width의 값이 그만큼 증가하기 때문에 scale 값으로 나눠줌.
  let originalWidth = gameObject.width / gameObject.scaleX;
  let originalHeight = gameObject.height / gameObject.scaleY;
  gameObject.body.setSize(originalWidth * hitboxValue, originalHeight * hitboxValue);

  let offsetX = (gameObject.width - gameObject.body.width) / 2;
  let offsetY = (gameObject.height - gameObject.body.height) / 2;
  gameObject.body.setOffset(offsetX, offsetY);
}

/**
 * 
 * 스케일과 히트박스 동시 조정.
 */
export function mySetCircle(gameObject, scaleValue, hitboxValue){
  gameObject.setScale(scaleValue);
  // setScale을 먼저 적용했다면 width의 값이 그만큼 증가하기 때문에 scale 값으로 나눠줌.
  const r = (gameObject.width / gameObject.scaleX) / 2;
  gameObject.setCircle(r * hitboxValue); //setScale과 다르게 setCircle의 인수는 반지름의 길이.

  let offsetX = (gameObject.width - gameObject.body.width) / 2;
  let offsetY = (gameObject.height - gameObject.body.height) / 2;
  gameObject.body.setOffset(offsetX, offsetY);
}

export function enemyMove(gameObject, scene, move, speed){
  move.push(gameObject.scene.time.addEvent({
    delay: 100,
    callback: () => {
      scene.physics.moveToObject(gameObject, scene.hero, speed);
    },
    loop: true,
  }));
}