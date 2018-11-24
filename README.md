# d3-practice

In order to utilize *d3* methods, you need to link to the d3 library, so include this in *\<head\>*: 

```js
  <script src="https://d3js.org/d3.v4.min.js"></script>
```

### SVG viewport 

The next step is to add an *HTML element* to the *DOM* and for that you will need **select** and **append** to establish the container from which you will be able to start the process to visualize data as well as **attr** to setup the size of the container:

```js
const width = 600, height = 400;

const svg = d3.select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);
```

This sets up an **SVG** (Scalable Vector Graphics) object that will be your container, which will be assigned to a variable that can be called for further data visualization processes. You could manually implement with the following code and it will be the same thing. In fact, if you were to examine the HTML, you would see:

```html
<body>
  <svg width="600" height="400">
  </svg>
</body>
```
SVG is written in XML. The SVG element sets up the SVG viewport, defining the dimensions. Anything outside the viewport will not be visible. Manually implementing the SVG element does basically the same thing as the longer *d3* implementation, but hard-coding the dimensions of your container is bad practice and *d3* allows for us to dynamically input data. And when you're working with big data, bad practices can lead to wear and tear on your hands pounding out all the datum, as well as brittle code. 

Note that what's passed as a param through *select* is a CSS Selector, in this case *body*. What's passed as a param through *append* is an *svg* object. You could quite simply run the following snippet and add an HTML \<p\> element to the DOM, with text, and your container is a p element. The script will append a *p-element* to the end of the body.  

```js
d3.select("body").append("p").text("Waddup World!");
```

### Shapes

Now invoke *append* on the *svg* object in order to create a shape to be placed within the svg container. Use *attr* to set the attributes of the shape: 

```js
const circle = svg.append("circle")
  .attr("cx", 300)
  .attr("cy", 200)
  .attr("r", 50)
  .attr("fill", "purple");
```

### Binding data



  ```js
  const pElement = d3.select("body")
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
  - `.append()`creates the DOM elements for the placeholder references created by `enter()` and appends to the `<body>` element, establishes the *container* 
  - `.text(function(d) { return d });` adds data as text for each of the *selection elements*.

```js
const width=150, height=100;

const svg = d3.select("body")
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


We can parse it with `d3.json`. The first parameter takes in the URL path of the location of the file. The second param is the function call when the data is loaded. You wrap this method around *d3* functions that are going to pass the data. 

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
