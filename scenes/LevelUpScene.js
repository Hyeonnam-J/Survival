import config from "../config.js";
import ChooseOptionButton from "../ui/ChooseOptionButton.js";
import SelectButton from "../ui/SelectButton.js";

export default class LevelUpScene extends Phaser.Scene {
  constructor() {
      super("LevelUpScene");

      this.border = config.height / 10;
      this.sceneWidth = config.width - 2 * this.border;
      this.sceneHeight = config.height - 2 * this.border;

      this.optionButtonMargin = config.height / 30;
      this.optionButtonWidth = this.sceneWidth - 2 * this.optionButtonMargin;
      this.optionButtonHeight = this.sceneHeight / 5;

      // this.finallySelectedAttackClass;  // 최종적으로 담긴 공격 클래스.
      // this.selectedOptionIndex = 0;     // 현재 선택된 버튼의 인덱스.
  }

  init(data) {
    this.playingScene = data.playingScene;
    this.randomAttacks = data.randomAttacks;
  }

  create() {
    // 키보드 입력 세팅.
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.keysPressed = {
      up: false,
      down: false,
      space: false,
      enter: false
    };

    // 만든 ChooseOptionButton을 ChooseOptionButton 클래스와 함께 공유해야 해서,
    // create()는 씬이 재시작 될 때마다 다시 코드가 실행되므로 이 변수들은 여기서 초기화.
    this.optionButtons = [];
    this.finallySelectedAttackClass = null; // 최종적으로 선택된 공격 클래스.
    this.selectedOptionIndex = 0;           // 현재 선택된 버튼 인덱스.

    this.drawScene();
    this.drawOptionButton();
    this.drawSelectButton();

    this.chooseOption(this.randomAttacks[this.selectedOptionIndex]);
  }

  drawScene(){
    const bgImage = this.add.image(config.width / 2, config.height / 2, 'levelupSceneBackground_img');
    bgImage.setDisplaySize(this.sceneWidth, this.sceneHeight);
    bgImage.setScrollFactor(0);
    /*
    const bg = this.add.graphics();
    bg.fillStyle(Color.levelupSceneBackground);
    bg.fillRect(this.border, this.border, this.sceneWidth, this.sceneHeight);
    bg.setScrollFactor(0); 
    */
  }

  drawOptionButton(){
    this.randomAttacks.forEach((attack, index) => {
      const optionButton = new ChooseOptionButton(
          this,
          () => this.chooseOption(attack),
          config.width / 2,
          this.border + this.optionButtonMargin + (index * (this.optionButtonHeight + this.optionButtonMargin)) + this.optionButtonHeight / 2,
          this.optionButtonWidth,
          this.optionButtonHeight,
          attack.setImageFromScene(this.playingScene),
          attack.name,
          attack.level,
          attack.descriptions[attack.level + 1],
      );
      this.optionButtons.push(optionButton);
    });
  }

  drawSelectButton(){
    new SelectButton(
      this,
      'Select', 
      this.resumeGame.bind(this),
      config.width / 2, 
      config.height / 2 + config.height / 3, 
    );
    /*
    this.resumeGame.bind(this),
    객체의 메서드가 호출되면 this는 객체를 참고하지만,
    이벤트 핸들러나 콜백으로 호출되면 this는 다른 것을 참조할 수 있다.
    그래서 this가 이 객체를 참조하도록 바인딩.
    this.resumeGame이 어떤 컨텍스트를 갖게 할 거냐?
    -> .bind(this) 즉 .bind 안 파라미터 this(지금 이 씬)를 컨텍스트로 갖게 한다.
    */
  }

  resumeGame(){
    // 이곳에서 console.log(this)를 찍었을 때 먹통이 되는 이유는,
    // this가 복잡한 구조일 때 발생하는 성능 이슈일 수 있다.
    // 반면 console.log(this.playingScene)은 범위가 좁혀진 관계로 문제가 없는 경우.
    this.finallySelectedAttackClass.level++;
    this.scene.stop(this.scene.key);
    this.scene.resume(this.playingScene.scene.key);
  }

  chooseOption(finallySelectedAttackClass){
    if (this.selectedAttackButton) {
      this.selectedAttackButton.deselectButton();
    }
    this.finallySelectedAttackClass = finallySelectedAttackClass;
    this.selectedAttackButton = this.optionButtons.find(btn => btn.name === finallySelectedAttackClass.name);
    this.selectedAttackButton.selectButton();
  }

  selectPreviousOption() {
    this.selectedOptionIndex--;
    if (this.selectedOptionIndex < 0) this.selectedOptionIndex = this.randomAttacks.length - 1;

    this.chooseOption(this.randomAttacks[this.selectedOptionIndex]);
  }

  selectNextOption() {
    this.selectedOptionIndex++;
    if (this.selectedOptionIndex >= this.randomAttacks.length) this.selectedOptionIndex = 0;

    this.chooseOption(this.randomAttacks[this.selectedOptionIndex]);
  }

  inputKeyboardHandler() {
    if (this.cursors.up.isDown && !this.keysPressed.up) {
        this.selectPreviousOption();
        this.keysPressed.up = true;
    } else if (!this.cursors.up.isDown) {
        this.keysPressed.up = false;
    }

    if (this.cursors.down.isDown && !this.keysPressed.down) {
        this.selectNextOption();
        this.keysPressed.down = true;
    } else if (!this.cursors.down.isDown) {
        this.keysPressed.down = false;
    }

    if ((this.spaceKey.isDown || this.enterKey.isDown) && !this.keysPressed.space) {
        this.resumeGame();
        this.keysPressed.space = true;
    } else if (!this.spaceKey.isDown && !this.enterKey.isDown) {
        this.keysPressed.space = false;
    }
  }

  update(){
    this.inputKeyboardHandler();
  }
}