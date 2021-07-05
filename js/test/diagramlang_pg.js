function main() {
  const cmds = [
    'viewport 0 0 1000 1000',
    'var bigsize 400 250',
    'rect A hello world',
    'rect B foo bar',
    'stack X A B with stacked!',
    'move X 30 30 $bigsize',
    'rect C hello world',
    'rect D foo bar',
    'tile Y 3 C D with tiled!',
    'move Y 30 450 $bigsize',
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