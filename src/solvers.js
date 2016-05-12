/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// created this helper function to allow me to pass in a number, create an array with numbers 0 -> n, and return an array of all the permutations of that array
window.allArrayPermuations = function(n) {
  // cover the zero case
  if (n === 0) {
    return [[0]];
  }
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
  // create all permuations
  var allOptions = allArrayPermuations(n);
  // return one at random
  var aSolution = allOptions[Math.floor(Math.random() * allOptions.length)];
  // return a built board using that index 
  return createABoard(aSolution);
};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // create an array of all possible permutations of indices
  var allOptions = allArrayPermuations(n);
  // as all permutations are valid with rooks, we can leave as is (for queens we'll have to eliminate the ones that don't work first)
  // return the number of options in the all permutations array
  return allOptions.length;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // cover the zero case
  if (n === 0) {
    return [];
  } 
  // create all the possible indices array options
  var allOptions = allArrayPermuations(n);

  // loop through each permutation
  for (var i = 0; i < allOptions.length; i++) {
    // build a board for each permutation
    var indicesBoard = new Board({'indicesArray': allOptions[i], 'n': n});
    // check if there are any queen conflicts
    var goodToGo = !indicesBoard.hasAnyQueensConflicts();
    // if there are no conflicts
    if (goodToGo) {
      // return that board or rows
      return indicesBoard.rows();
    }
  }
  // if it never finds one, return an empty matrix of n size
  return makeEmptyMatrix(n);
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  // start the solution count at zero
  var solutionCount = 0;

  // create all the possible indices array options
  var allOptions = allArrayPermuations(n);

  // loop through each permutation
  for (var i = 0; i < allOptions.length; i++) {
    // build a board for each permutation
    var indicesBoard = new Board({'indicesArray': allOptions[i], 'n': n});
    // check if there are any queen conflicts
    var goodToGo = !indicesBoard.hasAnyQueensConflicts();
    // if there aren't any conflicts
    if (goodToGo) {
      // increment the solution counter
      solutionCount++;
    }
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
