var Queue = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var queueObj = {};

  queueObj.storage = {};

  _(queueObj).extend(queueMethods);

  return queueObj;
};

var queueMethods = {
  enqueue: function (value) {
    var highestIndex = function (old) {
      var indexArray = Object.keys(old.storage);
      if (indexArray.length === 0) { return 0; }
      return Math.max.apply(null, indexArray);
    };
    
    var index = highestIndex(this) + 1;

    this.storage[index] = value;
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

  size: function () {
    return Object.keys(this.storage).length;
  }
};


