export default class PlayTime{
  constructor(scene) {
    this.scene = scene;
    this.elapsedSeconds = 0;
    this.lastOccurrenceSeconds = 0;
    this.label 
      = this.scene
        .add.bitmapText(0, 0, 'font', '00:00', 40)  // 좌표는 플레잉 씬의 업데이트에서 플레이어 기준으로 조정
        .setOrigin(0.5, 0.5);
    this.label.setDepth(10);

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

    this.timeEvents();
  }

  timeEvents(){
    if(this.elapsedSeconds > 3 && this.lastOccurrenceSeconds <= 3){
      //console.log('3');
      this.lastOccurrenceSeconds = this.elapsedSeconds;
    }

    if(this.elapsedSeconds > 7 && this.lastOccurrenceSeconds <= 7){
      //console.log('7');
      this.lastOccurrenceSeconds = this.elapsedSeconds;
    }
  }

  setPosition(x, y) {
    this.label.setPosition(x, y);
  }
}