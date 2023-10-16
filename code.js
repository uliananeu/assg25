"use strict";
function l(t)
{
	let mylog = document.getElementById("log");
	mylog.value = t + "\n\n\n" + mylog.value;
}

let pieces = [ [1,2,3],
	       [4,5,6],
	       [7,8,9] ];

function pieceswap(i, j, x, y)
{
	if (
		( (i >= 0) && (i < pieces.length) ) &&
		( (x >= 0) && (x < pieces.length) ) &&
		( (j >= 0) && (j < pieces[i].length) ) &&
		( (y >= 0) && (y < pieces[x].length) ) )
	{
		let t = pieces[i][j];
		pieces[i][j] = pieces[x][y];
		pieces[x][y] = t;
		return true;
	}
	else 
	{
		l("This didn't go through, either ("+i+","+j+") or ("+x+","+y+") doesn't even exist!");
		return false;
	}
}

function draw()
{
	let i,j;
	for (i = 0; i < pieces.length; i++)
	{
		for (j = 0; j < pieces[i].length; j++)
		{
			document.getElementById(""+i+","+j).src="piece"+pieces[i][j]+".png";
		}
	}
}

function stironce()
{
	
	let i,j;
	let foundit = false;
	for (i = 0; i < pieces.length; i++)
	{
		for (j = 0; j < pieces[i].length; j++)
		{
			if (pieces[i][j] === 0) 
			{
				foundit = true;
				break;
			}
		}
		if (foundit) break;
	}
	let success= false;
	while (!success)
	{
		let direction = Math.random();
		if (direction <= 0.25) 		{ if (i > 0) 			success = pieceswap(i, j, i-1, j); }//up
		else if (direction <= 0.50) 	{ if (j+1 < pieces[i].length) 	success = pieceswap(i, j, i, j+1); }//right
		else if (direction <= 0.75) 	{ if (i+1 < pieces.length) 	success = pieceswap(i, j, i+1, j); }//down
		else if (direction <= 1) 	 	{ if (j > 0) 			success = pieceswap(i, j, i, j-1); }//left
	}
}

function stir()
{
	l("Let's move the pieces randomly\n");
	if (pieces[2][2] === 9)
	{
		l("It looks like we're in the initial state, let's get rid of the lower right corner.");
		pieces[2][2] = 0;
	}
	let i;
	for (i=0; i < 100; i++) stironce();
	draw();
}


function squareclick(n) {
	// Log the square number that was clicked
	l("Square number " + n + " was clicked.");

	// Check if a square was previously clicked
	if (lastClickedSquare !== null) {
		 // Check if the previously clicked square is an empty square
		if (pieces[Math.floor(lastClickedSquare / 3)][lastClickedSquare % 3 ] === 0) {
			// Swap the pieces between the previously clicked square and the currently clicked square
			pieces[Math.floor(lastClickedSquare / 3)][lastClickedSquare % 3] = pieces[Math.floor(n / 3)][n % 3];
			pieces[Math.floor(n / 3)][n % 3] = 0;

			lastClickedSquare = n; // Update the lastClickedSquare to the current square
			draw(); // Redraw the game board
			checkWin(); // Check if the player has won
			return;
		}
	}

	// Update lastClickedSquare to the current square
	lastClickedSquare = n;
}

function checkWin() {
	let currentNumber = 1;

	// Iterate through the pieces and check if they are in the correct order
	for (let i = 0; i < pieces.length; i++) {
		for (let j = 0; j < pieces[i].length; j++) {
		if (pieces[i][j] !== currentNumber) {
		return;
		}
		currentNumber++;
		}
	}

		// If all pieces are in order, the player wins
		l("You win! All pieces are in order.");

		// Set the last piece to be empty
		pieces[2][2] = currentNumber - 1;
		  // Redraw the game board
		draw();
}