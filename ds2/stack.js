function Stack()
{
	var items = [];
	
	this.push = function(element)
	{
		items.push(element);
	};
	
	this.pop = function()
	{
		return items.pop();
	};
	
	this.peek = function()
	{
		return items[items.length - 1];
	};
	
	this.isEmpty = function()
	{
		return items.length === 0;
	};
	
	this.size = function()
	{
		return items.length;
	};
	
	this.clear = function()
	{
		items = [];
	};
	
	this.print = function()
	{
		console.log(items.toString());
	};
}

function testStack()
{
	var stack = new Stack();
	console.log(stack.isEmpty());
	stack.push(5);
	stack.push(8);
	console.log(stack.peek());
	stack.push(11);
	console.log(stack.size());
	console.log(stack.isEmpty());
	stack.push(15);
	stack.pop();
	stack.pop();
	console.log(stack.size());
	stack.print();
	
	console.log(divideBy2(233));
	console.log(divideBy2(10));
	console.log(divideBy2(1000));
	
	console.log(baseConverter(15, 2));
	console.log(baseConverter(15, 8));
	console.log(baseConverter(15, 16));
}