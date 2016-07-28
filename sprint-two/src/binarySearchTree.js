var BinarySearchTree = function(value) {
  this.value = value;
  this.left = null;
  this.right = null;
  this.children = [this.left, this.right];
};

BinarySearchTree.prototype.insert = function (value) {
  if (!this.contains(value)) {
    var branch = new BinarySearchTree(value);
    var grafted = false;

    var check = function (tree) {
      if (grafted) { return; }

      if (value < tree.value) {
        if (tree.left === null) {
          tree.left = branch;
          grafted = true;
        } else if (tree.left !== null) {
          check(tree.left);
        }
      }

      if (value > tree.value) {
        if (tree.right === null) {
          tree.right = branch;
          grafted = true;
        } else if (tree.right !== null) {
          check(tree.right);
        }
      }
    };

    check(this);
  }
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

/*
 * Complexity: What is the time complexity of the above functions?
 */
