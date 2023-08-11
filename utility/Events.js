import Battleship from "../characters/Battleship.js";
import PlayingScene from "../scenes/PlayingScene.js";

let lastScore = 0;

export function events(scene){
  if(lastScore <= 5 && PlayingScene.score > 5){
    scene.addEnemy(Battleship, "battleship_img", null, Battleship.generationDelay);
  }

  if(lastScore <= 7 && PlayingScene.score > 7){
    scene.scene.pause(scene.scene.key);
    scene.scene.launch('ModalScene', { playingScene: scene, depth: 99 });
  }

  lastScore = PlayingScene.score;
}