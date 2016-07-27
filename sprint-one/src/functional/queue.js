var Queue = function() {
  var someInstance = {};

  // Use an object with numeric keys to store values
  var storage = {};

  // Implement the methods below

  someInstance.enqueue = function(value) {

    var highestKey = function () {
      var keyArray = Object.keys(storage);
      if (keyArray.length === 0) { return 0; }
      return Math.max.apply(null, keyArray);
    };

    var key = highestKey() + 1;
    
    var add = function (value) {
      if (storage[key] === undefined) {
        storage[key] = value;
      } else {
        key += 1;
        add(value);
      }
    };

    add(value);
  };

  someInstance.dequeue = function() {
    var lowestKey = function() {
      var keyArray = Object.keys(storage);
      return Math.min.apply(null, keyArray);
    };

    var temp = storage[lowestKey()];
    delete storage[lowestKey()];
    return temp;
  };

  someInstance.size = function() {
    return Object.keys(storage).length;
  };

  someInstance.first = function () {
    
  };

  return someInstance;
};
