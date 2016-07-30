var redBlackRoot = function (value) {
  return new RnBtree(value, null, null);
};

var RnBtree = function (value, side, parent) {
  this.value = value;
  this.color = 'red';
  this.left = null;
  this.right = null;
  this.parent = parent;
  this.side = side;
};

var RnB = RnBtree.prototype;

RnBtree.prototype.getColor = function (node) {
  if (node === undefined) { node = this; }
  if (node === null) {
    return 'black';
  } else {
    return node.color;
  }
};

RnBtree.prototype.setColor = function (color, node) {
  node = node || this;
  if (node !== null) {
    node.color = color;
  }
};

RnBtree.prototype.case1 = function (n) {
  if (n.parent === null) {
    n.setColor('black');
  }
};

RnBtree.prototype.case2 = function (n) {
  if (n.getColor(n.parent) === 'black') {
    return true;
  } else {
    return false;
  }
};

RnBtree.prototype.case3 = function (n) {
  var parent = n.parent;
  var grandParent = n.parent.parent;
  if (parent.side) { 
    var uncle = n.parent.parent.left;
  } else {
    var uncle = n.parent.parent.right;
  }
  if (RnB.getColor(parent) === 'red' && RnB.getColor(uncle) === 'red') {
    RnB.setColor('black', parent);
    RnB.setColor('black', uncle);
    checkCases(grandParent);
  }
};

RnBtree.prototype.case4 = function (n) {
  debugger;
  var parent = n.parent;
  if (parent.side) { 
    var uncle = n.parent.parent.left;
  } else {
    var uncle = n.parent.parent.right;
  }
  var grandParent = n.parent.parent;
  if (n.side && !n.parent.side) {
    if (RnB.getColor(parent) === 'red' && RnB.getColor(uncle) === 'black') {
      n.side = n.parent.side;
      n.left = n.parent;
      n.parent = n.parent.parent;
      n.left.parent = n;
      n.left.side = 0;
      n.left.right = null;
      if (n.side) { 
        n.parent.right = n; 
      } else {
        n.parent.left = n;
      }
    }
  }
  RnB.case5(n.left);
};

RnBtree.prototype.case5 = function (n) {
  var parent = n.parent;
  if (parent.side) { 
    var uncle = n.parent.parent.left;
  } else {
    var uncle = n.parent.parent.right;
  }
  var grandParent = n.parent.parent;
  if (!n.side && n.parent.side) {
    if (RnB.getColor(parent) === 'red' && RnB.getColor(uncle) === 'black') {
      n.side = n.parent.side;
      n.left = n.parent;
      n.parent = n.parent.parent;
      n.left.parent = n;
      n.left.side = 0;
      n.left.right = null;
      if (n.side) { 
        n.parent.right = n; 
      } else {
        n.parent.left = n;
      }
    }
  }
};

RnBtree.prototype.checkCases = function (n) {
  if (n.parent.parent !== null) {
    RnB.case1(n);
    if (!RnB.case2(n)) {
      RnB.case3(n);
      RnB.case4(n);
      RnB.case5(n);
    }
  }
};

RnBtree.prototype.insert = function (value) {
  var check = function (tree) {
    if (tree !== null) {
      if (value < tree.value) {
        if (tree.left === null) {
          var graft = new RnBtree(value, 0, tree);
          tree.left = graft;
          RnB.checkCases(graft);
        } else {
          check(tree.left);
        }
      } else if (value > tree.value) {
        if (tree.right === null) {
          var graft = new RnBtree(value, 1, tree);
          tree.right = graft;
          RnB.checkCases(graft);
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

RnBtree.prototype._insert = function (node, target) {

};