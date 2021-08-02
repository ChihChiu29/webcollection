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
    links.push({
      source: randomInt(0, NUM_NODES),
      target: randomInt(0, NUM_NODES),
      value: randomInt(1, 10),
    });
  }
  return links;
}

function onload() {
  const data = {
    nodes: generateNodes(),
    links: generateLinks(),
  };

  var sankey = d3.sankey()
    .nodeWidth(20)
    .nodePadding(200)
    .size([460, 460])
    .nodes(data.nodes)
    .links(data.links)
    .layout(200);
}