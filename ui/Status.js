import config from '../config.js';

export default class Status extends Phaser.GameObjects.Container {
  constructor(scene, x, y){
    super(scene, x, y);

    this.barWidth = config.width / 4; // value not considered background
    this.barHeight = config.height / 50;
    this.border = config.height / 250;
    this.barWidthBackground = this.barWidth + 2 * this.border;
    this.barHeightBackground = this.barHeight + 2 * this.border;

    // add를 통해 객체를 컨테이너에 종속. 컨테이너의 위치나 회전에 함께 영향받음.
    this.hpBarBackground = this.drawBarBackground(scene, 0, 0, 0x000000);
    this.hpBar = this.drawBar(scene, this.border, this.border, 0xff0000);
    this.add(this.hpBarBackground);
    this.add(this.hpBar);
    
    this.mpBarBackground = this.drawBarBackground(scene, 0, this.barHeightBackground, 0x000000);
    this.mpBar = this.drawBar(scene, this.border, this.barHeightBackground + this.border, 0x0000ff);
    this.add(this.mpBarBackground);
    this.add(this.mpBar);

    // Phaser의 디자인 철학.
    // 씬에서 new 키워드로 객체를 생성하는 것과 객체에서 씬에 추가하는 것은 분리된 동작.
    // 객체를 생성하지만 씬엔 나타나지 않는 것도 있을 수 있음.
    scene.add.existing(this);
  }

  drawBarBackground(scene, x, y, color) {
    let graphics = new Phaser.GameObjects.Graphics(scene);
    graphics.fillStyle(color, 1);
    graphics.fillRect(x, y, this.barWidthBackground, this.barHeightBackground);
    return graphics;
  }

  drawBar(scene, x, y, color) {
    let graphics = new Phaser.GameObjects.Graphics(scene);
    graphics.fillStyle(color, 1);
    graphics.fillRect(x, y, this.barWidth, this.barHeight);
    return graphics;
  }

  // 체력과 마력 업데이트 (0에서 1 사이의 값)
  updateStatus(hpPercent, mpPercent) {
      this.hpBar.scaleX = hpPercent;
      this.mpBar.scaleX = mpPercent;
  }
}