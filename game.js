/**
 * The Game of Life
 * Rules: Cells are either 'alive' or 'dead'
 *      When they are alive, this is represented by coloring the cell black
 *      Live cells stay alive when they have exactly 2 or 3 neighbors,
 *          if they have more they 'die' from overcrowding,
 *          and if they have less they 'die' from loneliness.
 *      A non-live cell becomes alive if it has exactly 3 neighbors.
 * 
 * This game was invented by John Conway, and it creates some cool visuals
 * 
 * @author Alex Robinson
 * October 12, 2019
 */

// get the body of the DOM tree and create an element to hold our grid
const body = document.querySelector('body');
const container = document.createElement('div');
container.style.cssText = 'top: 15px; left: 320px; position: absolute';
body.appendChild(container);

var blackcells = []

// Create a 2D array of 30 x 30 div nodes
var grid = []
var i, j;
for (i = 0; i < 30; i++) {
    grid[i] = []
    const row = document.createElement('div');
    row.style.display = 'inline-block';
    container.appendChild(row);

    for (j = 0; j < 30; j++) {
        grid[i].push(document.createElement('div'));
        curr = grid[i][j];
        curr.class = 'cell'
	    curr.style.cssText = 'border: 1px solid; width: 20px; height: 20px;'
        curr.style.backgroundColor = 'white';

        row.appendChild(curr); 
        curr.onclick = setColor;
    }
}

/** 
 * A function to be used with click on each cell of the grid.
 * The color of a cell turns black when clicked due to this function.
*/
function setColor() {
    this.style.backgroundColor = 'black';

    if (!blackcells.includes(this)) {
        blackcells.push(this)
    }
}

/**
 * updates the grid based on the rules of the game
 */
function updateGrid() {
    var newgrid = []
    var i, j
    for (i = 0; i < 30; i++) {
        for (j = 0; j < 30; j++) {
            var c = getCount(i, j)
            if (blackcells.includes(grid[i][j])) {
                if (c == 2 || c == 3) {
                    newgrid.push([i, j])
                }
            } else {
                if (c == 3) {
                    newgrid.push([i, j])
                }
            }
        }
    }
    clear()

    var k
    for (k = 0; k < newgrid.length; k++) {
        i = newgrid[k][0];
        j = newgrid[k][1];
        blackcells.push(grid[i][j]);
        grid[i][j].style.backgroundColor = 'black';
    }
}

/**
 * returns the number of neighbors of a certain cell 'alive' in the grid
 * i and j the indeces in the grid where we are counting neighbors
 */
function getCount(i, j) {
    var count = 0
    if (i>0 && j>0 && blackcells.includes(grid[i-1][j-1])) count++;
	if (i>0 && blackcells.includes(grid[i-1][j])) count++;
	if (i>0 && j<grid.length-1 && blackcells.includes(grid[i-1][j+1])) count++;
	if (j>0 && blackcells.includes(grid[i][j-1])) count++;
	if (j<grid[0].length-1 && blackcells.includes(grid[i][j+1])) count++;
	if (i<grid.length-1 && j>0 && blackcells.includes(grid[i+1][j-1])) count++;
	if (i<grid.length-1 && blackcells.includes(grid[i+1][j])) count++;
    if (i<grid.length-1 && j<grid[0].length-1 && blackcells.includes(grid[i+1][j+1])) count++;
	return count;
}

/**
 * This code block creates a button with which the user can update the grid
 */
const update = document.createElement('button');
update.onclick = updateGrid;
update.textContent = 'Update';
document.querySelector('h2').appendChild(update);

/**
 * This code block creates a randomize button that will create a random grid for the
 * user to start with.
 */
const random = document.createElement('button');
function randomize() {
    clear;
    var newgrid = [];

    var i, j;
    for (i = 0; i < 30; i++) {
        for (j = 0; j < 30; j++) {
            if (Math.floor(Math.random() * 3) == 0) {
                newgrid.push([i, j]);
            }
        }
    }

    var k
    for (k = 0; k < newgrid.length; k++) {
        i = newgrid[k][0];
        j = newgrid[k][1];
        blackcells.push(grid[i][j]);
        grid[i][j].style.backgroundColor = 'black';
    }
}
random.onclick = randomize;
random.textContent = 'Set Random Board';
document.querySelector('h2').appendChild(random);

/**
 * This code block creates a clear button that will clear the board for the user.
 */
const clearAll = document.createElement('button');
function clear() { 
    var i;
    for (i = 0; i < blackcells.length; i++) {
        blackcells[i].style.backgroundColor = 'white';
    }

    blackcells = []
}
clearAll.onclick = clear;
clearAll.textContent = 'Clear Grid';
document.querySelector('h2').appendChild(clearAll);