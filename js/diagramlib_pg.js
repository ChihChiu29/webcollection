function main() {
  const link = new Link(0, 0, 200, 250);
  const rect1 = new Rect();

  const renderer = new SVGRenderer(document.querySelector('#canvas'));
  link.addTo(renderer);
  rect1.addTo(renderer);

  renderer.draw();
}

document.addEventListener("DOMContentLoaded", main);