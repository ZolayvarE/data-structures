var Stack = function() {
  var someInstance = {};

  // Use an object with numeric keys to store values
  var storage = {};

  // Implement the methods below
  someInstance.push = function(value) {
    var timeStamp = new Date;
    timeStamp = Number(timeStamp);

    var add = function (value) {
      if (storage[timeStamp] === undefined) {
        storage[timeStamp] = value;
      } else {
        timeStamp += 0.1;
        add(value);
      }
    }

    add(value);
  };

  someInstance.pop = function() {
    var removed = storage[someInstance.first()];
    delete storage[someInstance.first()];
    return removed;
  };

  someInstance.first = function () {
    var firstKey = someInstance.keys().sort(function (a,b) { 
      return a < b })[0];
    return JSON.stringify(firstKey);
  };

  someInstance.keys = function() {
    var allKeys = Object.keys(storage);
    for (var i = 0 ; i < allKeys.length ; i++) {
      allKeys[i] = JSON.parse(allKeys[i]);
    }
    return allKeys;
  };

  someInstance.size = function () {
    return Object.keys(storage).length;
  }

  return someInstance;
};
