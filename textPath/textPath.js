// http://www.visualcinnamon.com/2015/09/placing-text-on-arcs.html 

const textData = ["first word", "2nd word", "yadda, yadda, ramble.."]

const svg = d3.select("body").append("svg")
  .attr("width", 500)
  .attr("height", 120);

// create SVG path
svg.append("path")
  .attr("id", "wavy") // set unique id for reference
  .attr("d", 'M 10,90 Q 100,15 200,70 Q 340,140 480,70')
  .style("fill", "none")
  .style("stroke", "#1A818C");

// create SVG text element and append textPath element
svg.append('text')
  .append("textPath")
  .attr('xlink:href', '#wavy') // id reference to SVG path
  .style("text-anchor", 'middle') // anchors to mid-path
  .attr("startOffset", "50%") // @ 50 centers text
  // address spaces between strings
  .text(textData);

    // this transition needs some work
    // Error: <path> attribute d: Expected arc flag ('0' or '1')
    // svg.selectAll("path")
  	//   .transition().duration(2000).delay(2000)
  	//   .attr("d", "M75,300 A125,125 0 0,1 325,300");