import {
  int
} from "@babylonjs/core";
import {
  AdvancedDynamicTexture,
  Control,
  TextBlock
} from "@babylonjs/gui/2D";

/**
 * Class for draw text for debugging.
 */
class DebugText {
  // GUI
  private advancedTexture: AdvancedDynamicTexture;

  constructor(advancedTexture: AdvancedDynamicTexture) {
    this.advancedTexture =  advancedTexture;
  }

  /**
   * Draw text for debugging.
   * @param x 
   * @param y 
   * @param text 
   */
  draw(x:int, y:int, text:string) {
    var text1 = new TextBlock();
    text1.text = text;
    text1.color = "white";
    text1.fontSize = 24;
    text1.left = x;
    text1.top = y;
    text1.textHorizontalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    text1.textVerticalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    this.advancedTexture.addControl(text1);
  }
}

export default DebugText;