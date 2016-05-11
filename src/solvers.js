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
  var solution = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
