import FireBall from '../attacks/FireBall.js';
import FireRing from '../attacks/FireRing.js';
//import Fire from '../attacks/Fire.js';
import MiddleAttack from '../attacks/MiddleAttack.js';
import LastAttack from '../attacks/LastAttack.js';
import Battleship from "../characters/Battleship.js";
import PlayingScene from "../scenes/PlayingScene.js";

let lastScore = 0;

function pickAttacksArr(){
  const ATTACKS_ARR = [FireBall, FireRing, MiddleAttack, LastAttack];

  // 최종 레벨의 기술은 제외
  const availableAttacks = ATTACKS_ARR.filter(attackClass => attackClass.finalLevel !== attackClass.level);

  let randomAttacks = [];
  // 원본 배열을 보존하기 위해 복사
  // 그런데, 인스턴스가 아니라 지금 클래스 그 자체가 들어가 있어서,
  // 후에 static 접근 시 메서드를 이용할 필요 없다.
  let tempAttackClasses = [...availableAttacks];

  for (let i = 0; i < 3; i++) {
    //Math.random()에 배열의 길이를 곱하면 <0부터 배열의 길이 - 1> 중 하나 생성 후 floor로 내림
    let randomIndex = Math.floor(Math.random() * tempAttackClasses.length);
    randomAttacks.push(tempAttackClasses[randomIndex]);
    tempAttackClasses.splice(randomIndex, 1); // 뽑힌 클래스는 제거
  }

  return randomAttacks;
}

export function events(scene){
  /*
  if(lastScore <= 5 && PlayingScene.score > 5){
    scene.addEnemy(Battleship, "battleship_img", null, Battleship.generationDelay);
  }
  */

  if(lastScore <= 0 && PlayingScene.score > 0){
    scene.scene.pause(scene.scene.key);
    let randomAttacks = pickAttacksArr();
    // 공식문서를 보면 파라미터가 key, data인데,
    // data의 파라미터 타입이 object고, 자바스크립트는 object를 중괄호를 쳐서 표현.
    scene.scene.launch('ModalScene', { playingScene: scene, randomAttacks: randomAttacks });
  }

  lastScore = PlayingScene.score;
}