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
	//Read this with care, once you understand the logic you've practically solved the assignment!
	
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

//This is where your work starts, examine the code above, but you'll be able to make the whole game work by only implementing the function below.


function squareclick(n)
{
	l("Square number " + n + " was clicked... you now need to store this information into a variable.\n IF [the next click is not an empty square] store that information into the variable instead of " + n + ".\n IF [the next click targets AN EMPTY square next to this one (above, below, left, right)], you need to change the image in " + n + " and the next click. \nAFTER THE MOVE you check whether all the pictures in the array are now in raising order.\n IF [pictures are ordered], place the last, missing piece into the last square.\n Now you know what to code and where: start coding!\n\nNote that this log currently logs the latest message to the top. If you want to scroll down to the latest message, reverse the direction in the l function :-).");
}