/*
Stack is a LIFO data structure
push
pop
top
*/

/**
 * @constructor
 */
function Stack()
{
	this.items = [];
	this.length = this.items.length;
}

/**
 * @push - Adds an item to the top of the stack.
 * @return - The item that was added.
 */
Stack.prototype.push = function(item)
{
	this.length += 1;
	return this.items.push(item);
};

/**
 * @pop - Removes the top item from the stack
 * @return - The item that was removed.
 */
Stack.prototype.pop = function()
{
	if (this.length > 0) 
	{
		this.length -= 1;
	}
	
	return this.items.pop(); // Undefined if stack is empty.
};

/**
 * @top - Gets the top item from the stack (but stays on the stack)
 * @return - The top item of the stack.
 */
Stack.prototype.top = function()
{
	if (this.length > 0)
	{
		return this.items[this.length - 1];
	}
	
	// Empty stack...
	return undefined;
}

function testStack()
{
	var my_items = [
		'dough',
		'sauce',
		'cheese',
		'pepperoni',
		'olives',
		'parmesan'
	];
	
	var my_stack = new Stack();
	for (var i = 0; i < my_items.length; i++)
	{
		my_stack.push(my_items[i]);
	}
	console.log("Top pizza item: " + my_stack.top());
	console.log("Removing pizza items:");
	while(my_stack.length > 0)
	{
		console.log(my_stack.pop());
	}
}