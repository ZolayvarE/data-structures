
var HashTable = function() {
  this._limit = 8;
  this._tupleCount = 0;
  this._storage = LimitedArray(this._limit);
};

HashTable.prototype.insert = function(k, v) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  this._storage[index] = this._storage[index] || []; 
  var bucket = this._storage[index];
  var tuple = [k, v];
  var found = _.reduce(bucket, function (memo, x) {
    if (memo === true) { return memo; }
    if (x[0] === k) {
      x[1] = v;
      return memo = true;
    }
  }, false);

  if (!found) {
    this._storage[index].push(tuple);
    this.tupleCount++;
  }
};

HashTable.prototype.retrieve = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage[index];
  if (bucket.length === 0 || bucket === undefined) { return undefined; }
  if (bucket.length === 1) {
    return bucket[0][1];
  } else if (bucket.length >= 2) {
    return _.reduce(bucket, function (memo, x) {
      if (memo !== undefined) { return memo; }
      if (x[0] === k) { return memo = x[1]; }
    }, undefined);
  }
};

HashTable.prototype.remove = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage[index];
  var temp;
  if (bucket.length === 0 || bucket === undefined) { return undefined; }
  if (bucket.length === 1) {
    var temp = bucket[0][1];
    this._storage[index] = [];
  } else if (bucket.length >= 2) {
    var bucketIndex;
    var temp = _.reduce(bucket, function (memo, x) {
      if (memo !== undefined) { return memo; }
      if (x[0] === k) {
        bucketIndex = bucket.indexOf(x);        
        return memo = x[0]; 
      }
    }, undefined);

    this._storage[index].splice(bucketIndex, 1);
  }
  this.tupleCount--;
  return temp;
};

HashTable.prototype.double = function () {

};

HashTable.prototype.halve = function () {

};



/*
 * Complexity: What is the time complexity of the above functions?
 */


