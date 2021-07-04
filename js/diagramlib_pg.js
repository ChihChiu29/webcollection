function main() {
  const link = new Link(0, 0, 200, 250);
  const rect1 = new Rect();
  rect1.x = 30;
  rect1.y = 50;
  rect1.width = 250;
  rect1.height = 100;
  rect1.bgColor = 'red';

  const renderer = new SVGRenderer(document.querySelector('#canvas'));
  link.addTo(renderer);
  rect1.addTo(renderer);

  renderer.draw();
}

document.addEventListener("DOMContentLoaded", main);