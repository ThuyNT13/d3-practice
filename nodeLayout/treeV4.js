/*
based off of: 
https://bl.ocks.org/d3noob/b024fcce8b4b9264011a1c3e7c7d70dc
https://bl.ocks.org/d3noob/43a860bc0024792f8803bba8ca0d5ecd
*/

const width = 500, height = 500;
const treeWidth = 400, treeHeight = 400;

const svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height)

const g = svg.append("g")
  .attr("transform", "translate(50, 50)");

// declares a tree layout and assigns the size
const treeMap = d3.tree()
  .size([treeWidth, treeHeight]);

d3.json("family.json", function(data) {
  // // Assigns parent, children, height, depth
  // const root = d3.hierarchy(data, function(d) { return d.children; });
  // root.x0 = height / 2;
  // root.y0 = 0;

  // assigns the data to a hierarchy, parent-child
  const root = d3.hierarchy(data);
  
  // Assigns the x and y position for the nodes; maps node to tree
  const nodeMap = treeMap(root);

  // const nodes = nodeMap.descendants();

  const link = g.selectAll(".link")
    .data(nodeMap.descendants().slice(1))
    .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", function(d) {
        return "M" + d.x + "," + d.y
          + "C" + d.x + "," + (d.y + d.parent.y) / 2
          + " " + d.parent.x + "," + (d.y + d.parent.y) / 2
          + " " + d.parent.x + "," + d.parent.y;
      });

  const nodes = g.selectAll(".node")
    .data(nodeMap.descendants())
    .enter()
      .append("g")
      .attr("class", function(d) {
        return "node" + 
          (d.children ? " node--internal" : " node--leaf");})
    .attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")";
    });

  nodes.append("circle")
    .attr("r", 10);

  nodes.append("text")
    attr("dy", ".35em")
    .attr("y", function (d) { return d.children ? -20 : 20; })
    .style("text-anchor", "middle")
    .text(function (d) { return d.data.name; });

  console.log(nodes);
})