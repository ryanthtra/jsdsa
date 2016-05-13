/**
 * @constructor GraphNode
 * @param data - the data for this node
 */
function GraphNode(data)
{
	this.data = data;
	this.neighbors = [];
}


/**
 * @ constructor Graph
 */
function Graph()
{
	this.nodes = [];
	this.length = 0;
}


/**
 * 
 */
Graph.prototype.addNode = function(node)
{
	this.nodes.push(node);
	return ++this.length;
};


/**
 * 
 */
Graph.prototype.addEdge = function(nodeA, nodeB)
{
	// Make sure nodeA and nodeB are in graph.
	var nA = this.nodes.filter(function(node)
	{
		return node.data.id === nodeA;
	});
	var nB = this.nodes.filter(function(node)
	{
		return node.data.id === nodeB;
	});
	
	// If nodeA and nodeB are in the graph
	// Theoretically, nA and nB each are one-element arrays.
	if (nA.length && nB.length)
	{
		nA[0].neighbors.push(nB[0]);
		nB[0].neighbors.push(nA[0]);
	};
};