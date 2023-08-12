export function allKeysInputFalse(scene){
  // 게임을 일시중지하고 다시 돌아올 때까지 esc 입력이 유지된 상태가 되니까 코드로 false 처리.
  scene.cursors.up.isDown = false;
  scene.cursors.down.isDown = false;
  scene.cursors.left.isDown = false;
  scene.cursors.right.isDown = false;
  scene.escKey.isDown = false;
}