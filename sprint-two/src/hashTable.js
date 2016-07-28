
var HashTable = function(size) {
  this._limit = size || 8;
  this._tuppleCount = 0;
  this._storage = LimitedArray(this._limit);
};

HashTable.prototype.insert = function(k, v) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  this._storage[index] = this._storage[index] || []; 
  var bucket = this._storage[index];
  var tupple = [k, v];
  var found = _.reduce(bucket, function (memo, x) {
    if (memo === true) { return memo; }
    if (x[0] === k) {
      x[1] = v;
      this.tuppleCount++;
      return memo = true;
    }
  }, false);

  if (!found) {
    this._storage[index].push(tupple);
    this.tuppleCount++;
  }

  var usageRatio = function () {
    return this.tuppleCount/size;
  }

  if (this.tuppleCount)
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
  var temp, bucketIndex;
  if (bucket.length === 0 || bucket === undefined) { return undefined; }
  if (bucket.length === 1) {
    var temp = bucket[0][1];
    this._storage[index] = [];
  } else if (bucket.length >= 2) {
    var temp = _.reduce(bucket, function (memo, x) {
      if (memo !== undefined) { return memo; }
      if (x[0] === k) {
        bucketIndex = bucket.indexOf(x);        
        return memo = x[0]; 
      }
    }, undefined);

    this._storage[index].splice(bucketIndex, 1);
  }
  this.tuppleCount--;
  return temp;
};

HashTable.prototype.rehash = function (oldHash, sizeModifier) {
  var keyValueArray = _.reduce(this._storage, function (memo, x) {
    if (x.length === 0) { return memo; }
    _.each(x, function (y) { memo.push([y[0], y[1]]); });
    return memo;
  }, []);

  var destination = new HashTable(this._limit * sizeModifier);

  var tuppleEater = function () {
    if (tuppleArray.length !== 0) {
      var tupple = keyValueArray.shift();
      destination.insert(tupple[0], tupple[1]);
    }
  };

  tuppleEater(keyValueArray);

  oldHash = destination;
};

HashTable.prototype.double = function (oldHash) {
  return oldHash.rehash(oldHash, 2);
};

HashTable.prototype.halve = function (oldHash) {
  return oldHash.rehash(oldHash, 0.5);
};



/*
 * Complexity: What is the time complexity of the above functions?
 */


