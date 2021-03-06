const theData = ([400, 2000, 900, 9800, 8999, 11000, 1000, 700, 12080, 280, 1895, 6576]);

// set the svg canvas
let canvas = d3.select("body").append("svg")
  .attr("width", 1200)
  .attr("height", 800)

// select all circles
canvas.selectAll("circle")
  // bind data to circle selections
  .data(theData)
  .enter().append("circle")
  // set style and attributes for circles
  .style("stroke", "#A997DF")
  .style("stroke-width", "2")
  .style('fill', function (d) {
    if (d < "500") {
      return "#FF9901"
    } else if (d < "1000") {
      return "#52154E";
    } else if (d < "3000") {
      return "#0099FF";
    } else if (d < "5000") {
      return "#00A896";
    } else if (d < "8000") {
      return "#8E1C3E";
    } else if (d < "10000") {
      return "#111344";
    } else {
      return "#FF3333";
    }
  })
  .attr("cx", function () { return Math.random() * 720; })
  .attr("cy", function () { return Math.random() * 1000; })
  .attr("r", function () { return ((Math.random() * 75) + 10); });