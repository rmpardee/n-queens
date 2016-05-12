/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  // an empty array we'll add the n row arrays to and return
  var solution = [];
  // create an array of numbers zero through n-1 (all the index options in a given row)
  var indices = [];
  for (var i = 0; i < n; i++) {
    indices.push(i);
  }
  // shuffle that index array
  indices = _.shuffle(indices);
  // loop n times
  for (var i = 0; i < n; i++) {
    // each loop start with an empty row array
    var rowArray = [];
    // each loop, pop the last one off from the shuffled index array
    var indexToPlaceRook = indices.pop();
    // loop n times, pushing a 0 at each position, except a 1 at the popped off index
    for (var j = 0; j < n; j++) {
      (j === indexToPlaceRook) ? rowArray.push(1) : rowArray.push(0);
    };
    // push the row array we've built into the solution array
    solution.push(rowArray);
  }
  // return the solution array
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // // create a counting variable we'll build and return
  // var solutionCount;
  // // create an array of all indices. we will be counting the number of possible permutations of this array.
  // var indices = [];
  // for (var i = 0; i < n; i++) {
  //   indices.push(i);
  // }
  // // create a variable to store each permutation
  // var perm = [];
  // // create a recursive subroutine to build up each permutation

  // the number of solutions is the same as the number of unique permutations of the indices array from findNRooksSolution, which is clearly just the factorial
  // create a recursive subroutine to get the factorial
  var factorial = function(num) {
    if (num === 1) {
      return 1;
    } else {
      return (num * factorial(num-1));
    }
  }
  var solutionCount = factorial(n);
  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // define an empty solution array which we'll build and return
  var solution = [];
  // create an array of indices
  var indices = [];
  for (var z = 0; z < n; z++) {
    indices.push(z);
  }
  // shuffle that index array
  indices = _.shuffle(indices);
  // *carefully* shuffle the array into an order that should work
  var shuffledIndices = [];

  // grab a random number
  // var randomIndex = function(array) {
  //   return Math.floor(Math.random * array.length);
  // }
  // // 1st number: push that index
  // // get the index
  // var hopefulNextIndex = randomIndex();
  // // check if it works: 1st so no checks needed
  // // push it into the new shuffled array
  // shuffledIndices.push(hopefulNextIndex);
  // // remove that index from the indices array
  // indices.splice(hopefulNextIndex, 1);

  // 2nd number: 
  // loop through the remaining items in the indices array
  // for (var j = 0; j < indices.length; j++) {
  //   // get the index
  //   var hopefulNextIndex = indices[j];
  //   // check if it works: 2nd so just need to check the 1st
  //   var indexIsSafe = hopefulNextIndex !== shuffledIndices[0] + 1 && hopefulNextIndex !== shuffledIndices[0] - 1;
  //   // if it is safe
  //   if (indexIsSafe) {
  //     // push it into the new shuffled array
  //     shuffledIndices.push(hopefulNextIndex);
  //     // remove that index from the indices array
  //     indices.splice(hopefulNextIndex, 1);
  //     // stop the loop from running
  //     break;
  //   }
  // };
  // NOTE: need to address if no further indices will work

  // loop through the indices array
  // for (var i = 0; i < indices.length; i++) {

  
    // loop through the remaining items in the indices array until you find a safe one to use
    for (var j = 0; j < indices.length; j++) {
      // get the index
      var hopefulNextIndex = indices[j];
      // check if it works
      var indexIsSafe = true;
      // loop through the previous indices you've already chose and make sure this index will work with them
      for (var k = 0; k < shuffledIndices.length; k++) {
        if (hopefulNextIndex === shuffledIndices[k] + (k+1) || hopefulNextIndex === shuffledIndices[k] - (k+1)) {
          indexIsSafe = false;
          break;
        }
        // if it's not false, it will keep checking back and back through the existing indices
      };
      // if it is safe
      if (indexIsSafe) {
        // push it into the new shuffled array
        shuffledIndices.push(hopefulNextIndex);
        // remove that index from the indices array
        indices.splice(hopefulNextIndex, 1);
        // stop the loop from running
        break;
      }
      // if it is not safe, it will keep looping through to the next indice
    };
    // NOTE: need to address if no further indices will work


    // use the shuffled indices array as your template to build up each row, and push it to the solutions array
    // loop n times
    for (var m = 0; m < n; m++) {
      // each loop start with an empty row array
      var rowArray = [];
      // each loop, pop the last one off from the shuffled index array
      var indexToPlaceRook = shuffledIndices.pop();
      // loop n times, pushing a 0 at each position, except a 1 at the popped off index
      for (var p = 0; p < n; p++) {
        (p === indexToPlaceRook) ? rowArray.push(1) : rowArray.push(0);
      };
      // push the row array we've built into the solution array
      solution.push(rowArray);
    }

  
  // return the solution array we've built
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
