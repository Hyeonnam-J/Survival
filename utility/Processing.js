import config from "../config.js";

export function setScaleCoverBackground(background){
    const scaleX = config.width / background.width;
    const scaleY = config.height / background.height;
    const scale = Math.max(scaleX, scaleY);
    background.setScale(scale).setScrollFactor(0);
}