function main() {
  const style = new Style();
  const renderer = new SVGRenderer(document.querySelector('#canvas'), style);

  let e, e1, e2, e3, e4, e5, c;  // temp varables.
  let s1, s2, s3, s4;  // for saved references.
  let p, q; // points.

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
  s1 = c;

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
  s2 = c;

  e = new LinkStraight();
  e.from = s1.getRightMiddle();
  e.to = s2.getDownMiddle();
  e.addTo(renderer);

  e = new LinkDoubleCurved();
  p = s1.getRightMiddle();
  q = s2.getRightMiddle();
  e.from = p;
  e.to = q;
  e.ctrl = { x: p.x + 100, y: p.x };
  e.middle = { x: q.x + 100, y: (p.y + q.y) / 2 };
  e.addTo(renderer);

  renderer.draw();
}

document.addEventListener("DOMContentLoaded", main);