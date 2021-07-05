function main() {
  const cmds = [
    'viewport 0 0 1000 1000',
    'var sizeA 200 50',
    'rect A hello world',
    'move A 10 10 $sizeA',
    'rect B foo bar',
    'stack X A B with stacked!',
    'move X 30 30 300 120',
  ];

  const renderer = new SVGRenderer(document.querySelector('#canvas'));
  const interpreter = new DiagramLangInterpreter(renderer);
  for (const cmd of cmds) {
    interpreter.handleSingleCommand(cmd);
  }
  interpreter.finish();
  renderer.draw();
}

document.addEventListener("DOMContentLoaded", main);