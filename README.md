# d3-practice

In order to utilize *d3* methods, you need to link to the d3 library, so include this in *\<head\>*: 

```js
  <script src="https://d3js.org/d3.v4.min.js"></script>
```

### SVG viewport 

The next step is to add an *HTML element* to the *DOM* and for that you will need **select** and **append** to establish the container from which you will be able to start visualizing data as well as **attr** to setup the size of the container:

```js
const width = 600, height = 400;

const svg = d3.select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);
```

This sets up an **SVG** (Scalable Vector Graphics) object that will be your container. Assigning it to a variable (*svg*) allows for the *SVG* object to be called for further *d3* data visualization processes. If you were to examine the HTML, you would see:

```html
<body>
  <svg width="600" height="400">
  </svg>
</body>
```
Defining the dimensions of the *SVG* object sets up the viewport. Anything outside the viewport will not be visible. 

You could manually implement the XML instead of implementing it with *d3* and it will be the same thing. However, *d3* allows for us to dynamically input data. And when you're working with a lot of data, pounding out all the data into XML is no fun, especially when you need to update your code. 

What's passed as a param through *select* is a CSS Selector, in this case *body*. What's passed as a param through *append* is the DOM element for containing your data. You could quite simply run the following snippet and add an HTML \<p\> element to the DOM, with text, and your container is a p element. The script will append a *p-element* to the end of the body.  

```js
d3.select("body").append("p").text("Waddup World!");
```

### Shapes

With the *SVG* object just created, `append` a circle DOM element and set the attributes of the circle with `attr`: 

```js
const circle = svg.append("circle")
  .attr("cx", 300)
  .attr("cy", 200)
  .attr("r", 50)
  .attr("fill", "purple");
```

### Data binding using `update`, `enter` and `exit`

This is a DOM element that has not yet been bound to any datum. For that, there's the **D3 Data operator** which joins data to DOM elements. Invoke `selectAll("circle")` so that all the circles are selected for binding data. 

Passing the data to the *data operator*, `.data(data)` returns 3 possible **virtual selection** scenarios: 
  - **update (data == DOM)**: there's a matching DOM element for each datum element
  - **enter (data > DOM)**: there's not enough DOM elements, so the *enter* selection creates placeholder references for each missing element and its corresponding datum, and returns these
  - **exit (data < DOM)**: there's a surplus of DOM elements, so the *exit* selection returns them for removal
  
To illustrate *exit*, where there are more DOM elements than data:  

  ```js
const width = 600, height = 400;
const data = [10];

const svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);

const circle = svg.append("circle")
  .attr("fill", "red")
  .attr("cx", 50)
  .attr("cy", 100);

const circle2 = svg.append("circle")
  .attr("fill", "blue")
  .attr("cx", 200)
  .attr("cy", 150);

const circles = svg.selectAll("circle")
  .data(data) 
    .attr("r", function(d) { return d * 5; });    // update selection sets datum to radius
  ```

Initially two DOM elements are created, one red circle and the other blue. But there's only one datum element so only one circle will render. If you were to look at the HTML: 

```html
  <svg width="600" height="400">
    <circle fill="red" cx="50" cy="100" r="50"></circle>
    <circle fill="blue" cx="100" cy="150"></circle>
  </svg>
```

The second circle still exists but it's useless. There are more DOM elements than data. `.attr("r", function(d) { return d * 10; })` sets the *radius*, and since there's no datum element available, there's no radius so no circle rendered. 

If we were to chain `.exit()` with attributes: 

```js
const circles = svg.selectAll("circle")
  .data(data) 
    .attr("r", function(d) { return d * 5; })     // update selection 
    .exit()
      .attr("fill", "orange")
      .attr("cx", 300)
      .attr("cy", 450)
      .attr("r", function(d) { return d * 10; }); // exit selection has no data
```

...this demonstrates that `.exit()` has claimed the extra circle for removal.

```html
  <svg width="600" height="400">
    <circle fill="red" cx="300" cy="450" r="50"></circle>
    <circle fill="orange" cx="100" cy="150" r=NaN ></circle>
  </svg>
```

Chaining `.remove()`: 

```js
const circles = svg.selectAll("circle")
  .data(data) 
    .attr("r", function(d) { return d * 5; })     // update selection 
    .exit()
    .remove();                                    // remove excess circle 
```

...results in the extra circle being removed from HTML.

```html
<svg width="600" height="400">
  <circle fill="red" cx="50" cy="100" r="50"></circle>
</svg>
```

The radius for the red circle is set right after the *data operator* where its data point is multiplied by 5 to set the radius: `.attr("r", function(d) { return d * 5; })`. The red circle is an **update selection** scenario, where the number of *DOM* elements and *data* elements match. To contrast that with **enter selection**, where data elements exceed DOM elements: 

