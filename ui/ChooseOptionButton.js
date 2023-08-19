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
    fontSize_name = Font.size.chooseOptionButton_name,
    fontSize_level = Font.size.chooseOptionButton_level,
    fontSize_description = Font.size.chooseOptionButton_description,
    backgroundColor = Color.chooseOptionButtonBackground,
    pointeroverBackgroundColor = Color.pointeroverBackgroundColor,
    pointeroutBackgroundColor = Color.pointeroutBackgroundColor,
    fontColor = Color.chooseOptionButtonFont,
    pointeroverFontColor = Color.pointeroverFontColor,
    pointeroutFontColor = Color.pointeroutFontColor,
  ) {
      super(scene, x, y);

      this.isSelected = false;
      this.level = level === 0 ? '신규 기술' : 'Lv : '+level;
      this.name = name;
      this.backgroundColor = backgroundColor;

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
      img.setPosition(-width / 2 + firstSectionWidth / 2, -height / 2 + firstSectionTopHeight / 2);
      img.setDisplaySize(firstSectionWidth * 0.3, firstSectionTopHeight * 0.6);
      this.add(img);

      // 첫 번째 구역 - 텍스트 (아래쪽)
      const textOne = new Phaser.GameObjects.Text(scene, -width / 2 + firstSectionWidth / 2, -height / 2 + firstSectionTopHeight + firstSectionBottomHeight / 2, name, { fill: fontColor, fontSize: fontSize_name });
      textOne.setOrigin(0.5);
      this.add(textOne);

      // 두 번째 구역 - 상단 텍스트
      const secondSectionPadding = height / 10;
      const textTwoTop = new Phaser.GameObjects.Text(scene, width / 2 - secondSectionPadding, -height / 2 + secondSectionPadding, this.level, { fill: fontColor, fontSize: fontSize_level });
      textTwoTop.setOrigin(1, 0);
      this.add(textTwoTop);

      // 두 번째 구역 - 하단 텍스트
      const textTwoBottom = new Phaser.GameObjects.Text(scene, -width / 2 + firstSectionWidth + secondSectionWidth / 2, -height / 2 + secondSectionTopHeight + secondSectionBottomHeight / 2, description, { fill: fontColor, fontSize: fontSize_description });
      textTwoBottom.setOrigin(0.5);
      this.add(textTwoBottom);

      this.setSize(width, height); 
      this.setInteractive({ useHandCursor: true })
          .on('pointerdown', () =>{
            callback();
          })
          .on('pointerover', () => {
            this.drawBackground(pointeroverBackgroundColor);
            if (this.isSelected) {
              this.drawSelectedBorder();
            }
          })
          .on('pointerout', () => {
            this.drawBackground(pointeroutBackgroundColor);
            if (this.isSelected) {
              this.drawSelectedBorder();
            }
          })
      scene.add.existing(this);
  }

  selectButton() {
    if (!this.isSelected) {
      this.isSelected = true;
      this.drawSelectedBorder();
    }
  }

  deselectButton() {
    if (this.isSelected) {
      this.isSelected = false;
      this.drawBackground(this.backgroundColor);
    }
  }

  drawSelectedBorder(){
    this.background.lineStyle(3, Color.selectedButtonColor);
    this.background.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height);
  }

  drawBackground(backgroundColor){
    this.background.clear(); 
    this.background.fillStyle(Phaser.Display.Color.HexStringToColor(backgroundColor).color);
    this.background.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
  }
}