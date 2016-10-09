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
  
  ### Reference
  directly stealing from [Dashing D3.js](https://www.dashingd3js.com/binding-data-to-dom-elements)
  
  ### code to setup local server for development
    ```bash
    python -m SimpleHTTPServer
    ```
