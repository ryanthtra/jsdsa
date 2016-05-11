/**
 * @constructor
 * @param data - The data for the node.
 * Node - a linked list node.
 */
function Node(data)
{
	this.data = data;
	this.next = null;
}

/**
 * @constructor LinkedList
 * Creates an empty linked list.
 */
function LinkedList()
{
	this.head = null;
	this.tail = null;
	this.length = 0;
}

/**
 * @param data - The data for the new node.
 * Method add
 * Adds a new node to the end of the linked list.
 * @return - the new node 
 */ 
LinkedList.prototype.add = function(data)
{
	var node = new Node(data);
	
	// If the linked list is empty...
	if (this.head === null)
	{
		this.head = node;
		this.tail = node;
	}
	
	this.tail.next = node;
	this.tail = node;
	this.length += 1;
	
	return node;
};

/**
 * Method delete
 * Removes a node from the linked list.
 * @param node - the node we want to remove, or else we want to remove
 * 								the last node of the list.
 * @return - Whether or not a node was successfully removed.
 */
LinkedList.prototype.delete = function(node)
{
	if (this.length === 1)
	{
		return false;
	}
	
	// Checks that the parameter is of type Node
	if (node instanceof Node)
	{
		for (var curr = this.head; curr !== null; curr = curr.next)
		{
			// If next node is the one we're looking for...
			if (curr.next === node)
			{
				// Unlink from target node and link to the node after the target.
				curr.next = node.next;
				node.next = null;
				this.length -= 1;
				return true;
			}
		}
	}
	else // We aren't looking for a particular node; we just want to "pop" from the linked list.
	{
		for (var curr = this.head; curr !== null; curr = curr.next)
		{
			if (curr.next === this.tail)
			{
				node.next = null;
				this.tail = curr;
				this.length -= 1;
				return true;
			}
		}
	}
	
	return false;
};

/**
 * Method clear
 * Clears the linked list
 */
LinkedList.prototype.clear = function()
{
	this.length = 0;
	this.head = null;
	this.tail = null;
};

/**
 * Method has
 * Checks if a particular node exists within the list.
 * @param node - the target node.
 */
LinkedList.prototype.has = function(node)
{
	for (var curr = this.head; curr !== null; curr = curr.next)
	{
		if (curr.data === node.data)
		{
			return true;
		}
	}
	return false;
};

/**
 * Adds new node to list after the target node.  If target not found,
 *   then just add to the end of the list.
 * @param data - the data for the new node to be inserted
 * @param node - the target node
 * @return - The new node.
 */
LinkedList.prototype.insert = function(data, node)
{
	var new_node = new Node(data);
	
	for (var curr = this.head; curr.next !== null; curr = curr.next)
	{
		if (curr.data === node.data)
		{
			new_node.next = curr.next;
			curr.next = new_node;
			length += 1;
			return new_node;
		}
	}
	
	// We already reached the last node of the list at this point.
	this.tail.next = new_node;
	this.tail = new_node;
	length += 1;
	return new_node; 
};

/**
 * Displays all the elements of the list.
 */
LinkedList.prototype.display = function()
{
	console.log("*****Linked list of elements of LENGTH: " + this.length + " *****");
	for (var curr = this.head; curr !== null; curr = curr.next)
	{
		console.log(curr.data);
	}
	console.log("*****End of linked list*****");
};