import config from '../config.js';
import Color from '../utility/Color.js';
import Font from '../utility/Font.js';

export default class SelectButton extends Phaser.GameObjects.Container {
  constructor(
    scene,  
    label, 
    callback, 
    x = config.width / 2, 
    y = config.height / 2 + config.height / 4,
    width = config.width / 4, 
    height = config.height / 12,
    backgroundColor = Color.selectButtonBackground, 
    pointeroverColor = Color.selectButtonPointerOver, 
    pointeroutColor = Color.selectButtonPointerOut, 
    fontSize = Font.size.selectButton
    ) {
        super(scene, x, y);

        this.background = scene.add.graphics();
        this.background.fillStyle(Phaser.Display.Color.HexStringToColor(backgroundColor).color);
        this.background.fillRect(-width / 2, -height / 2, width, height); //setOrigin이 없음

        // JavaScript ES6 객체 리터럴 속성 이름 축약
        // 변수 이름과 속성 이름이 동일할 경우 이렇게 축약 가능
        this.label = new Phaser.GameObjects.Text(scene, 0, 0, label, { backgroundColor, fontSize });
        this.label.setOrigin(0.5);
        this.label.setPadding(10);

        this.add(this.background);
        this.add(this.label);

        this.setSize(width, height);

        this.setInteractive({ useHandCursor: true })
            .on('pointerdown', callback)
            .on('pointerover', () => this.label.setStyle({ fill: pointeroverColor }))
            .on('pointerout', () => this.label.setStyle({ fill: pointeroutColor }));

        scene.add.existing(this);
  }
}