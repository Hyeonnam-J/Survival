export default class PlayTime{
  constructor(scene, x, y) {
    this.scene = scene;
    this.elapsedSeconds = 0;
    this.label 
      = this.scene
        .add.bitmapText(x, y, 'font', '00:00', 40)
        .setOrigin(0.5, 0.5);

    // 매 초마다 타이머를 업데이트하기 위한 반복 이벤트를 생성
    this.scene.time.addEvent({
      delay: 1000,
      callback: this.updateTime,
      callbackScope: this,
      loop: true
    });
  }

  updateTime() {
    this.elapsedSeconds++;

    const seconds = this.elapsedSeconds % 60;
    const minutes = Math.floor(this.elapsedSeconds / 60);

    this.label.text = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
}