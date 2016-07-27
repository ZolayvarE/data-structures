var Queue = function() {
  var someInstance = {};

  // Use an object with numeric keys to store values
  var storage = {};

  // Implement the methods below

  someInstance.enqueue = function(value) {
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

  someInstance.dequeue = function() {
    var removed = storage[someInstance.first()];
    delete storage[someInstance.first()];
    return removed;
  };

  someInstance.size = function() {
    return Object.keys(storage).length;
  };

  someInstance.first = function () {
    var allKeys = Object.keys(storage);
    for (var i = 0 ; i < allKeys.length ; i++) {
      allKeys[i] = JSON.parse(allKeys[i]);
    }
    sortedKeys = allKeys.sort(function (a,b) { return b < a });

    var result = JSON.stringify(sortedKeys[0]);
    return result;
  }

  return someInstance;
};
