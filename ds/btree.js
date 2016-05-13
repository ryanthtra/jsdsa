function BSTNode(data)
{
	this.data = data;
	this.left = null;
	this.right = null;
}

/////////////////////////////////////////////////////////////////
/**
 * @constructor
 */
/////////////////////////////////////////////////////////////////
function BinarySearchTree()
{
	this.root = null;
}

BinarySearchTree.prototype = {
	// Restore constructor
	constructor: BinarySearchTree,
	
	add: function(data) {},
	contains: function(data) {},
	remove: function(data) {},
	size: function() {},
	toArray: function() {},
	toString: function() {},
	traverse: function(process) {}
};

/////////////////////////////////////////////////////////////////
/**
 * @contains - Checks whether or not the tree has a node with the target data
 * @param data - the data of the target node
 * @return - true (found) or false (not found)
 */
/////////////////////////////////////////////////////////////////
BinarySearchTree.prototype.contains = function(data)
{
	var found = false;
	var current = this.root;
	
	while (!found && current)
	{
		// Go left if target is "less than" current
		if (data < current.data) current = current.left;
		// Go right if target is "greater than" current
		else if (data > current.data) current = current.right;
		else found = true;	
	}
	return found;
};

/////////////////////////////////////////////////////////////////
/**
 * @add - inserts a new node into the tree
 * @param data - the data for the new node
 */
/////////////////////////////////////////////////////////////////
BinarySearchTree.prototype.add = function(data)
{
	var node = new BSTNode(data);
	var current = null;
	
	// Edge case: empty tree
	if (this.root === null) 
		this.root = node;
	else // non-empty tree
	{
		current = this.root;
		
		while (true)
		{
			// Compare new node to current
			// Go left if "less than"
			if (data < current.data)
			{
				// If there is no left node yet
				if (current.left === null)
				{
					current.left = node;
					break; // Exit loop; node has been inserted
				}
				else 
					current = current.left;
			}
			else if (data > current.data)
			{
				if (current.right === null)
				{
					current.right = node;
					break; // Exit loop; node has been inserted
				}
				else 
					current = current.right;
			}
			else 
				break; // A duplicate, so ignore.
		}
	}
};

/////////////////////////////////////////////////////////////////
/**
 * @traverse - processes all the nodes of the tree (in order)
 * @param process - a function for processing the node
 */
/////////////////////////////////////////////////////////////////
BinarySearchTree.prototype.traverse = function(process)
{
	// Helper function
	function inOrder(node)
	{
		if (node)
		{
			// process left subtree
			if (node.left !== null)
				inOrder(node.left);
			
			// Process the node itself
			process.call(this, node);
			
			// process the right subtree
			if (node.right !== null)
				inOrder(node.right);
		}
	}
	
	inOrder(this.root);
};

/////////////////////////////////////////////////////////////////
/**
 * @size - gets the size of the tree
 * @return - the number of nodes in the tree
 */
/////////////////////////////////////////////////////////////////
BinarySearchTree.prototype.size = function()
{
	var length = 0;
	
	// Anonymous function is the 'process' parameter
	this.traverse(function(node)
	{
		length++;
	});
	
	return length;
};

/////////////////////////////////////////////////////////////////
/**
 * @toArray - creates an array version of the tree
 * @return - an array
 */
/////////////////////////////////////////////////////////////////
BinarySearchTree.prototype.toArray = function()
{
	var arr = [];
	
	this.traverse(function(node)
	{
		arr.push(node.data);
	});
	
	return arr;
};

/////////////////////////////////////////////////////////////////
/**
 * @toString - creates string representation of the data of the tree
 */
/////////////////////////////////////////////////////////////////
BinarySearchTree.prototype.toString = function()
{
	return this.toArray().toString();
}

/////////////////////////////////////////////////////////////////
/**
 * @remove - removes the node (containing the target data) from the tree
 */
/////////////////////////////////////////////////////////////////
BinarySearchTree.prototype.remove = function(data)
{
	var found = false,
			parent = null,
			current = this.root,
			child_count = 0,
			replacement = null,
			replacement_parent = null;
		
	// First, check if the node is in the tree.
	while (!found && current)
	{
		// Less than - go left
		if (data < current.data)
		{
			parent = current;
			current = current.left;
		}
		// Greater than - go right
		else if (data > current.data)
		{
			parent = current;
			current = current.right;
		}
		// Found
		else
			found = true;
	}
	if (found)
	{
		child_count = (current.left !== null ? 1 : 0) + (current.right !== null ? 1 : 0);
		
		// If the target node is the root
		if (current === this.root)
		{
			switch (child_count)
			{
				case 0:	// Zero children (ie, tree is just the root)
					this.root = null;
					break;
				
				case 1: // 1 child -- make that child the root
					this.root = (current.right === null ? current.left : current.right);
					break;	
				
				case 2: // 2 children
					// The replacement node is either the rightmost descendant of the left subtree
					// or the leftmost descendant of the right subtree.
					// We'll use the rightmode descendant of the left subtree as the replacement.
					replacement = this.root.left;
					// Traverse the left subtree to find the rightmost descendant.
					while (replacement.right !== null)
					{
						replacement_parent = replacement;
						replacement = replacement.right;
					}
					// We found the rightmost descendant (assigned to replacement)
					if (replacement_parent !== null)
					{
						// Replace the replacement's old place in the tree with the replacement's left subtree.
						replacement_parent.right = replacement.left;
						// Now, link the replacement node to the removed node's links.
						replacement.right = this.root.right;
						replacement.left = this.root.left;
					}
					else // The replacement node is the root of the left subtree, thus, its parent was the target node that was removed.
					{
						// We only need to link the right side of the replacement to the target node's right subtree.
						replacement.right = this.root.right;
					}
					this.root = replacement;
					break;
			}
		}
		else // The target node is not the root
		{
			// Check number of children of the target node
			switch (child_count)
			{
				case 0: // Zero children -- simple, remove the target node from parent
					if (current.data < parent.data)
						parent.left = null;
					else
						parent.right = null;
					break;
					
				case 1: // One child -- target node's parent's new child is the target node's lone child.
					if (current.data < parent.value)
						parent.left = (current.right === null ? current.left : current.right);
					else
						parent.right = (current.right ===null ? current.left : current.right);
					break;
					
				case 2: // Two children 
					// Look for the rightmost descendant of the target node's left subtree.
					replacement = current.left;
					replacement_parent = current;
					
					while (replacement.right !== null)
					{
						replacement_parent = replacement;
						replacement = replacement.right;
					}
					
					// We now found the replacement node
					replacement_parent.right = replacement.left;
					
					// Now all the child links of the target mode will be assigned as the child links of the replacement node.
					replacement.left = current.left;
					replacement.right = current.right;
					
					// Now get the correct parent link
					if (current.data < parent.data)
						parent.left = replacement;
					else
						parent.right = replacement;
					break;
			}
		}
	}
};

function testBinarySearchTree()
{
	var arr = [5,2,9,8,1,3,4,7,6,10,0];
	var bst = new BinarySearchTree();
	for (var i = 0; i < arr.length; i++)
	{
		bst.add(arr[i]);
	}
	console.log(bst.toString());
	console.log('bst root: ' + bst.root.data);
	bst.remove(6);
	console.log(bst.toString());
}