// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        // console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        // console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        // console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('indicesArray')) {
        this.set(createABoard(this.get('indicesArray')));
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // save the rows in a variable
      var arrayOfRows = this.rows();
      // reduce the row array at that index to the sum of its values
      var rowSum = _.reduce(arrayOfRows[rowIndex], function(sum, aBinary){
          return sum + aBinary;
        }, 0);
      // if the sum is greater than 1, we have a conflict (return true)
      return rowSum > 1 ? true : false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // save the rows in a variable
      var arrayOfRows = this.rows();
      // loop through each row array, passing each index into hasRowConflictAt
      for (var i = 0; i < arrayOfRows.length; i++) {
        // if we ever find a conflict in a row, just stop and return true
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      // if you get through and didn't find any conflicts, return false
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // save the rows in a variable
      var arrayOfRows = this.rows();
      // create a variable to keep the sum of the items at that column index
      var rowSum = 0;
      // loop through each row array
      for (var i = 0; i < arrayOfRows.length; i++) {
         // add the value at the column index in each row to the sum variable
         rowSum += arrayOfRows[i][colIndex];
      }
      // if the sum is greater than 1, we have a conflict (return true)
      return rowSum > 1 ? true : false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // save the rows in a variable
      var arrayOfRows = this.rows();
      // pass each column index into hasColConflictAt. Since the board is a square, the number of column indices is conveniently the same as the number of row indices, so we can just loop for the length of arrayOfRows
      for (var i = 0; i < arrayOfRows.length; i++) {
        // if we ever find a conflict in a column, just stop and return true
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      // if you get through and didn't find any conflicts, return false
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // save the rows in a variable
      var arrayOfRows = this.rows();
      // create a variable to keep the sum of the items at that diagonal index
      var maxDiagSum = 0;
      // create a variable which we'll increment each round to keep track of which column index to check within each row
      var diagIndex = majorDiagonalColumnIndexAtFirstRow;
      // loop through each row array
      for (var i = 0; i < arrayOfRows.length; i++) {
        // if the diag index is still less than zero (there is no actual item at that index)
        if (diagIndex < 0) {
          // just increment the diag index and loop again
          diagIndex++;
        }
        // if the diag index is greater than zero but still less than the length of the row
        else if (diagIndex < arrayOfRows.length - 1) {
          // add the value at the diag index in each row to the sum variable, then increment the diag index for the next loop
          maxDiagSum += arrayOfRows[i][diagIndex++];
        }
        // if the diag index gets greater than the highest column index, stop looping, we've reached the end of the diagonal
        else {
          break;
        }
      }
      // if the sum is greater than 1, we have a conflict (return true)
      return maxDiagSum > 1 ? true : false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // save the rows in a variable
      var arrayOfRows = this.rows();
      // the number of diagonal indices in a square board
      // pass each diagonal index into hasMinorDiagonalConflictAt. Since we're checking the major diagonals, the diagonal indices will be the length of the row array on either size of zero (since the hard rows to check would extend into negative indices)
      for (var i = 1 - arrayOfRows.length; i < arrayOfRows.length; i++) {
        // if we ever find a conflict in a column, just stop and return true
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      // if you get through and didn't find any conflicts, return false
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // save the rows in a variable
      var arrayOfRows = this.rows();
      // create a variable to keep the sum of the items at that diagonal index
      var minDiagSum = 0;
      // create a variable which we'll decrement each round to keep track of which column index to check within each row
      var diagIndex = minorDiagonalColumnIndexAtFirstRow;
      // loop through each row array
      for (var i = 0; i < arrayOfRows.length; i++) {
        // if the diag index is still higher than the greatest column index (there is no actual item at that index)
        if (diagIndex > arrayOfRows.length - 1) {
          // just decrement the diag index and loop again
          diagIndex--;
        }
        // if the diag index is less than the length of the row but still zero or higher
        else if (diagIndex >= 0) {
          // add the value at the diag index in each row to the sum variable, then decrement the diag index for the next loop
          minDiagSum += arrayOfRows[i][diagIndex--];
        }
        // if the diag index gets lower than zero, stop looping, we've reached the end of the diagonal
        else {
          break;
        }
      }
      // if the sum is greater than 1, we have a conflict (return true)
      return minDiagSum > 1 ? true : false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      
      // save the rows in a variable
      var arrayOfRows = this.rows();
      // the number of diagonal indices in a square board. Since we're checking minor, the diagonal indices will be the length of the array on either side of the highest index, or just zero through one less than twice the length.
      var numOfDiagIndices = (arrayOfRows.length * 2) - 1;
      // pass each diagonal index into hasMinorDiagonalConflictAt.
      for (var i = 0; i < numOfDiagIndices; i++) {
        // if we ever find a conflict in a column, just stop and return true
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      // if you get through and didn't find any conflicts, return false
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    var board = _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
    console.log("board inside matrix fn: ", board);
    return board;
  };


}());
  
