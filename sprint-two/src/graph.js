

// Instantiate a new graph
var Graph = function() {
  this.nodes = [];
};

var Node = function (value) {
  this.value = value;
  this.connections = [];
};

// Add a node to the graph, passing in the node's value.
Graph.prototype.addNode = function(node) {
  this.nodes.push(new Node(node));
};

// Return a boolean value indicating if the value passed to contains is represented in the graph.
Graph.prototype.contains = function(node) {
  return _(this.nodes).reduce(function (memo, x) { 
    if (memo === true) { return true; }
    if (x.value === node) { return true; } 
  }, false);
};

// Removes a node from the graph.
Graph.prototype.removeNode = function(node) {
  var targetNode = this.grabNode(node);
  
  if (targetNode.connections.length !== 0) {
    for (var i = 0; i < targetNode.connections.length; i++) {
      this.removeEdge(targetNode.value, targetNode.connections[i]);
    }

    // This doesn't work. I think that the _() wrapper changes
    // what this points to.
    // _(targetNode.connections).each(function (x) { this.removeEdge(targetNode.value, x.value); });
  }
  
  return this.nodes.splice(this.nodes.indexOf(targetNode), 1);
};

// A function I wrote to increase modularity.
Graph.prototype.grabNode = function (node, array) {
  array = array || this.nodes;
  var valueArray = _(array).map(function (x) { return x.value; });
  var index = valueArray.indexOf(node);
  var targetNode = array[index];
  return targetNode;
};

// Returns a boolean indicating whether two specified nodes are connected.  Pass in the values contained in each of the two nodes.
Graph.prototype.hasEdge = function(fromNode, toNode) {
  var found = false;
  var node1 = this.grabNode(fromNode);
  if (this.grabNode(toNode.value, node1.connections) === toNode) {
    found = true;
  } 
  return found;
};

// Connects two nodes in a graph by adding an edge between them.
Graph.prototype.addEdge = function(fromNode, toNode) {
  var node1 = this.grabNode(fromNode);
  var node2 = this.grabNode(toNode);
  node1.connections.push(node2.value);
  node2.connections.push(node1.value);
};

// Remove an edge between any two specified (by value) nodes.
Graph.prototype.removeEdge = function(fromNode, toNode) {
  var node1 = this.grabNode(fromNode);
  var node2 = this.grabNode(toNode);
  node1.connections.splice(node1.connections.indexOf(node2.value), 1);
  node2.connections.splice(node2.connections.indexOf(node1.value), 1);
};

// Pass in a callback which will be executed on each node of the graph.
Graph.prototype.forEachNode = function(cb) {
  // for (var i = 0; i < this.nodes.length; i++) {
  //   cb(this.nodes[i].value);
  // }

  _(this.nodes).each(function (x) { return cb(x.value); });
};

/*
 * Complexity: What is the time complexity of the above functions?
 */