```js
const width = 600, height = 400;
const data = [10, 20, 30];

const svg = d3.select("body").append("svg")
  .attr("width", width).attr("height", height);

const circle = svg.append("circle")
  .attr("fill", "red")
  .attr("cx", 50)
  .attr("cy", 100);
 
const circle2 = svg.append("circle")
  .attr("fill", "blue")
  .attr("cx", 150)
  .attr("cy", 150);

const circles = svg.selectAll("circle")
  .data(data)
    .attr("fill", "pink")                         // update
    .attr("r", function(d) { return d * 5; })
    .enter().append("circle")                     // enter 
      .attr("fill", "purple")
      .attr("cx", 200)
      .attr("cy", 50)
      .attr("r", function (d) { return d; }); 
```

This a scenario where there's more data than available DOM elements and *enter* creates the placeholders for the surplus data. The HTML is now: 

```html
<svg width="600" height="400">
  <circle fill="pink" cx="50" cy="100" r="50"></circle>     // update
  <circle fill="pink" cx="150" cy="150" r="100"></circle>   // update
  <circle fill="purple" cx="200" cy="50" r="30"></circle>   // enter
</svg>
```

Note the colors of the circles. The first two are updated to *pink* and the last, which was created under *enter*, is *purple*. The purple circle is the scenario where dynamically loading data happens. 

Given an array of objects that can be used to store the attribute values, the data can be passed through `.data(data)`. This makes for more flexible, maintainable code. 

```js
const width = 600, height = 400;

const data = [
  { "cx": 20, "cy": 20, "r": 20, "color": "green" },
  { "cx": 70, "cy": 70, "r": 20, "color": "purple" },
  { "cx": 110, "cy": 110, "r": 20, "color": "orange" },
  { "cx": 160, "cy": 160, "r": 20, "color": "cyan" }
]

const svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);

const circles = svg.selectAll("circle")
  .data(data)
    .enter().append("circle")
      .attr("cx", function(d) { return d.cx; })
      .attr("cy", function (d) { return d.cy; })
      .attr("r", function (d) { return d.r; })
      .attr("fill", function (d) { return d.color; });
```

Final code [here](https://github.com/ThuyNT13/d3-practice/blob/master/index.html) 


But it's messy to have data in the HTML, particularly if the plan is to make thousands of objects, so moving it to a separate JSON file is the next step.

```js
// circles.json
{[
  {"cx":20, "cy":20, "r":20, "color":"green"},
  {"cx":70, "cy":70, "r":20, "color":"purple"},
  {"cx":110, "cy":110, "r":20, "color":"orange"},
  {"cx":160, "cy":160, "r":20, "color":"cyan"}
]}
```

We can parse it with `d3.json`. The first parameter takes in the URL path of the location of the file. The second param is the function call when the data is loaded. You wrap this around *d3* functions that are going to pass the data. 

```js
d3.json("circles.json", function(data) {
  const circles = svg.selectAll("circle")
  .data(data)
    .enter().append("circle")
      .attr("cx", function(d) { return d.cx; })
      .attr("cy", function (d) { return d.cy; })
      .attr("r", function (d) { return d.r; })
      .attr("fill", function (d) { return d.color; });
})
```

Example [here](https://github.com/ThuyNT13/d3-practice/blob/master/circlesToPlayWith/client.js):

### [Cross Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

Browsers have security restrictions for Cross Origin Requests so that loading from `file:///` is not possible and this error will show:
```bash
XMLHttpRequest cannot load file. Cross origin requests are only supported for HTTP
```

Run this code inside the same directory as your HTML file to start a local web server.

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

  - [Dashing D3.js](https://www.dashingd3js.com/binding-data-to-dom-elements)

  - good [beginner's guide](http://website.education.wisc.edu/~swu28/d3t/index.html)

  - reading from [D3 Tips and Tricks](https://leanpub.com/D3-Tips-and-Tricks)

  - inspired by [Bl.ocks](http://bl.ocks.org/) and [d3 wiki gallery](https://github.com/d3/d3/wiki/Gallery)

  - documentation at [D3 wiki](https://github.com/d3/d3/wiki)

  - GitHub wiki directory of [tutorials](https://github.com/d3/d3/wiki/Tutorials)

  - [SVG shape examples](http://www.kelvinlawrence.net/svg/index.html)

  - [list of resources](http://mikemcdearmon.com/portfolio/techposts/charting-libraries-using-d3)

  - Breakdown of [How Selections Work](https://bost.ocks.org/mike/selection/) and [D3 in Depth - Enter and Exit](https://d3indepth.com/enterexit/) as well as video tutorial [D3.js tutorial - 7 - Enter, Update, Exit ](https://www.youtube.com/watch?v=OZXYk_bgQGQ&list=PL6il2r9i3BqH9PmbOf5wA5E1wOG3FT22p&index=7) for understanding the *virtual selections* better

  - ...which leads you to step-by-step overview of [General Update Pattern](https://www.dashingd3js.com/lessons/d3-basic-general-update-pattern) as well as an example that implements it well [here](https://bl.ocks.org/mbostock/3808234) and [here](https://bl.ocks.org/mbostock/3808218) and an extensive video tutorial, [The General Update Pattern of D3.js]((https://www.youtube.com/watch?v=IyIAR65G-GQ&feature=youtu.be)) 
