// get the body of the DOM tree and create an element to hold our grid
const body = document.querySelector('body');
const container = document.createElement('div');
container.style.cssText = 'top: 15px; left: 320px; position: absolute';
body.appendChild(container);

var blackcells = []
// Create a 2D array of 16 div nodes
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
        curr.onmouseover = setColor;
    }
}

/** 
 * A function to be used with hover on each cell of the grid.
 * The color of a cell reverses when hovered on due to this function.
*/
function setColor() {
    //    if (this.style.backgroundColor === 'white') {
    //    this.style.backgroundColor = 'black';
    //    blackcells.push(this);
    //} else {
    this.style.backgroundColor = 'black';
    //blackcells.remove(this);
    
    //}
    if (!blackcells.includes(this)) {
	blackcells.push(this);
    }
}

const clearAll = document.createElement('button');
function clear() {
    console.log(blackcells);
    var i;
    for (i = 0; i < blackcells.length; i++) {
        blackcells[i].style.backgroundColor = 'white';
    }

    blackcells = []
}
clearAll.onclick = clear;
clearAll.textContent = 'Clear Grid';
document.querySelector('h2').appendChild(clearAll);
console.log(clearAll);