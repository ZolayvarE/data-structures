var redBlackRoot = function (value) {
  return new RnBtree(value, null, null);
};

var RnBtree = function (value, side, parent) {
  this.value = value;
  this.color = 'red';
  this.left = { parent: this, value: null, color: 'black', side: 0 };
  this.right = { parent: this, value: null, color: 'black', side: 1 };
  this.parent = parent;
  this.side = side;
  this.case1(this);
};

RnBtree.prototype.getSibling = function () {
  if (this.side) {
    return this.parent.left;
  } else {
    return this.parent.right;
  }
};

var RnB = RnBtree.prototype;

RnBtree.prototype.case1 = function (n) {
  if (n.parent === null) {
    n.color = 'black';
  }
};

RnBtree.prototype.case2 = function (n) {
  if (n.parent.color === 'black') {
    return true;
  } else {
    return false;
  }
};

RnBtree.prototype.case3 = function (n) {
  // debugger;
  if (n.parent !== null && n.parent.parent !== null) {
    var parent = n.parent;
    var grandParent = n.parent.parent;
    var uncle = parent.getSibling();
    if (parent.color === 'red' && uncle.color === 'red') {
      parent.color = 'black';
      uncle.color = 'black';
      grandParent.color = 'red';
      RnB.checkCases(grandParent);
    }
  }
};

RnBtree.prototype.case4 = function (n) {
  if (n.parent !== null && n.parent.parent !== null) {
    var p;
    var parent = n.parent;
    var grandParent = n.parent.parent;
    var uncle = parent.getSibling();
    if (parent.color === 'red' && uncle.color === 'black') {
      if (n.side === 1 && parent.side === 0) {
        p = RnB.rotateLeft(n);
        RnB.checkCases(p.left);
      } else if (n.side === 0 && parent.side === 1) {
        p = RnB.rotateRight(n);
        RnB.checkCases(p.right);
      }
    }
  }

  return n = p || n;
};

RnBtree.prototype.case5 = function (n) {
  if (n.parent !== null && n.parent.parent !== null) {
    var p;
    var parent = n.parent;
    var grandparent = n.parent.parent;
    var uncle = parent.getSibling();
    if (parent.color === 'red' && uncle.color === 'black') {
      if (n.side === 1 && parent.side === 1) {
        p = RnB.rotateLeft(n.parent);
        p.color = 'black';
        p.left.color = 'red';
        if (p.parent !== null) {
          RnB.checkCases(p.parent);
        }
      } else if (n.side === 0 && parent.side === 0) {
        p = RnB.rotateRight(n.parent);
        p.color = 'black';
        p.right.color = 'red';
        if (p.parent !== null) {
          RnB.checkCases(p.parent);
        }
      }
    }
  }

  return n;
};

RnBtree.prototype.checkCases = function (n) {
  RnB.case1(n);
  if (n.parent !== null && n.parent.parent !== null) {
    if (!RnB.case2(n)) {
      RnB.case3(n);
      n = RnB.case4(n);
      RnB.case5(n);
    }
  }
};

RnBtree.prototype.insert = function (value) {
  var check = function (tree) {
    if (tree.value !== null) {
      if (value < tree.value) {
        if (tree.left.value === null) {
          var graft = new RnBtree(value, 0, tree);
          tree.left = graft;
          RnB.checkCases(graft);
        } else {
          check(tree.left);
        }
      } else if (value > tree.value) {
        if (tree.right.value === null) {
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
    if (tree.value === null) { return; }
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
  var savedNode = RnB.extend(new RnBtree(null, null, null), node);
  var savedParent = RnB.extend(new RnBtree(null, null, null), node.parent);
  var savedLeft = RnB.extend(new RnBtree(null, null, null), node.left);
  savedNode.parent = node.parent.parent;
  savedNode.side = node.parent.side;
  // Pair;
  savedParent.right = savedLeft;
  savedLeft.parent = savedParent;
  savedParent.side = 0;
  // Pair;
  savedNode.left = savedParent;
  savedParent.parent = node.parent;
  savedNode.right.parent = node.parent;
  savedParent.left.parent = savedParent;
  RnB.extend(node.parent, savedNode);
  var newNode = node.parent;
  delete node;
  return newNode;
};

RnBtree.prototype.rotateRight = function (node) {
  var savedNode = RnB.extend(new RnBtree(null, null, null), node);
  var savedParent = RnB.extend(new RnBtree(null, null, null), node.parent);
  var savedRight = RnB.extend(new RnBtree(null, null, null), node.right);
  savedNode.parent = node.parent.parent;
  savedNode.side = node.parent.side;
  // Pair;
  savedParent.left = savedRight;
  savedRight.parent = savedParent;
  savedParent.side = 1;
  // Pair;
  savedNode.right = savedParent;
  savedParent.parent = node.parent;
  savedNode.left.parent = node.parent;
  savedParent.right.parent = savedParent;
  RnB.extend(node.parent, savedNode);
  var newNode = node.parent;
  delete node;
  return newNode;
};

RnBtree.prototype.extend = function (obj1, obj2) {
  if (obj1 === null) { obj1 = new RnBtree(null, null, null); }
  if (obj2 === null) { return obj1 = null; }
  var items = ['value', 'color', 'left', 'right', 'parent', 'side'];
  for (var i = 0; i < items.length; i++) { 
    obj1[items[i]] = obj2[items[i]];
  }  

  return obj1;
};