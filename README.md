# d3-practice

### D3 Request

### D3 Data-binding

  - `d3.select` method which utilizes CSS selectors to grab DOM elements like so 
  
  ```js
  var p = d3.select("body").selectAll("p")
  ```
  - `.data(theData)` operator joins an array of data (numbers, objects, arrays...) with selection, returning 3 seletions: 
  
    - `enter` selection - contains placeholders for elements
    - `update` selection - contains existing elements, bound to data
    - `exit` selection - any remaining elements end up here for removal
    
   `.enter()` returns a _reference_ to the placeholder elements (nodes) for each data element that did not have a corresponding existing DOM element. With this _reference_, the selection can be operated on, (Note, that this _reference_ only allows chaining of *append*, *insert*, and *select*.) and the selection can be used to modify content. 
   
  - step-by-step [general update pattern](https://www.dashingd3js.com/lessons/d3-basic-general-update-pattern)
   
  ```js
  var p = d3.select("body").selectAll("p")
    .data(theData)
    .enter()
    .append("p")
  ```
  for each placeholder element created by `.enter()`, a *p* element is inserted.
  
  ```js
    .text("D3!");
  ```
  
  `.text()` operator sets the textContent of the node to the specified value ("D3!") for all selected elemnets. 
 
  - breakdown of [binding text to SVG](https://www.dashingd3js.com/svg-text-element)
  
 Note that chaining together attr calls overwrite. They need to be called all on one line per example on StackOverflow for [setting up multiple classes](http://stackoverflow.com/questions/17069359/d3-cant-set-text-color-via-css-class) like so:
  
 ```javascript
 .attr('class', 'white transparent')
```
  
### code to setup local server for development
  
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
  
  - reading from [D3 Tips and Tricks](https://leanpub.com/D3-Tips-and-Tricks)
  
  - inspired by [Bl.ocks](http://bl.ocks.org/), [Tributary](http://tributary.io), and [d3 wiki gallery](https://github.com/d3/d3/wiki/Gallery)
  
  - documentation at [D3 wiki](https://github.com/d3/d3/wiki)
  
  - GitHub wiki directory of [tutorials](https://github.com/d3/d3/wiki/Tutorials)
  
  - good discussion on implementation of `.select` at Mike Bostock's [site](https://bost.ocks.org/mike/selection/)
