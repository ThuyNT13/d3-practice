# d3-practice


  ```js
  let svg = d3.select("body")
  	.selectAll("p")
    .data(theData)
    .enter()
    .append("p")
    .text(function(d) { return d });
  ```

The breakdown of a basic *d3* object:

  - `d3.select("body")` function utilizes CSS selectors to select DOM elements, in this case, the `<body>` element.
  - `.selectAll("p")` selects all paragraph elements and *returns them*.
  - `.data(theData)` binds/joins the array of data to the *selection elements returned*, in this case the `<p>` elements.
  - `.enter()` dynamically creates placeholder references corresponding to the number of data passed in through  `.data(theData)`, in the event that the number of DOM elements does not match the number of data points from the array.
  - `.append()`creates the DOM elements for the placeholder references created by `enter()` and appends to the `<body>` element.
  - `.text(function(d) { return d });` adds data as text for each of the *selection elements*.

### SVG viewport and basic shapes

SVG is written in XML. From the example below, it looks very familiar to HTML with the SVG tag and its properties and values pairing. The code below sets up the SVG viewport with the SVG tag. The line script renders a line on the page. Note that wherever the line overextends outside the viewport, that portion will not be visible. Overview of basic SVG shapes here: [SVG Basic Shapes and D3.js](https://www.dashingd3js.com/svg-basic-shapes-and-d3js)

```html
<svg width="50" height="50">
  <line x1="5" y1="5" x2="40" y2="40" stroke="gray" stroke-width="5"/>
</svg>

```

All of the SVG manual implementation for basic shapes can be more dynamically simulated by D3. Keep in mind that since SVG is written in XML, it needs to be placed within HTML code. D3 is JavaScript so it needs to be placed within js script.

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
  .attr("stroke", "red")
  .attr("stroke-width", 5);

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
