function countWords(str) {
  // i need to return a obj with key value pairs
  let result = {};
  let arr = str.split(' ');
  for (let i = 0; i < arr.length; i++) {
    if (Object.keys(result).includes(arr[i])) {
      result[arr[i]]++;
    } else {
      result[arr[i]] = 1;
    }
  }
  return result;
}

var output = countWords('ask a bunch get a bunch');
console.log(output); // --> {ask: 1, a: 2, bunch: 2, get: 1}

console.log(countWords('The enemy of my enemy is my friend'));
