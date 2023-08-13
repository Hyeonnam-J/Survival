import config from '../config.js';
import Color from '../utility/Color.js';
import Font from '../utility/Font.js';

export default class ChooseOptionButton extends Phaser.GameObjects.Container {
  constructor(
    scene,  
    callback, 
    x = config.width / 2, 
    y = config.height / 2 + config.height / 4,
    width = config.width / 4, 
    height = config.height / 12,
    img,
    name,
    level,
    description,
    backgroundColor = Color.chooseOptionButtonBackground,
    pointeroverColor = Color.chooseOptionButtonPointerOver,
    pointeroutColor = Color.chooseOptionButtonPointerOut,
    fontSize_name = Font.size.chooseOptionButton_name,
    fontSize_level = Font.size.chooseOptionButton_level,
    fontSize_description = Font.size.chooseOptionButton_description,
  ) {
      super(scene, x, y);

      this.level = level === 0 ? '신규 기술' : 'Lv : '+level;

      this.background = scene.add.graphics();
      this.background.fillStyle(Phaser.Display.Color.HexStringToColor(backgroundColor).color);
      this.background.fillRect(-width / 2, -height / 2, width, height); // setOrigin이 없음
      this.add(this.background);

      // 전체 버튼의 가로 크기 분할
      const firstSectionWidth = width * (2 / 10);
      const secondSectionWidth = width * (8 / 10);

      // 첫 번째 구역의 세로 크기 분할
      const firstSectionTopHeight = height * (7 / 10);
      const firstSectionBottomHeight = height * (3 / 10);

      // 두 번째 구역의 세로 크기 분할
      const secondSectionTopHeight = height * (2 / 10);
      const secondSectionBottomHeight = height * (8 / 10);

      // 첫 번째 구역 - 이미지 *
      //const image = scene.add.image(-width / 2 + firstSectionWidth / 2, -height / 2 + firstSectionTopHeight / 2, img);
      //image.setDisplaySize(firstSectionWidth, firstSectionTopHeight);
      //this.add(image);
      img.setPosition(-width / 2 + firstSectionWidth / 2, -height / 2 + firstSectionTopHeight / 2);
      img.setDisplaySize(firstSectionWidth * 0.4, firstSectionTopHeight * 0.6);
      this.add(img);

      // 첫 번째 구역 - 텍스트 (아래쪽)
      const textOne = new Phaser.GameObjects.Text(scene, -width / 2 + firstSectionWidth / 2, -height / 2 + firstSectionTopHeight + firstSectionBottomHeight / 2, name, { fill: pointeroutColor, fontSize_name });
      textOne.setOrigin(0.5);
      this.add(textOne);

      // 두 번째 구역 - 상단 텍스트
      //const textTwoTop = new Phaser.GameObjects.Text(scene, -width / 2 + firstSectionWidth + secondSectionWidth / 2, -height / 2 + secondSectionTopHeight / 2, this.level, { fill: pointeroutColor, fontSize_level });
      const secondSectionPadding = height / 10;
      const textTwoTop = new Phaser.GameObjects.Text(scene, width / 2 - secondSectionPadding, -height / 2 + secondSectionPadding, this.level, { fill: pointeroutColor, fontSize_level });
      textTwoTop.setOrigin(1, 0);
      this.add(textTwoTop);

      // 두 번째 구역 - 하단 텍스트
      const textTwoBottom = new Phaser.GameObjects.Text(scene, -width / 2 + firstSectionWidth + secondSectionWidth / 2, -height / 2 + secondSectionTopHeight + secondSectionBottomHeight / 2, description, { fill: pointeroutColor, fontSize_description });
      textTwoBottom.setOrigin(0.5);
      this.add(textTwoBottom);

      /*
      // JavaScript ES6 객체 리터럴 속성 이름 축약
      // 변수 이름과 속성 이름이 동일할 경우 이렇게 축약 가능
      this.label = new Phaser.GameObjects.Text(scene, 0, 0, label, { backgroundColor, fontSize });
      this.label.setOrigin(0.5);
      this.label.setPadding(10);
      this.add(this.label);
      */

      this.setSize(width, height); 
      this.setInteractive({ useHandCursor: true })
          .on('pointerdown', callback)
          .on('pointerover', () => {
            this.background.clear();  // 기존 그래픽을 지웁니다.
            this.background.fillStyle(Phaser.Display.Color.HexStringToColor(pointeroverColor).color);  // 새로운 색상을 설정합니다.
            this.background.fillRect(-width / 2, -height / 2, width, height);  // 배경을 다시 그립니다.
        })
        .on('pointerout', () => {
            this.background.clear();  // 기존 그래픽을 지웁니다.
            this.background.fillStyle(Phaser.Display.Color.HexStringToColor(backgroundColor).color);  // 원래 색상으로 설정합니다.
            this.background.fillRect(-width / 2, -height / 2, width, height);
        })
      scene.add.existing(this);
  }
}