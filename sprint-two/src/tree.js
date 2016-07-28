var Tree = function(value) {
  var newTree = {};
  newTree.value = value;

  newTree.children = [];

  _.extend(newTree, treeMethods);

  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value) {
  this.children.push(new Tree(value));
};

treeMethods.contains = function(target) {
  var found = false;

  var check = function (tree) {
    if (tree.value === target) {
      found = true;
    }
    if (tree.children.length !== 0) {
      _(tree.children).each(function (x) { return check(x); });
    } 
  };

  check(this);

  return found;
};



/*
 * Complexity: What is the time complexity of the above functions?
 */
