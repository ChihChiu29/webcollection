/**
 * Hanles diagram language interpretation. Requires all other files in this directory.
 */

/**
 * Command interpreter.
 * 
 * All commands start with a unique action keyword, followed by space separated parameters.
 */
class DiagramLangInterpreter {
  constructor(/*SVGRenderer*/renderer) {
    this.renderer = renderer;
    this.style = renderer.style;

    this.vars = {};  // variables that can be used in commands.
    this.shapeMap = {};
    this.links = [];
    this.nextZValue = 0;

    this.handlerMap = {
      'move': this.move.bind(this),
      'rect': this.createRect.bind(this),
      'var': this.defineVar.bind(this),
      'viewport': this.viewport.bind(this),
    }
  }

  // SHOULD NOT DO ANYTHING MORE AFTER THIS CALL.
  finish() {
    for (const shapeName of Object.keys(this.shapeMap)) {
      this.shapeMap[shapeName].addTo(this.renderer);
    }
    for (const link of this.links) {
      link.addTo(this.renderer);
    }
  }

  _getNextZValue() {
    this.nextZValue += 1;
    return this.nextZValue;
  }

  _getShape(name) {
    if (!this.shapeMap[name]) {
      throw new Error(`shape with name ${name} does not exist`);
    }
    return this.shapeMap[name];
  }

  _setShape(name, shape) {
    if (this.shapeMap[name]) {
      throw new Error(`shape with name ${name} already exists`);
    }
    this.shapeMap[name] = shape;
  }

  /**
   * Splits keyword from a command string, and call corresponding functions.
   */
  handleSingleCommand(/*string*/cmd) {
    cmd = cmd.trim();
    if (!cmd) {
      return;
    }
    for (const varName of Object.keys(this.vars)) {
      cmd = cmd.replace(varName, this.vars[varName]);
    }

    const cmdArray = cmd.split(' ');
    const keyword = cmdArray[0];
    const params = cmdArray.splice(1);
    if (this.handlerMap[keyword]) {
      this.handlerMap[keyword](params);
    }
  }

  /**
   * Creates a Rect with text.
   * 
   * Syntax:
   *   rect <rect name> <single line text>
   */
  createRect(cmdArray) {
    const name = cmdArray[0];
    const text = cmdArray.splice(1).join(' ');
    const rect = new Rect();
    rect.zValue = this._getNextZValue();
    rect.texts = [text];

    this._setShape(name, rect);
  }

  /**
   * Defines a variable for following commands.
   * 
   * Syntax:
   *   var <var name> <string values>
   */
  defineVar(cmdArray) {
    const varName = cmdArray[0];
    this.vars[`$${varName}`] = cmdArray.splice(1).join(' ');
  }

  /**
     * Moves and resizes a shape.
     *
     * Syntax:
     *   move <name> left top width height
     */
  move(cmdArray) {
    const shape = this._getShape(cmdArray[0]);
    shape.x = parseInt(cmdArray[1]);
    shape.y = parseInt(cmdArray[2]);
    shape.width = parseInt(cmdArray[3]);
    shape.height = parseInt(cmdArray[4]);
  }

  /**
     * Changes viewport size.
     *
     * Syntax:
     *   viewport left top width height
     */
  viewport(cmdArray) {
    this.renderer.left = parseInt(cmdArray[0]);
    this.renderer.top = parseInt(cmdArray[1]);
    this.renderer.width = parseInt(cmdArray[2]);
    this.renderer.height = parseInt(cmdArray[3]);

  }
}