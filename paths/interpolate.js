var dataArray = [{ x: 5, y: 5 }, { x: 10, y: 15 }, { x: 20, y: 7 }, { x: 30, y: 18 }, { x: 40, y: 10 }];

var svg = d3.select("body").append("svg").attr("height", "100%").attr("width", "100%");

var interpolateTypes = [d3.curveLinear, d3.curveStepBefore, d3.curveStepAfter, d3.curveBasis, d3.curveBasisOpen, d3.curveBasisClosed, d3.curveBundle, d3.curveCardinal, d3.curveCardinal, d3.curveCardinalOpen, d3.curveCardinalClosed, d3.curveNatural];
var interpolateNames = ['d3.curveLinear', 'd3.curveStepBefore', 'd3.curveStepAfter', 'd3.curveBasis', 'd3.curveBasisOpen', 'd3.curveBasisClosed', 'd3.curveBundle', 'd3.curveCardinal', 'd3.curveCardinal', 'd3.curveCardinalOpen', 'd3.curveCardinalClosed', 'd3.curveNatural'];

var line0 = d3.line()
  .x(function (d) { return newX + (d.x * 5); })
  .y(function (d) { return newY + baselineY - (d.y * 5); })
  .curve(interpolateTypes[0]);
var line1 = d3.line()
  .x(function (d) { return newX + (d.x * 5); })
  .y(function (d) { return newY + baselineY - (d.y * 5); })
  .curve(interpolateTypes[1]);
var line2 = d3.line()
  .x(function (d) { return newX + (d.x * 5); })
  .y(function (d) { return newY + baselineY - (d.y * 5); })
  .curve(interpolateTypes[2]);
var line3 = d3.line()
  .x(function (d) { return newX + (d.x * 5); })
  .y(function (d) { return newY + baselineY - (d.y * 5); })
  .curve(interpolateTypes[3]);
var line4 = d3.line()
  .x(function (d) { return newX + (d.x * 5); })
  .y(function (d) { return newY + baselineY - (d.y * 5); })
  .curve(interpolateTypes[4]);
var line5 = d3.line()
  .x(function (d) { return newX + (d.x * 5); })
  .y(function (d) { return newY + baselineY - (d.y * 5); })
  .curve(interpolateTypes[5]);
var line6 = d3.line()
  .x(function (d) { return newX + (d.x * 5); })
  .y(function (d) { return newY + baselineY - (d.y * 5); })
  .curve(interpolateTypes[6]);
var line7 = d3.line()
  .x(function (d) { return newX + (d.x * 5); })
  .y(function (d) { return newY + baselineY - (d.y * 5); })
  .curve(interpolateTypes[7]);
var line8 = d3.line()
  .x(function (d) { return newX + (d.x * 5); })
  .y(function (d) { return newY + baselineY - (d.y * 5); })
  .curve(interpolateTypes[8]);
var line9 = d3.line()
  .x(function (d) { return newX + (d.x * 5); })
  .y(function (d) { return newY + baselineY - (d.y * 5); })
  .curve(interpolateTypes[9]);
var line10 = d3.line()
  .x(function (d) { return newX + (d.x * 5); })
  .y(function (d) { return newY + baselineY - (d.y * 5); })
  .curve(interpolateTypes[10]);
var line11 = d3.line()
  .x(function (d) { return newX + (d.x * 5); })
  .y(function (d) { return newY + baselineY - (d.y * 5); })
  .curve(interpolateTypes[11]);


var newX = -270;
var newY = 20;
var baselineY = 100;
var chartWidth = 280;
var chartHeight = 130;




for (p = 0; p < interpolateTypes.length; p++) {

  if (newX + chartWidth > 960) {
    newX = 10;
    newY += chartHeight;
  } else {
    newX += chartWidth;
  }

  var group = svg.append("g").attr("class", "group" + p);

  group.selectAll("circle.dots" + p)
    .data(dataArray)
    .enter()
    .append("circle")
    .attr("class", "dots" + p)
    .attr("cx", function (d, i) { return (d.x * 5) + newX; })
    .attr("cy", function (d, i) { return newY + baselineY - (d.y * 5); })
    .attr("r", 5);

  group.append("text")
    .attr("text-anchor", "middle")
    .attr("x", function (d, i) { return newX + 100; })
    .attr("y", newY + 100)
    .text(interpolateNames[p]);

  group.append("path")
    .style("fill", "none")
    .style("stroke", "black")
    .style("stroke-width", "4px")
    .attr("d", function (d, i) { return window['line' + p](dataArray); });
}