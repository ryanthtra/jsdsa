/*
Queue is an FIFO data structure
Functions
enqueue - Add element to end of the queue
dequeue - Remove element from front of the queue
length - Get number of items in queue
*/

/**
 * @constructor
 * @param optional_elements - (optional) an array 
 */
function Queue(optional_elements)
{
	if (optional_elements instanceof Array)
	{
		this.items = optElements;
	}
	else
	{
		this.items = [];
	}
	
	this.length = this.items.length;
}

/**
 * @enqueue - Adds an element to the end of the queue.
 * @param item - the element we are adding
 * @return - The item which we are adding.
 */
Queue.prototype.enqueue = function(item)
{
	this.length += 1;
	return this.items.push(item);
};

/**
 * @dequeue - Removes element at the front of the queue.
 * @return - The item which we are removing from the queue.
 */
Queue.prototype.dequeue = function()
{
	if (this.length > 0)
	{
		this.length -= 1;
	}
	
	return this.items.shift();
};

function testQueue()
{
	var line = [
		'Ryan',
		'Christianne',
		'Meghann',
		'Paolo',
		'Paola',
		'Victoria',
		'Cherryl'
	];
	
	var my_q = new Queue();
	for (var i = line.length - 1; i >= 0; i--)
	{
		console.log("Adding to my_q: " + my_q.enqueue(line[i]));
	}
	
	while (my_q.length > 0)
	{
		console.log("Next in line: " + my_q.dequeue());
	}
}