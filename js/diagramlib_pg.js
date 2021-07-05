function main() {
  const style = new Style();
  const renderer = new SVGRenderer(document.querySelector('#canvas'), style);

  let e, e1, e2, e3, e4, e5, c;

  e = new Rect();
  e.x = 10;
  e.y = 10;
  e.width = 250;
  e.height = 40;
  e.bgColor = 'red';
  e.texts = ['hello', 'world'];
  e.addTo(renderer);

  e = new Rect();
  e.x = 10;
  e.y = 50;
  e.width = 250;
  e.height = 40;
  e.bgColor = 'yellow';
  e.centeredText = 'hello world';
  e.addTo(renderer);

  c = new TitledContainer();
  c.x = 10;
  c.y = 100;
  c.width = 150;
  c.height = 150;
  c.title = 'Stack layout';
  e = new StackContainer();
  e1 = new Rect();
  e1.bgColor = 'lightblue';
  e1.texts = ['hello'];
  e2 = new Rect();
  e2.bgColor = 'lightyellow';
  e2.texts = ['world'];
  e3 = new Rect();
  e3.bgColor = 'pink';
  e3.texts = ['foo'];
  e4 = new Rect();
  e4.bgColor = 'lightgreen';
  e4.texts = ['bar'];
  e.shapes = [e1, e2, e3, e4];
  c.childShape = e;
  c.addTo(renderer);

  c = new TitledContainer();
  c.x = 10;
  c.y = 300;
  c.width = 200;
  c.height = 120;
  c.title = 'Tile layout';
  e = new TileContainer();
  e.numOfShapesPerRow = 3;
  e1 = new Rect();
  e1.bgColor = 'lightblue';
  e1.texts = ['hello'];
  e2 = new Rect();
  e2.bgColor = 'lightyellow';
  e2.texts = ['world'];
  e3 = new Rect();
  e3.bgColor = 'pink';
  e3.texts = ['foo'];
  e4 = new Rect();
  e4.bgColor = 'lightgreen';
  e4.texts = ['bar'];
  e.shapes = [e1, e2, e3, e4];
  c.childShape = e;
  c.addTo(renderer);

  renderer.draw();
}

document.addEventListener("DOMContentLoaded", main);