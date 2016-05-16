function BinarySearchTree()
{
  /**
   * Node - building block of the BST
   */
  var Node = function(key)
  {
    this.key = key;
    this.left = null;
    this.right = null;
  };
  
  var root = null;
  
  // BST methods
  /**
   * insert - inserts a new key in the tree
   */
  this.insert = function(key)
  {
    var newNode = new Node(key); //1
    
    if (root === null) // Empty tree //2
    {
      root = newNode;
    }
    else
    {
      insertNode(root, newNode); //3
    }
  };
  /**
   * (private) insertNode - recursive helper function used in the insert method
   */
  var insertNode = function(node, newNode)
  {
    if (newNode.key < node.key) //4
    {
      if (node.left === null) //5
      {
        node.left = newNode; //6
      }
      else
      {
        insertNode(node.left, newNode); //7
      }
    }
    else if (newNode.key > node.key)
    {
      if (node.right === null) //8
      {
        node.right = newNode; //9
      }
      else
      {
        insertNode(node.right, newNode); //10
      }
    }
  };
  /**
   * search - searches for the key in the tree
   */
  this.search = function(key)
  {
    return searchNode(root, key);
  };
  var searchNode = function(node, key)
  {
    if (node === null)
      return false;
    if (key < node.key)
    {
      return searchNode(node.left, key);
    }
    else if (key > node.key)
    {
      return searchNode(node.right, key);
    }
    else
    {
      return true;
    }
  };
  
  /**
   * printNode - callback function used in the traversal methods
   */
  this.printNode = function(value)
  {
    console.log(value);
  }
  
  /** 
   * inOrderTraverse - visits all nodes in-order
  */
  this.inOrderTraverse = function(callback)
  {
    inOrderTraverseNode(root, callback);
  };
  /**
   * (private) inOrderTraverseNode - helper recursive function used for inOrderTraverse method
   */
  var inOrderTraverseNode = function(node, callback)
  {
    if (node !== null)
    {
      inOrderTraverseNode(node.left, callback);
      callback(node.key);
      inOrderTraverseNode(node.right, callback);
    }
  };
  
  
  /**
   * preOrderTraverse - visits all nodes pre-order
   */
  this.preOrderTraverse = function(callback)
  {
    preOrderTraverseNode(root, callback);
  };
  var preOrderTraverseNode = function(node, callback)
  {
    if (node !== null)
    {
      callback(node.key);
      preOrderTraverseNode(node.left, callback);
      preOrderTraverseNode(node.right, callback);
    }
  };
  
  /**
   * postOrderTraverse - visits all nodes post-order
   */
  this.postOrderTraverse = function(callback)
  {
    postOrderTraverseNode(root, callback);
  };
  var postOrderTraverseNode = function(node, callback)
  {
    if (node !== null)
    {
      postOrderTraverseNode(node.left, callback);
      postOrderTraverseNode(node.right, callback);
      callback(node.key);
    }
  };
  
  /**
   * min - returns the minimum value/key in the tree
   */
  this.min = function()
  {
    return minNode(root);
  };
  var minNode = function(node)
  {
    if (node)
    {
      // Keep looking for a left child until we encounter a node without a left child.
      while (node && node.left !== null)
      {
        node = node.left;
      }
      return node.key;
    }
    return null;
  };
  
  /**
   * max - return the maximum value/key in the tree
   */
  this.max = function()
  {
    return maxNode(root); 
  };
  var maxNode = function(node)
  {
    if (node)
    {
      while (node && node.right !== null)
      {
        node = node.right;
      }
      return node.key;
    }
    return null;
  }
  
  /**
   * remove - removes the key from the tree
   */
  this.remove = function()
  {
    
  };
}


function testBST()
{
  var tree = new BinarySearchTree();
  tree.insert(11);
  tree.insert(7);
  tree.insert(15);
  tree.insert(5);
  tree.insert(3);
  tree.insert(9);
  tree.insert(8);
  tree.insert(10);
  tree.insert(13);
  tree.insert(12);
  tree.insert(14);
  tree.insert(20);
  tree.insert(18);
  tree.insert(25);
  tree.insert(6);
  console.log('----IN-ORDER TRAVERSAL----');
  tree.inOrderTraverse(tree.printNode);
  console.log('----PRE-ORDER TRAVERSAL----');
  tree.preOrderTraverse(tree.printNode);
  console.log('----POST-ORDER TRAVERSAL----');
  tree.postOrderTraverse(tree.printNode);
  console.log('---------------------------');
  console.log('min: ' + tree.min());
  console.log('max: ' + tree.max());
  console.log('Has 13? ' + tree.search(13));
  console.log('Has 19? ' + tree.search(19));
}