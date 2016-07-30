var BloomFilter = function (size) {
  this._size = size || 18;
  this._storage = [];
  for (var i = 0; i < this._size; i++) {
    this._storage.push(0);
  }
};

BloomFilter.prototype.add = function (input) {
  var indexArray = [];
  indexArray.push(this.hasher1(input, this._size));
  indexArray.push(this.hasher2(input, this._size));
  indexArray.push(this.hasher3(input, this._size));

  for (var i = 0; i < indexArray.length; i++) {
    this._storage[indexArray[i]] = 1;
  }
};

BloomFilter.prototype.lookUp = function () {

};

BloomFilter.prototype.suspect = function (input) {
  var indexArray = [];
  indexArray.push(this.hasher1(input, this._size));
  indexArray.push(this.hasher2(input, this._size));
  indexArray.push(this.hasher3(input, this._size));
  
  if (this._storage[indexArray[0]] && 
      this._storage[indexArray[1]] && 
      this._storage[indexArray[2]]) {
    return true;
  } else {
    return false;
  }
};

BloomFilter.prototype.hasher1 = function (input, max) {
  var hash = 0;
  for (var i = 0; i < input.length; i++) {
    hash = (hash << 5) + hash + input.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash % max;
};

BloomFilter.prototype.hasher2 = function (string, max) {
  var input = zxc.makeString(string);
  var charProduct = 1;
  for (var i = 0; i < input.length; i++) {
    charProduct *= input.charCodeAt(i);
  }
  return charProduct % max; 
};

BloomFilter.prototype.hasher3 = function (input, max) {
  var string = zxc.makeString(input);
  var charSum = 0;
  for (var i = 0; i < input.length; i++) {
    charSum += string.charCodeAt(i) / 3 + i * 7;
  }
  return Math.floor(charSum % max); 
};

BloomFilter.prototype.makeString = function (input) {
  if (input === undefined) { return 'undefined'; }
  var output = JSON.stringify(input) || input.toString();
  return output;
};

var zxc = BloomFilter.prototype;

BloomFilter.prototype.getFalsePositiveRate = function (n) {
  var testFilter = new BloomFilter;
  var testString = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  var positives = [];
  var falsePositives = 0;
  var testsRun = 0;
  var testSlice;

  var getRandomSlice = function (string) {
    var randIndex1 = Math.floor(Math.random() * string.length);
    var randIndex2 = Math.floor(Math.random() * string.length);
    while (randIndex1 === randIndex2) {
      randIndex2 = Math.floor(Math.random() * string.length);
    }
    return string.slice(Math.min(randIndex1, randIndex2), Math.max(randIndex1, randIndex2));
  };

  for (var i = 0; i < n; i++) {
    positives.push(getRandomSlice.of(testString));
  }

  for (var i = 0; i < positives.length; i++) {
    testFilter.add(positives[i]);
  }

  for (var i = 0; i < 100000; i++) {
    testSlice = getRandomSlice.of(testString);
    if (positives.indexOf(testSlice) !== -1) { 
      i--; testsRun--;
    } else if (testFilter.suspect(testSlice)) {
      falsePositives++;
    }
    testsRun++;
  }

  return console.log('Ran ' + testsRun + ' tests! Got ' + falsePositives + ' false positives!\nThis is a ' + Math.ceil(100 * falsePositives / testsRun) + '% false positive rate.');
};

Function.prototype.of = function (args) {
  return this.apply(null, arguments);
}; 