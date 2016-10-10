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
  
## References
  
  directly stealing from [Dashing D3.js](https://www.dashingd3js.com/binding-data-to-dom-elements)
  
  reading from [D3 Tips and Tricks](https://leanpub.com/D3-Tips-and-Tricks)
  
  GitHub wiki directory of [tutorials](https://github.com/d3/d3/wiki/Tutorials)
  
### code to setup local server for development
  
  Chrome and other browsers have security restrictions for Cross Origin Requests so that loading from `file:///` is not possible and this error will show: `XMLHttpRequest cannot load file. Cross origin requests are only supported for HTTP` Run this code to setup Python's simple server to test out small projects. 
  
  ```bash
  python -m SimpleHTTPServer
```
   and then access local server with: 
   
  ```bash
  0.0.0.0:8000
  ```
### include this in head

```js
  <script src="https://d3js.org/d3.v4.min.js"></script>
```
   
