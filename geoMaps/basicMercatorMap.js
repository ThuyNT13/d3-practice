const width = 800, height = 600;

const url = "http://enjalot.github.io/wwsd/data/world/world-110m.geojson";

// const svg = d3.select("body").append("svg")
//   .append("g");

// const projection = d3.geoMercator()
//   .scale(width / 2 / Math.PI)
//   .translate([width / 2, height / 2]);

// const path = d3.geoPath()
//   .projection(projection);

// d3.json(url, function(geojson) {
//   svg.append("path")
//     .attr("d", path(geojson));
// })

const svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);

const projection = d3.geoMercator()
  .scale(width / 2 / Math.PI)
  .translate([width / 2, height / 2]);

const path = d3.geoPath()
  .projection(projection);

d3.json(url, function(data) {
  const group = svg.selectAll("g")
    .data(data.features) // necessary?
    .enter()
      .append("g");

  const areas = group.append("path")
    .attr("d", path)
    .attr("class", "area")
    .attr("fill", "steelblue");

  group.append("text")
    // centroid returns array of 2 numbers corresponding to x,y
    .attr("x", function(d) { return path.centroid(d)[0]; })
    .attr("y", function(d) { return path.centroid(d)[1]; })
    .attr("text-anchor", "middle")
    .text(function(d) { return d.properties.name; });
})