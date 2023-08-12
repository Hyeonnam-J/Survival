import Hero from '../characters/Hero.js';
import config from '../config.js';

export default class Status extends Phaser.GameObjects.Container {
  constructor(scene, hero){
    super(scene, 0, 0); // 상태창 좌표는 플레잉 씬의 업데이트에서 플레이어 기준으로 조정

    this.hero = hero;

    this.border = config.height / 250;
    // value not considered background, for only status bar related to quantity
    this.barWidth = config.width / 4; 
    this.barHeight = config.height / 50;
    //whole space considered border for draw status bar
    this.barWidthBackground = this.barWidth + 2 * this.border;  
    this.barHeightBackground = this.barHeight + 2 * this.border;

    /* ************************************************* */
    /**
     * hp, mp, exp
     * 각각의 status bar가 그려질 
     * background의 좌푯값 X는 전부 0, Y는 0부터 순서대로 barheightBackground를 더한 값.
     * 순수 status bar의 좌푯값 X는 전부 border만큼 거리를 둔 값, Y는 각자 background 시작 값에 border만큼 거리를 둔 값.
     */
    this.hpBarBackgroundX = 0;
    this.hpBarBackgroundY = 0;
    this.hpBarX = this.border;
    this.hpBarY = this.border;

    this.mpBarBackgroundX = 0;
    this.mpBarBackgroundY = this.barHeightBackground;
    this.mpBarX = this.border;
    this.mpBarY = this.mpBarBackgroundY + this.border;

    this.expBarBackgroundX = 0;
    this.expBarBackgroundY = 2 * this.barHeightBackground;
    this.expBarX = this.border;
    this.expBarY = this.expBarBackgroundY + this.border;
    /* ************************************************* */

    // add를 통해 객체를 컨테이너에 종속. 컨테이너의 위치나 회전에 함께 영향받음.
    this.hpBarBackground = this.drawBarBackground(scene, this.hpBarBackgroundX, this.hpBarBackgroundY, 0x000000);
    this.hpBar = this.drawBar(scene, null, this.hpBarX, this.hpBarY, this.hero.currentHp, this.hero.maxHp, 0xff0000);
    this.add(this.hpBarBackground);
    this.add(this.hpBar);
    
    this.mpBarBackground = this.drawBarBackground(scene, this.mpBarBackgroundX, this.mpBarBackgroundY, 0x000000);
    this.mpBar = this.drawBar(scene, null, this.mpBarX, this.mpBarY, this.hero.currentMp, this.hero.maxMp, 0x0000ff);
    this.add(this.mpBarBackground);
    this.add(this.mpBar);

    /**
     * 경험치 바를 그리기 위해서는 비율로 계산이 되어야 한다.
     * Hero class의 expForNextLevel 객체의 value는 누적 경험치. 따라서,
     * 다음 레벨을 위해 필요한 경험치는 현재 플레이어 레벨의 다음 레벨이 요구하는 경험치에서 현재 플레이어 레벨이 요구하는 경험치를 뺀 값.
     * 다음 레벨을 위해 필요한 경험치 중 현재 획득한 경험치는 현재까지 플레이어의 누적 경험치에서 현재 플레이어 레벨이 되기 위해 요구된 경험치를 뺀 값.
     */
    this.requiredExp = Hero.expForNextLevel[Hero.level+1] - Hero.expForNextLevel[Hero.level];
    this.acquiredExp = Hero.exp - Hero.expForNextLevel[Hero.level]
    this.expBarBackground = this.drawBarBackground(scene, this.expBarBackgroundX, this.expBarBackgroundY, 0x000000);
    this.expBar = this.drawBar(scene, null, this.expBarX, this.expBarY, this.acquiredExp, this.requiredExp, 0x7aeb34);
    this.add(this.expBarBackground);
    this.add(this.expBar);

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

  drawBar(scene, graphics, x, y, currentQ, maxQ, color) {
    if(graphics == null){
      graphics = new Phaser.GameObjects.Graphics(scene);
    }

    graphics.clear();

    graphics.fillStyle(color, 1);
    graphics.fillRect(
      x,
      y,
      this.getCurrentStatus(this.barWidth, currentQ, maxQ), 
      this.barHeight
    );
    return graphics;
  }

  getCurrentStatus(barWidth, currentQ, maxQ){
    const gauge = barWidth * currentQ / maxQ;
    return gauge > barWidth ? barWidth : gauge;
  }
}