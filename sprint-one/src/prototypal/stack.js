var Stack = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var returnObject = Object.create(stackMethods);
  returnObject.storage = {};

  return returnObject;
};

var stackMethods = {
  push: function(input) {
    var index = this.size();
    this.storage[index] = input;
  },
  pop: function() {
    var index = this.size() - 1;
    var temp = this.storage[index];
    delete this.storage[index];
    return temp;
  },
  size: function() {
    return Object.keys(this.storage).length;
  }
};


