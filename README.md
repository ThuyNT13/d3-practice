# d3-practice

  ```js
  let pElement = d3.select("body")
    .selectAll("p")
    .data(theData)
    .enter()
    .append("p")
    .text(function(d) { return d });
  ```

  - `d3.select("body")` function utilizes CSS selectors to select DOM elements, in this case, the `<body>` element.
  - `.selectAll("p")` selects all paragraph elements and *returns them*.
  - `.data(theData)` operator binds/joins the array of data to the *selection elements returned*, in this case the `<p>` elements.
  - `.enter()` dynamically creates placeholder references corresponding to the number of data passed in through  `.data(theData)`, in the event that the number of DOM elements does not match the number of data points from the array.
  - `.append()`creates the DOM elements for the placeholder references created by `enter()` and appends to the `<body>` element.
  - `.text(function(d) { return d });` adds data as text for each of the *selection elements*.

### SVG viewport and basic shapes

SVG is written in XML. The SVG element sets up the SVG viewport, defining the dimensions. The line element renders a line on the page with the coordinate and style attributes. Note that wherever the line overextends outside the viewport, that portion will not be visible. Overview of basic SVG shapes here: [SVG Basic Shapes and D3.js](https://www.dashingd3js.com/svg-basic-shapes-and-d3js)

```html
<svg width="50" height="50">
  <line x1="5" y1="5" x2="40" y2="40" stroke="gray" stroke-width="5"/>
</svg>

```

The SVG manual implementation can be more dynamically simulated by D3. Keep in mind that since SVG is written in XML, it needs to be placed within HTML code. D3 is JavaScript so it needs to be placed within js script.

```js
const width=150, height=100;

let svg = d3.select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("line")
  .attr("x1", 5)
  .attr("y1", 5)
  .attr("x2", 40)
  .attr("y2", 40)
  .style("stroke", "red")
  .style("stroke-width", 5);

```

### Data binding

The beauty of using **D3** is the ability to just feed it the values for the coordinates and style attributes as opposed to hard-coding it into XML. This makes for a more flexible and readable code.

An array of JSON objects can be used to store those values:

```js
const theData = [
  {"cx":20, "cy":20, "r":20, "color":"green"},
  {"cx":70, "cy":70, "r":20, "color":"purple"},
  {"cx":110, "cy":110, "r":20, "color":"orange"},
  {"cx":160, "cy":160, "r":20, "color":"cyan"}
]
```

In order to retrieve those data points, we can use the **D3 Data operator** which takes in the array of data values and binds the data to the DOM elements.

```js

```

The second param is an accessor function that returns the data value that we want. 

### parsing JSON

But it's messy to have the data in the HTML, particularly if the plan is to make thousands of objects, so moving it to a separate JSON file is the next step.

```js
// data/circles.json
{"nodes":[
  {"cx":20, "cy":20, "r":20, "color":"green"},
  {"cx":70, "cy":70, "r":20, "color":"purple"},
  {"cx":110, "cy":110, "r":20, "color":"orange"},
  {"cx":160, "cy":160, "r":20, "color":"cyan"}
]}
```


We can parse it with `d3.json`. The first parameter takes in the URL path of the location of the file. The second param is the function call when the data is loaded.

```js
d3.json("../data/circles.json", function(json) {
  console.log(json);
})
```

### [Cross Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

  Chrome and other browsers have security restrictions for Cross Origin Requests so that loading from `file:///` is not possible and this error will show:
  ```bash
  XMLHttpRequest cannot load file. Cross origin requests are only supported for HTTP
```

  Run this code to setup Python's simple server to test out small projects.

  ```bash
  python -m SimpleHTTPServer
```
  and then access local server at [http://0.0.0.0:8000](http://0.0.0.0:8000)

  or setup:

  ```bash
  npm install -g http-server
```
  and run

  ```bash
    http-server &
```

  access [http://localhost:8080](http://localhost:8080)


### include this in head

```js
  <script src="https://d3js.org/d3.v4.min.js"></script>
```


## References

  - directly stealing from [Dashing D3.js](https://www.dashingd3js.com/binding-data-to-dom-elements)

  - good [beginner's guide](http://website.education.wisc.edu/~swu28/d3t/index.html)

  - reading from [D3 Tips and Tricks](https://leanpub.com/D3-Tips-and-Tricks)

  - inspired by [Bl.ocks](http://bl.ocks.org/), [Tributary](http://tributary.io), [Paper.js](http://paperjs.org/examples/chain/) and [d3 wiki gallery](https://github.com/d3/d3/wiki/Gallery)

  - documentation at [D3 wiki](https://github.com/d3/d3/wiki)

  - GitHub wiki directory of [tutorials](https://github.com/d3/d3/wiki/Tutorials)

  - good discussion on implementation of `.select` at Mike Bostock's [site](https://bost.ocks.org/mike/selection/)

  - [SVG shape examples](http://www.kelvinlawrence.net/svg/index.html)

  - [changes in version 4](https://github.com/d3/d3/blob/master/CHANGES.md)

  - [list of resources](http://mikemcdearmon.com/portfolio/techposts/charting-libraries-using-d3)

  - breakdown of [binding text to SVG](https://www.dashingd3js.com/svg-text-element)

  - step-by-step [general update pattern](https://www.dashingd3js.com/lessons/d3-basic-general-update-pattern) as well as an example that implements it well [here](https://bl.ocks.org/mbostock/3808234) and [here](https://bl.ocks.org/mbostock/3808218)
