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
*SVG* is written in XML. The *SVG* element sets up the *SVG* viewport, defining the dimensions. Anything outside the viewport will not be visible. Manually implementing the *SVG* element does basically the same thing as the longer *d3* implementation, but hard-coding the dimensions of your container is bad practice and *d3* allows for us to dynamically input data. And when you're working with big data, bad practices can lead to wear and tear on your hands pounding out all the datum, as well as brittle code. 

Note that what's passed as a param through *select* is a CSS Selector, in this case *body*. What's passed as a param through *append* is an *SVG* object. You could quite simply run the following snippet and add an HTML \<p\> element to the DOM, with text, and your container is a p element. The script will append a *p-element* to the end of the body.  

```js
d3.select("body").append("p").text("Waddup World!");
```

### Shapes

Now invoke *append* on the *svg* object in order to create a shape to be placed within the svg container, add a circle DOM element using *attr* to set the attributes of the shape: 

```js
const circle = svg.append("circle")
  .attr("cx", 300)
  .attr("cy", 200)
  .attr("r", 50)
  .attr("fill", "purple");
```

This is an DOM element that has not yet been bound to any data. For that, there's the **D3 Data operator** which joins data to DOM elements. First, invoke `selectAll("circle")` so that all the circles are selected for binding data. Next, pass the data variable to the *data operator*, `.data(data)`. But invoking `data(data)` returns 3 different, possible **virtual selection** scenarios: 
  - **update**: there's a matching DOM element for each data element 
  - **enter**: there's not enough DOM elements, so the *enter* selection creates placeholder references for the missing elements that correspond to the data 
  - **exit**: there's a surplus of DOM elements, so the *exit* selection removes them
  
To illustrate *exit*, where there are more DOM elements than data:  

  ```js
const width = 600, height = 400;
const data = [10];

const svg = d3.select("body").append("svg")
  .attr("width", width).attr("height", height);

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
    .attr("r", function(d) { return d * 5; })
    .exit()
      .attr("fill", "orange")
      .attr("cx", 100)
      .attr("cy", 150)
      .attr("r", function(d) { return d * 10; }); // exit selection has no data
  ```


Initially two circles are created, one red and the other blue. But there's only one data element so only one circle will render. But if you were to look at the HTML: 

```html
  <svg width="600" height="400">
    <circle fill="red" cx="50" cy="100" r="50"></circle>
    <circle fill="orange" cx="100" cy="150"></circle>
  </svg>
```

There's a second circle but it's the *orange* circle for the **exit** selection, not the blue. There are more DOM elements than data so *exit* is executed. Also note that there is no *radius* attribute as it's setup by `.attr("r", function(d) { return d * 10; })`, and since there's no data element available, there's no radius so no circle rendered. 

The radius for the red circle is set right after the *data operator* where its data point is multiplied by 5 to set the radius: `.attr("r", function(d) { return d * 5; })`. This is **update selection** scenario, where the number of *DOM* elements and *data* elements match. And to contrast that with **enter selection**, where data elements exceed DOM elements: 

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
    .enter()                                      // enter 
      .append("circle")
      .attr("fill", "purple")
      .attr("cx", 200)
      .attr("cy", 50)
      .attr("r", function (d) { return d; }); 
```

This is an **enter** scenario where it starts out with more datum than available DOM elements and *enter* creates the placeholders for the surplus data. The HTML is now: 

```html
  <svg width="600" height="400">
    <circle fill="pink" cx="50" cy="100" r="50"></circle>     // update
    <circle fill="pink" cx="150" cy="150" r="100"></circle>   // update
    <circle fill="purple" cx="200" cy="50" r="30"></circle>   // enter
  </svg>
```

Note the colors of the circles. The first two are updated to *pink* and the last, which was created under *enter*, is *purple*. 

---

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