import config from '../config.js';

export function getRandomPosition(x, y){

  //라디안 값의 랜덤한 각도.
  const ranRadian = Math.random() * Math.PI * 2;

  //랜덤한 거리 생성-대각선의 길이를 2로 나눠 근접하게.
  const _r = Math.sqrt(config.width * config.width + config.height * config.height) / 2;
    
  const _x = x + (_r * Math.cos(ranRadian));
  const _y = y + (_r * Math.sin(ranRadian));
  
  return [_x, _y];    //배열 반환
}