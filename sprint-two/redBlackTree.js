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
  this.case1(this);
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
  if (node === undefined) { node = this; }
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
  if (RnB.getColor(n.parent) === 'black') {
    return true;
  } else {
    return false;
  }
};

RnBtree.prototype.grabRoot = function (oldRoot) {
  oldRoot = oldRoot.parent;
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
    RnB.checkCases(grandParent);
  }
};

RnBtree.prototype.case4 = function (n) {
  var parent = n.parent;
  var grandParent = n.parent.parent;
  if (parent.side) {
    var uncle = grandParent.left;
  } else {
    var uncle = grandParent.right;
  }
  if (RnB.getColor(uncle) === 'black' && RnB.getColor(parent) === 'red') {
    if (parent.side === 1 && n.side === 0) {
      RnB.rotateRight(n);
      RnB.checkCases(n.right);
    } else if (parent.side === 0 && n.side === 1) {
      RnB.rotateLeft(n);
      RnB.checkCases(n.left);
    }
  }
};

RnBtree.prototype.case5 = function (n) {
  if (n.parent !== null && n.parent.parent !== null) {
    var parent = n.parent;
    var grandParent = n.parent.parent;
    if (parent.side) {
      var uncle = grandParent.left;
    } else {
      var uncle = grandParent.right;
    }
    if (RnB.getColor(uncle) === 'black' && RnB.getColor(parent) === 'red') {
      if (parent.side === 1 && n.side === 1) {
        RnB.rotateLeft(parent);
        grandParent.setColor('red');
        RnB.checkCases(parent);
      } else if (parent.side === 0 && n.side === 0) {
        RnB.rotateRight(parent);
        grandParent.setColor('red');
        RnB.checkCases(parent);
      }
    }
  }
};

RnBtree.prototype.checkCases = function (n) {
  RnB.case1(n);
  if (n.parent !== null && n.parent.parent !== null) {
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

RnBtree.prototype.rotateLeft = function (node) {
  var savedLeft = node.left;
  var parent = node.parent;
  var grandParent = node.parent.parent;

  node.side = node.parent.side;
  node.left = node.parent;
  node.parent = node.parent.parent;
  node.left.side = 0;
  node.left.right = savedLeft;
  node.left.parent = node;
  if (node.parent !== null) {
    if (node.side) {
      node.parent.right = node;
    } else {
      node.parent.left = node;
    }
  }
};

RnBtree.prototype.extend = function (obj1, obj2) {
  if (obj1 === null) { obj1 = {}; }
  if (obj2 === null) { return obj1 = null; }
  for (var item in obj1) {
    obj1[item] = obj2[item];
  }
};

RnBtree.prototype.rotateRight = function (node) {
  var savedRight = node.right;
  node.side = node.parent.side;
  node.right = node.parent;
  node.parent = node.parent.parent;
  node.right.side = 1;
  node.right.left = savedRight;
  node.right.parent = node;
  if (node.parent !== null) {
    if (node.side) {
      node.parent.right = node;
    } else {
      node.parent.left = node;
    }
  }
};