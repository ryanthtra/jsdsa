function LinkedList()
{
	var Node = function(element)
	{
		this.element = element;
		this.next = null;
	};
	
	var length = 0;
	var head = null;
	
	/**
	 * @append
	 */
	this.append = function(element)
	{
		var node = new Node(element),
				current;
		
		if (head === null) // List is empty
		{
			head = node;
		}
		else
		{
			current = head;
			
			// Iterate through to the end of the list
			while (current.next)
			{
				current = current.next;
			}
			// Now at the last item.  Link that to the new node.
			current.next = node;
		}
		length++;
	};
	
	/**
	 * @insert
	 * @param position
	 * @param element
	 * @return - true if successfully inserted
	 */
	this.insert = function(position, element)
	{
		// Protect against out of bounds positions
		if (position > -1 && position <= length)
		{
			var node = new Node(element),
					current = head,
					previous,
					index = 0;
					
			if (position === 0) // Want new node as the first
			{
				node.next = current;
				head = node;
			}
			else
			{
				while (index++ < position)
				{
					previous = current;
					current = current.next;
				}
				// Now at the position we want to node to be in.
				previous.next = node;
				node.next = current;
			}
			length++;
			return true;
		}
		else
		{
			return false;
		}
	};
	
	/**
	 * @removeAt
	 * @param position
	 */
	this.removeAt = function(position)
	{
		// Protect against out of bounds cases
		if (position > -1 && position < length)
		{
			var current = head,
					previous,
					index = 0;
					
			// Removing the first item
			if (position === 0)
			{
				head = current.next;
			}
			else
			{
				// Iterate until reaching the position.
				while (index++ < position)
				{
					previous = current;
					current = current.next;
				}
				// 1. link previous to next
				previous.next = current.next;
			}
			length--;
			
			return current.element;
		}
		else
		{
			return null;
		}
	};
	
	/**
	 * @remove
	 */
	this.remove = function(element)
	{
		return this.removeAt(this.indexOf(element));
	};
	
	/**
	 * @indexOf
	 */
	this.indexOf = function(element)
	{
		var current = head,
				index = 0;
				
		while (current)
		{
			if (element === current.element)
			{
				return index;
			}
			index++;
			current = current.next;
		}
		
		return -1; // We already went past the list.
	};
	
	/**
	 * @isEmpty
	 */
	this.isEmpty = function()
	{
		return length === 0;
	};
	
	
	/**
	 * @size
	 */
	this.size = function()
	{
		return length;
	};
	
	/**
	 * @toString
	 */
	this.toString = function()
	{
		var current = head,
				string = '';
			
		while (current) 
		{
			string += current.element + ' ';
			current = current.next;
		}
		return string;
	};
	
	/**
	 * @print
	 */
	this.print = function()
	{
		console.log(this.toString());
	};
	
	this.getHead = function()
	{
		return head;
	}
}


/**
 * @constructor DoublyLinkedList
 */
function DoublyLinkedList()
{
	var Node = function(element)
	{
		this.element = element;
		this.next = null;
		this.prev = null;
	};
	
	var length = 0,
			head = null,
			tail = null;
			
			
	/**
	 * @insert
	 * @param position
	 * @param element
	 * @return true is successully inserted
	 */
	this.insert = function(position, element)
	{
		// Protect against out of bounds
		if (position >= 0 && position <= length)
		{
			var node = new Node(element),
					current = head,
					previous = null,
					index = 0;
			
			// Inserting @first position
			if (position === 0)
			{
				// Is empty list
				if (!head)
				{
					head = node;
					tail = node;
				}
				else
				{
					node.next = current;
					current.prev = node;
					head = node;
				}
			}
			// Inserting @last position
			else if (position === length)
			{
				current = tail;
				current.next = node;
				node.prev = current;
				tail = node;
			}
			// Inserting everywhere else.
			else
			{
				while (index++ < position)
				{
					previous = current;
					current = current.next;
				}
				// We found the correct position at this point.
				// Change the links.
				previous.next = node;
				node.prev = previous;
				current.prev = node;
				node.next = current;
			}
			length++;
			return true;
		}
		else
		{
			return false;
		}
	};
	
	/**
	 * @removeAt
	 * @param position
	 */
	this.removeAt = function(position)
	{
		// Protect against out of bounds
		if (position >= 0 && position < length)
		{
			var current = head,
					previous = null;
					index = 0;
					
			// Removing head
			if (position === 0)
			{
				head = current.next;
				
				// If this was the only node in the list
				if (length === 1)
				{
					tail = null;
				}
				else
				{
					head.prev = null;
				}
			}
			// Removing tail
			else if (position === length - 1)
			{
				current = tail;
				tail = current.prev;
				tail.next = null;
			}
			// Removing anywhere else
			else
			{
				while (index++ < position)
				{
					previous = current;
					current = current.next;
				}
				// Now at the correct position.
				// Change links.
				previous.next = current.next;
				current.next.prev = previous;
			}
			length--;
			return current.element;
		}
		else
		{
			return null;
		}
	};
	
	
	/**
	 * @remove
	 * @param element
	 */
	this.remove = function(element)
	{
		return this.removeAt(this.indexOf(element));
	}
	
	
	/**
	 * @indexOf
	 * @element - element of the node we are looking for
	 */
	this.indexOf = function(element)
	{
		let current = head,
				index = 0;
				
		while (current)
		{
			if (element === current.element)
			{
				return index;
			}
			current = current.next;
			index++;
		}
		
		// We are past the entire list at this point.
		return -1;
	};
	
	
	this.isEmpty = function()
	{
		return length === 0;
	}
	
	
	this.size = function()
	{
		return length;
	}
	
	this.getHead = function()
	{
		return head;
	}
	
	this.getTail = function()
	{
		return tail;
	}
}