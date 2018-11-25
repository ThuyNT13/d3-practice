const width = 1000; height = 1000;
const radius = 300;
const pi = Math.PI * 2;

const colorScale = d3.scale.ordinal()
  .range(["red", "yellow", "blue"]);

const data = [30, 50, 60];

const svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);

const group = svg.append("g")
  .attr("transform", "translate(300, 300)");

// const arc = d3.svg.arc()
//   .innerRadius(200)
//   .outerRadius(radius)
//   .startAngle(0)
//   .endAngle(pi - 1);

// group.append("path")
//   .attr("d", arc);

const arc = d3.svg.arc()
  .innerRadius(200) // setting this to 0 creates a pie chart
  .outerRadius(radius);

const pie = d3.layout.pie()
  .value(function(d) { return d; });

const arcs = group.selectAll(".arc")
  .data(pie(data))
  .enter()
    .append("g")
    .attr("class", "arc");

arcs.append("path")
  .attr("d", arc)
  .attr("fill", function(d) { return colorScale(d.data) });

arcs.append("text")
  .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
  .attr("text-anchor", "middle")
  .text(function(d) { return d.data; })


