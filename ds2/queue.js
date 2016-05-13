function Queue()
{
	var items = [];
	
	this.enqueue = function(element)
	{
		items.push(element);
	};
	
	this.dequeue = function()
	{
		return items.shift();
	};
	
	// Helper methods below
	this.front = function()
	{
		return items[0];
	};
	
	this.isEmpty = function()
	{
		return items.length === 0;
	};
	
	this.size = function()
	{
		return items.length;
	};
	
	this.print = function()
	{
		console.log(items.toString());
	};
}

// Priority Queue
function PriorityQueue()
{
	var items = [];
	
	function QueueElement(element, priority)
	{
		this.element = element;
		this.priority = priority;
	}
	
	this.enqueue = function(element, priority)
	{
		var queue_element = new QueueElement(element, priority);
		
		if (this.isEmpty())
		{
			items.push(queue_element);
		}
		else
		{
			let added = false;
			for (let i = 0; i < items.length; i++)
			{
				if (queue_element.priority < items[i].priority)
				{
					items.splice(i, 0, queue_element);
					added = true;
					break;
				}
			}
			if (!added)
			{
				items.push(queue_element);
			}
		}
	};
	
	this.dequeue = function()
	{
		return items.shift();
	};
	
	// Helper methods below
	this.front = function()
	{
		return items[0];
	};
	
	this.isEmpty = function()
	{
		return items.length === 0;
	};
	
	this.size = function()
	{
		return items.length;
	};
	
	this.print = function()
	{
		console.log(items.map(function(element)
		{
			return element.element;
		}).toString());
	};
}

function testQueue()
{
	var queue = new Queue();
	console.log(queue.isEmpty());
	
	queue.enqueue("John");
	queue.enqueue("Jack");
	queue.enqueue("Camila");
	queue.print();
	console.log(queue.size());
	console.log(queue.isEmpty());
	queue.dequeue();
	queue.dequeue();
	queue.print();
	
	var priorityQueue = new PriorityQueue();
	priorityQueue.enqueue("John", 2);
	priorityQueue.enqueue("Jack", 1);
	priorityQueue.enqueue("Camila", 1);
	priorityQueue.print();
	
	var names = [
		'John', 'Jack', 'Camila', 'Ingrid', 'Carl'
	];
	var winner = hotPotato(names, 7);
	console.log('The winner is: ' + winner);
}
