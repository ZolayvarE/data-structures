var LinkedList = function() {
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value) {
    var newTail = new Node(value);
    newTail.next = list.tail;
    list.tail = newTail;
    if (list.head === null) {
      list.head = newTail;
    }
  };

  list.removeHead = function() {
    var currentNode = list.tail;
    var previousNode = new Node(null);

    var checkNode = function () {
      if (currentNode.next === null) {
        var temp = list.head.value;
        list.head = previousNode;
        list.head.next = null;
        return temp;
      }
      previousNode = currentNode;
      currentNode = currentNode.next;
      checkNode();
    };

    return checkNode();
  };

  list.contains = function(target) {
    var found = false;

    var currentNode = list.tail;

    var checkNode = function () {
      if (currentNode !== null) {
        if (currentNode.value === target) {
          found = true;
        }
        currentNode = currentNode.next;
        checkNode();
      }
    };

    checkNode();

    return found;
  };

  return list;
};

var Node = function(value) {
  var node = {};

  node.value = value;
  node.next = null;

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
