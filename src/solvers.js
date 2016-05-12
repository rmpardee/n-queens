/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

// must create a global variable so that I can access it in the Board constructor
// given an array of indices, build me a board with each index as a 1 for each row, and zeroes everywhere else
var createABoard = function(indicesArray) {
    // console.log("got to create a board fn: ");
    var board = [];
    // save the original length of the array to use in our loops
    var n = indicesArray.length;
    for (var i = 0; i < n; i++) {
      // each loop start with an empty row array
      var rowArray = [];
      // each loop, shift the first one off from the index array
      var indexToPlacePiece = indicesArray.shift();
      // loop n times, pushing a 0 at each position, except a 1 at the popped off index
      for (var j = 0; j < n; j++) {
        (j === indexToPlacePiece) ? rowArray.push(1) : rowArray.push(0);
      };
      // push the row array we've built into the solution array
      board.push(rowArray);
    }
    // return the solution array
    // console.log("board inside create fn: ", board);
    return board;
  }

window.allArrayPermuations = function(n) {
  // create an array of all indices. we will be counting the number of possible permutations of this array.
  var indices = [];
  for (var i = 0; i < n; i++) {
    indices.push(i);
  }
  // create a variable to store each permutation
  var perm = [];
  // create a variable to hold all the permutation solutions
  var allPermutations = [];

  // create a recursive subroutine to build up each permutation
  var createAllPerms = function(array) {
    // loop through the input array
    for (var i = 0; i < array.length; i++) {
      // remove the next (ith) item in the array - we'll use this as the first number in our perm array
      var current = array.splice(i, 1)[0];
      // push the current number we're dealing with to the perm
      perm.push(current);
      // base case: if the array is empty (I've dealt with each number)
      if (array.length === 0) {
        // push A COPY of the perm array into the results array
        allPermutations.push(perm.slice());
      }
      // recursive case:
      createAllPerms(array);
      // add that current number back in
      array.splice(i, 0, current);
      // remove the last item from the perm array
      perm.pop();
    }
  }
  // call the subroutine on our indices array
  createAllPerms(indices);
  // return the array containing all permutations
  return allPermutations;
}


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {
  // // an empty array we'll add the n row arrays to and return
  // var solution = [];
  // // create an array of numbers zero through n-1 (all the index options in a given row)
  // var indices = [];
  // for (var i = 0; i < n; i++) {
  //   indices.push(i);
  // }
  // // shuffle that index array
  // indices = _.shuffle(indices);
  // // loop n times
  // for (var i = 0; i < n; i++) {
  //   // each loop start with an empty row array
  //   var rowArray = [];
  //   // each loop, pop the last one off from the shuffled index array
  //   var indexToPlaceRook = indices.pop();
  //   // loop n times, pushing a 0 at each position, except a 1 at the popped off index
  //   for (var j = 0; j < n; j++) {
  //     (j === indexToPlaceRook) ? rowArray.push(1) : rowArray.push(0);
  //   };
  //   // push the row array we've built into the solution array
  //   solution.push(rowArray);
  // }
  // // return the solution array
  // return solution;

  // create all permuations
  var allOptions = allArrayPermuations(n);
  // return one at random
  var aSolution = allOptions[Math.floor(Math.random() * allOptions.length)];
  // return a built board using that index array
  return createABoard(aSolution);
};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // create an array of all indices. we will be counting the number of possible permutations of this array.
  // var indices = [];
  // for (var i = 0; i < n; i++) {
  //   indices.push(i);
  // }
  // // create a variable to store each permutation
  // var perm = [];
  // create a recursive subroutine to build up each permutation
  

  // the number of solutions is the same as the number of unique permutations of the indices array from findNRooksSolution, which is clearly just the factorial
  // create a recursive subroutine to get the factorial
  // var factorial = function(num) {
  //   if (num === 1) {
  //     return 1;
  //   } else {
  //     return (num * factorial(num-1));
  //   }
  // }
  // var solutionCount = factorial(n);
  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);

  // create an array of all possible permutations of indices
  var allOptions = allArrayPermuations(n);
  // as all permutations are valid with rooks, we can leave as is (for queens we'll have to eliminate the ones that don't work first)

  // return the number of options in the all permutations array
  return allOptions.length;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // create all the possible indices array options
  var allOptions = allArrayPermuations(n);

  testing:
  var plainBoard = new Board({'n': 4});
  console.log("plainBoard: ", plainBoard);
  console.log("plainBoard rows: ", plainBoard.rows());

  var testBoard = new Board({'indicesArray': [0,1,2,3], 'n': 4});
  console.log("testBoard: ", testBoard);
  console.log("testBoard rows: ", testBoard.rows());

  // loop through each permutation
  for (var i = 0; i < 3; i++) {
    // build a board for each permutation
    var board = createABoard(allOptions[i]);
    // check if there are any queen conflicts
    var goodToGo = Board.prototype.hasAnyQueenConflicts;
    console.log("whether board passes queen test or not: ", goodToGo);
  };



  // define an empty solution array which we'll build and return
  var solution = [];
  // create an array of indices
  var indices = [];
  for (var z = 0; z < n; z++) {
    indices.push(z);
  }
  // indices = [3,1,2,0];
  // shuffle that index array
  // if (indices.length <= 1) {
  //   while (indices[0] === 0) {
  //     indices = _.shuffle(indices);
  //   }
  // }
  // subroutine making the first index not zero
  var shuffleWithoutLeadZero = function(array) {
    var halfLength = Math.floor(array.length / 2);
    var middleValue = array[halfLength];
    array[halfLength] = 0;
    array[0] = middleValue;

    if(array.length > 5) {
      var nextMidValue = array[halfLength + 1];
      array[halfLength + 1] = 1;
      array[1] = nextMidValue;
    }

    if(array.length > 8) {
      var nextNextMidValue = array[halfLength + 2];
      array[halfLength + 2] = 2;
      array[2] = nexNextMidValue;
    }
    // array = _.shuffle(array);
    // base case
    if (array[0] !== 0 && array[0] !== array.length - 1 /*&& array[1] !== 0*/ /*&& array[1] !== array.length - 1*/) {
      return array;
    // recursive case
    } else {
      return shuffleWithoutLeadZero(array);
    }
  };

  // console.log('indices before initial shuffle: ', indices);
  

  if (indices.length > 1) {
    indices = shuffleWithoutLeadZero(indices);
  }

  // console.log('indices post initial shuffle: ', indices);

  
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
  for (var i = 0; i < n; i++) {
    
    // console.log('outer index of indices array were checking: ', i);
  
    // loop through the remaining items in the indices array until you find a safe one to use
    for (var j = 0; j < indices.length; j++) {
      // console.log('inner index of indices array were checking: ', j);
      // console.log('indices array at beginning of loop: ', indices);
      
      // get the index
      var hopefulNextIndex = indices[j];
      // console.log('hopefulNextIndex: ', hopefulNextIndex);
      
      // check if it works
      var indexIsSafe = true;
        var howManyRowsBack = 1;
      // loop through the previous indices you've already chose and make sure this index will work with them
      for (var k = shuffledIndices.length - 1; k >= 0 ; k--) {
        // console.log('shuffled index were checking: (value)', shuffledIndices[k]);
        // console.log('how many rows back: ', howManyRowsBack);
        
        
        if (hopefulNextIndex === shuffledIndices[k] + howManyRowsBack || hopefulNextIndex === shuffledIndices[k] - howManyRowsBack) {
          indexIsSafe = false;
          // console.log('breaking at previous index issue: ', k);
          
          break;
        } else {
          howManyRowsBack++;
        }
        // if it's not false, it will keep checking back and back through the existing indices
      }
        // console.log('indexIsSafe: ', indexIsSafe);
      // if it is safe
      if (indexIsSafe) {
        // push it into the new shuffled array
        shuffledIndices.push(hopefulNextIndex);
        // remove that index from the indices array
        indices.splice(j, 1);
        // stop the loop from 
        // console.log('indices post splice: ', indices);
        
        break;
      } else {
        // console.log('not safe: ' );
        
      }
      // if it is not safe, it will keep looping through to the next indice
    };
    // NOTE: need to address if no further indices will work
    // console.log('shuffledIndices: ', shuffledIndices);
    
}
    // reverse the shuffled array (since we will be using it backwards)
    shuffledIndices.reverse();
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
