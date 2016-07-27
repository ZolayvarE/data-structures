var Queue = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var returnObj = Object.create(queueMethods);
  returnObj.storage = {};

  return returnObj;
};

var queueMethods = {
  enqueue: function (input) {
    var highestIndex = function (old) {
      var indexArray = Object.keys(old.storage);
      if (indexArray.length === 0) { return 0; }
      return Math.max.apply(null, indexArray);
    };
    var index = highestIndex(this) + 1;
    this.storage[index] = input;
  },

  dequeue: function () {
    var lowestIndex = function (old) {
      var indexArray = Object.keys(old.storage);
      return Math.min.apply(null, indexArray);
    };
    var index = lowestIndex(this);
    var temp = this.storage[index];
    delete this.storage[index];
    return temp;
  },

  size: function () { return Object.keys(this.storage).length; }
};


