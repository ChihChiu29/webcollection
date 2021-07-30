const NUM_NODES = 20;
const NUM_LINKS = 20;

function randomInt(from, to) {
  return to + Math.floor(Math.random() * (to - from));
}

function generateNodes() {
  const nodes = [];
  for (let i = 0; i < NUM_NODES; i++) {
    nodes.push({ name: `${i}` });
  }
  return nodes;
}

function generateLinks() {
  const links = [];
  for (let i = 0; i < NUM_LINKS; i++) {

  }
}

var sankey = d3.sankey();

