var LinkedList = function () {
  this.head = null;
  this.tail = null;
};

var Node = function (value, next, previous) {
  this.next = next || null;
  this.previous = previous || null;
  this.value = value;
};

LinkedList.prototype.addToHead = function (value) {
  var node = new Node(value, this.head);
  if (this.head !== null) { this.head.previous = node; }
  this.head = node;
  this.tail = this.tail || node;
};

LinkedList.prototype.addToTail = function (value) {
  var node = new Node(value, null, this.tail);
  if (this.tail !== null) { this.tail.next = node; }
  this.tail = node;
  this.head = this.head || node;
};

LinkedList.prototype.addToTarget = function (value, target) {

};

LinkedList.prototype.removeHead = function () {
  if (this.head !== null) {
    var temp = this.head;
    if (this.head.next) {
      this.head.previous = null;
    }
    this.head = temp.next;
    return temp.value;
  }
};

LinkedList.prototype.removeTail = function () {
  if (this.tail !== null) {
    var temp = this.tail;
    if (this.tail.previous) {
      this.tail.previous.next = null;
    }
    this.tail = temp.previous;
    return temp.value;
  }
};

LinkedList.prototype.contains = function (value) {
  var found = false;

  var check = function (node) {
    if (!node) { return; } 
    if (found === true) { return true; }
    if (node.value === value) { return found = true; }
    check(node.next);
  };

  check(this.head);

  return found;
};