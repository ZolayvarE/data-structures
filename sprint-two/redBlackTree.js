var redBlackRoot = function (value) {
  return new RnBtree(value, null, null);
};

var RnBtree = function (value, parent, side) {
  this.value = value;
  this.color = 'red';
  this.left = null;
  this.right = null;
  this.parent = parent;
  this.side = side;
  this.checkCases(this);
};

RnBtree.prototype.case1 = function (n) {
  if (this.parent === null) {
    n.color = 'black';
  }
};

RnBtree.prototype.case2 = function (n) {
  if (n.getColor(n.parent) === 'black') {
    return true;
  } else {
    return false;
  }
};

RnBtree.prototype.getColor = function (node) {
  node = node || this;
  if (node === null) {
    return 'black';
  } else {
    return node.color;
  }
};

RnBtree.prototype.case3 = function (n) {
  var parent = n.parent;
  if (parent.side) { 
    var uncle = n.parent.parent.left;
  } else {
    var uncle = n.parent.parent.right;
  }
  if (parent.getColor() === 'red' && uncle.getColor() === 'red') {
    
  }
};

RnBtree.prototype.case4 = function (n) {

};

RnBtree.prototype.case5 = function (n) {

};

RnBtree.prototype.checkCases = function (n) {
  this.case1(n);
  if (!this.case2(n)) {
    this.case3(n);
    this.case4(n);
    this.case5(n);
  }
};

RnBtree.prototype.insert = function (value) {
  var check = function (tree) {
    if (tree !== null) {
      if (value < tree.value) {
        if (tree.left === null) {
          var graft = new RnBtree(value, tree, 0);
          tree.left = graft;
        } else {
          check(tree.left);
        }
      } else if (value > tree.value) {
        if (tree.right === null) {
          var graft = new RnBtree(value, tree, 1);
          tree.right = graft;
        } else {
          check(tree.right);
        }
      }
    }
  };

  check(this);
};

RnBtree.prototype.contains = function (value) {
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