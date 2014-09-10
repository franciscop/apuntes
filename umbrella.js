/* Umbrella js
 * -----------
 * Covers your needs
 * 
 * A small, lightweight jQuery alternative
 * By Francisco Presencia Fandos
 * Inspired by http://youmightnotneedjquery.com/
 * Compress: http://jscompress.com/
 * Analyze: http://www.jshint.com/
 * 
 * 
 * Table of contents:
 * 1. Init
 * 2. Selector manipulation
 * 3. Node manipulation
 * 4. Return something
 * 5. Events
 * 6. Ajax
 *
 */



// 1. INIT
// It should make sure that there's at least one element in nodes
var u = function(parameter) {
  
  // Make sure that we are always working with the u object
  // This is only so we can avoid selector = new u("whatever");
  // and use u("whatever").bla();
  // Reference: http://stackoverflow.com/q/24019863
  if (!(this instanceof u)) {    // !() http://stackoverflow.com/q/8875878
    return new u(parameter);
    }
  
  // Default value
  this.nodes = [];
  
  // If we're referring a specific node as in click(){ s(this) }
  if (typeof parameter == "object" && parameter.nodeName) {
    
    // Store the node as an array
    this.nodes = [parameter];
    }
  
  
  // Check if it's a selector or an object
  if (typeof parameter == "string") {
    
    // Match the nodes from the given selector
    var nodeList = document.querySelectorAll(parameter);
    
    // Store all the nodes as an array
    // http://toddmotto.com/a-comprehensive-dive-into-nodelists-arrays-converting-nodelists-and-understanding-the-dom/
    this.nodes = Array.prototype.slice.call(nodeList, 0);
    }
  
  return this;
  }













// EACH
// Loop through all the nodes
u.prototype.each = function(callback) {
  
  // Loop through all the nodes
  for (var i = 0; i < this.nodes.length; i++) {
    
    // Perform the callback for this node
    var ret = callback(this.nodes[i], i);
    
    // Something is returned to change the node
    if (ret)
      
      // Assign the new node
      this.nodes[i] = ret;
    }
  };



// FIRST
// Removes nodes fron DOM
u.prototype.first = function() {
  
  if (this.nodes.length > 0) {
    return this.nodes[0];
    }
  };



// PARENT
// Select the parent nodes
u.prototype.parent = function() {
  
  // Loop through all the nodes
  this.each(function(node, i) {
    
    // Select each node's parent
    return node.parentNode;
    });
  
  return this;
  }



// CHILDREN
// Select all the children
// TODO



// HTML
// Sets the html of the matched nodes
u.prototype.html = function(text) {
  
  if (text !== undefined) {
    
    // Loop through all the nodes
    this.each(function(node) {
      
      // Set the inner html to the passed arg
      node.innerHTML = text;
      });
    return this;
    }
  
  else {
    return this.first().innerHTML;
    }
  };



// REMOVE
// Removes nodes fron DOM
u.prototype.remove = function() {
  
  // Loop through all the nodes
  this.each(function(node) {
    
    // Set the inner html to the passed arg
    node.parentNode.removeChild(node);
    });
  };



// ADJACENT
// Add text in the specified position.
// It is used by other functions
u.prototype.adjacent = function(position, text) {
  
  // Loop through all the nodes
  this.each(function(node) {
    
    // http://stackoverflow.com/a/23589438
    // Ref: https://developer.mozilla.org/en-US/docs/Web/API/Element.insertAdjacentHTML
    node.insertAdjacentHTML(position, text);
    });
  
  return this;
  };



// BEFORE
// Add child before the nodes
u.prototype.before = function(text) {
  
  this.adjacent('beforebegin', text);
  
  return this;
  };



// PREPEND
// Add child the first thing inside
u.prototype.prepend = function(text) {
  
  this.adjacent('afterbegin', text);
  
  return this;
  };



// APPEND
// Add child the first thing inside
u.prototype.append = function(text) {
  
  this.adjacent('beforeend', text);
  
  return this;
  };



// AFTER
// Add child before the nodes
u.prototype.after = function(text) {
  
  this.adjacent('afterend', text);
  
  return this;
  };



// ADDCLASS
// Assign a new class to the matched nodes
u.prototype.addClass = function(name) {
  
  // Loop through all the nodes
  this.each(function(node) {
    
    // Add the class to the node
    node.classList.add(name);
    });
  
  return this;
  };



// REMOVECLASS
// Removes a new class from the matched nodes
u.prototype.removeClass = function(name) {
  
  // Loop through all the nodes
  this.each(function(node) {
    
    // Remove the class from the node
    node.classList.remove(name);
    });
  
  return this;
  };




// HASCLASS
// Check if the first node has a class
u.prototype.hasClass = function(name) {
  
  return this.first().classList.contains(name);
  };



