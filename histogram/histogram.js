const width = 500, height = 500, padding = 50; 

const svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height + padding)
  .append("g")
    .attr("transform", "translate(15,0)");

d3.csv("list.csv", function(data) {
  const ageMap = data.map(function(i) { return parseInt(i.age); })

  const histogram = d3.layout.histogram()
    .bins(10) // intervals
    (ageMap)
  
  const yScale = d3.scale.linear()
    .domain([0, d3.max(histogram.map(function (i) { return i.length;}))]) // length of each array of intervals, getting the max length
    .range([0, height]);

  const xScale = d3.scale.linear()
    .domain([0, d3.max(ageMap)]) // the rightmost bar, max age
    .range([0,width]);

  const xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

  const group = svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  const bars = svg.selectAll(".bar")
    .data(histogram)
    .enter()
      .append("g")

  bars.append("rect")
    .attr("x", function(d) { return xScale(d.x); }) // x represents lowerbound of each interval
    .attr("y", function(d) { return height - yScale(d.y); }) // reverses by returning the value of d.y subtracted from svg height
    .attr("width", function(d) { return xScale(d.dx)-5; }) // dx represents range
    .attr("height", function(d) { return yScale(d.y);  }) // y represents number of value in each interval
    .attr("fill", "blue");

  bars.append("text")
    .attr("x", function (d) { return xScale(d.x); })
    .attr("y", function (d) { return 500 - yScale(d.y); })
    .attr("dy", "20px")
    .attr("dx", function(d) { return xScale(d.dx)/2; })
    .attr("fill", "#fff")
    .attr("text-anchor", "middle")
    .text(function(d) { return d.y; })
})