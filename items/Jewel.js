import Depth from "../utility/Depth.js";
import { ITEM_TYPE } from "../utility/ItemType.js";

export default class Jewel extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {  
    //const randomFrameIndex = 1;
    const randomFrameIndex = Phaser.Math.Between(0, 3);
    super(scene, x, y, 'jewel_sprite', randomFrameIndex);
    this.itemType = ITEM_TYPE.JEWEL;
    this.jewelNo = randomFrameIndex;
    
    scene.add.existing(this);
    this.setDepth(Depth.jewel);

    scene.physics.world.enableBody(this);
    scene.itemGroup.add(this);
  }
}