// ATTR
// Return the fist node attribute
u.prototype.attr = function(name, value) {
  
  if (value) {
    this.first().setAttribute(name, value);
    return this;
    }
  
  return this.first().getAttribute(name) || "";
  };


// Scroll to the element matched
u.prototype.scroll = function(to) {
  var el = this.first();
  
  el.scrollTop =
    el.scrollTop +
    to.getBoundingClientRect().top;
  return this;
  };



// SERIALIZE
// The <input> and <button> without type will be parsed as default
// NOTE: select-multiple for <select> is disabled on purpose
u.prototype.serialize = function() {
  
  // Store the class in a variable for manipulation
  var form = this.first();
  
  // Magic ( http://stackoverflow.com/q/11661187 )
  var i, query = "";
  
  // Encode the values https://gist.github.com/brettz9/7147458
  function en(str) {
   return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
    }
  
  for (i = form.elements.length - 1; i >= 0; i = i - 1) {
    
    // Store ELEMENT
    var el = form.elements[i];
    
    // Make sure the element has name
    if (el.name === "") {
      continue;
      }
    
    
    switch (el.type) {
      // Don't add files
      case 'file':
        break;
      
      // Don't add checkbox or radio if they are not checked
      case 'checkbox':
      case 'radio':
        if (!el.checked)
          break;
      
      // All other cases
      default:
        query += "&" + en(el.name) + "=" + en(el.value);
      }
    }
  
  // Join the query and return it
  return query;
  };









// EVENTS

// Add each event to each node
// There can be more than one event "click focus"
u.prototype.on = function(events, callback) {
  
  // Separate the events
  var evts = events.split(' ');
  
  // Loop through each event
  for (var i=0; i < evts.length; i++) {
  
    // Loop through all the nodes
    this.each(function(node) {
      
      // Add each event listener to each node
      node.addEventListener(evts[i], callback);
      });
    }
  
  return this;
  };



// click() event
u.prototype.click = function(callback) {
  
  // Loop through all the nodes
  this.on('click', callback);
  
  return this;
  };



// post request
u.prototype.ajax = function(success, error, before) {
  
  // Loop through all the nodes
  this.on("submit", function(e) {
    
    // Stop the browser from sending the request
    e.preventDefault();
    
    // Post the actual data
    ajax(
      u(this).attr("action"),
      u(this).serialize(),
      success,
      error,
      before);
    });
  
  return this;
  };

























// Define a new status
u.defineStatus = function(activate, deactivate, has, name){
  name = name || activate;
  
  if (activate) {
    u.prototype[activate] = function() {
      this.addClass(name);
      return this;
      };
    }
  
  if (deactivate) {
    u.prototype[deactivate] = function() {
      this.removeClass(name);
      return this;
      };
    }
  
  if (has) {
    u.prototype[has] = function() {
      return this.hasClass(name);
      };
    }
  };




// Check if the string is json
function isJson(jsonString){
  try {
    var o = JSON.parse(jsonString);
    // Handle non-exception-throwing cases:
    // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
    // but... JSON.parse(null) returns 'null', and typeof null === "object", 
    // so we must check for that, too.
    if (o && typeof o === "object" && o !== null) {
        return o;
      }
    }
  catch (e) {}

  return false;
  }


function ajax(url, data, success, error, before) {
  if (before)
    before();
  
  data = data + "&umbrella=true";
  
  // Create and send the actual request
  var request = new XMLHttpRequest();
  
  // Create a request of type POST to the URL and ASYNC
  request.open('POST', url, true);
  
  // When the request is sent
  request.onload = function() {
    
    var status = this.status;
    
    // Error
    if (status < 200 || status >= 400) {
      if (error) {
        error(status);
        }
      
      return false;
      }
    
    var rawresponse = this.response;
    
    // Check if valid json
    if (!isJson(rawresponse)) {
      console.log("Response from server should be JSON");
      
      if (error) {
        error("Response from server should be JSON");
        }
      
      success(rawresponse);
      return false;
      }
    
    // Parse the response
    var response = JSON.parse(rawresponse);
    
    
    // The response is right
    // Only the required information will be passed to the function
    if (response.success) {
      if (success) {
        // Umbrella is being used server-side
        if (response.umbrella) {
          success(response.data);
          }
        
        // Umbrella is not being used server-side
        else {
          success(response);
          }
        }
      }
    
    // If there was some error
    else {
      if (error) {
        if (response.umbrella)
          error(response.error);
        else
          error(response);
        }
      }
    };
  
  request.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
  request.send(data);
  }


// Returns the first matched HTML NODE
function node(selector) {
  
  // Get the first from Umbrella JS
  return u(selector).first();
  }




// Define a few status
u.defineStatus('active' , 'inactive', 'isActive' );
u.defineStatus('error'  , 'success' , 'hasError' );
u.defineStatus('loading', 'loaded'  , 'isLoading');



