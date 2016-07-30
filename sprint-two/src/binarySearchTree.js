var BinarySearchTree = function(value) {
  this.value = value;
  this.left = null;
  this.right = null;
  this.nodeCount = 0;
  this.height = 0;
};

BinarySearchTree.prototype.insert = function(value) {
  var branch = new BinarySearchTree(value);
  var newHeight = 0;
  var check = function (node) {
    newHeight++;
    if (branch.value < node.value) {
      if (node.left !== null) {
        check(node.left);
      } else {
        node.left = branch; 
      }
      
    } else if (branch.value > node.value) {
      if (node.right !== null) {
        check(node.right);
      } else {
        node.right = branch;
      }
    }
  };

  check(this);
  
  if (newHeight > this.height) { this.height = newHeight; }
  this.nodeCount++;

  var imbalance = this.height - Math.log2(this.nodeCount); 

  if (imbalance > 3) { this.balance(); }
  
};

BinarySearchTree.prototype.contains = function (value) {
  var found = false;

  var check = function (tree) {
    if (tree === null) { return; }
    if (tree.value === value) {
      found = true;
    } else if (value > tree.value) {
      check(tree.right);
    } else if (value < tree.value) {
      check(tree.left);
    }
  };

  check(this);

  return found;  
};

BinarySearchTree.prototype.depthFirstLog = function (callback) {
  var check = function (tree) {
    if (tree !== null) { 
      callback(tree.value); 
      check(tree.left);
      check(tree.right);
    }
  };

  check(this);
};

BinarySearchTree.prototype._insert = function (value) {
  var branch = new BinarySearchTree(value);
  var newHeight = 0;
  var check = function (node) {
    newHeight++;
    if (branch.value < node.value) {
      if (node.left !== null) {
        check(node.left);
      } else {
        node.left = branch; 
      }
      
    } else if (branch.value > node.value) {
      if (node.right !== null) {
        check(node.right);
      } else {
        node.right = branch;
      }
    }
  };

  check(this);
  
  if (newHeight > this.height) { this.height = newHeight; }
  this.nodeCount++;
};

BinarySearchTree.prototype.balance = function() {
  var nodes = this.grabAllNodes();
  var middleOf = function (array) {
    return Math.floor(array.length / 2);
  };

  var populateTree = function (array) {
    if (array.length !== 0) {
      var array1 = array.slice(0, middleOf(array));
      var array2 = array.slice(middleOf(array));
      balancedTree._insert(array1.splice(middleOf(array1), 1)[0]);
      balancedTree._insert(array2.splice(middleOf(array2), 1)[0]);
      populateTree(array1);
      populateTree(array2);
    }
  };

  nodes = _.map(nodes, function (x) { return x.value; });
  nodes.sort(function (a, b) { return a - b; });
  
  var balancedTree = new BinarySearchTree(nodes.splice( Math.floor(nodes.length / 2), 1)[0]);

  populateTree(nodes);

  this.value = balancedTree.value;
  this.left = balancedTree.left;
  this.right = balancedTree.right;
  this.height = balancedTree.height;
};

BinarySearchTree.prototype.grabAllNodes = function() {
  var nodeArray = [];

  var check = function(node) {
    if (node !== null) {
      nodeArray.push(node);
      check(node.left);
      check(node.right);
    }
  };

  check(this);

  return nodeArray;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
