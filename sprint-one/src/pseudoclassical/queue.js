var Queue = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  this.storage = {};
};

Queue.prototype.enqueue = function(input) {
  var indexHighest = function(old) {
    var indexArray = Object.keys(old.storage);
    if (indexArray.length === 0) { return 0; }
    return Math.max.apply(null, indexArray);
  };

  var index = indexHighest(this) + 1;
  this.storage[index] = input;
};

Queue.prototype.dequeue = function() {
  var indexLowest = function(old) {
    var indexArray = Object.keys(old.storage);
    if (indexArray.length === 0) { return 0; }
    return Math.min.apply(null, indexArray);
  };

  var index = indexLowest(this);
  var temp = this.storage[index];
  delete this.storage[index];
  return temp;
};

Queue.prototype.size = function() {
  return Object.keys(this.storage).length;
};