/*
(undirected) Graph class.  Implemented using adjacency list.
*/
function Graph()
{
  var vertices = []; //1
  var adjList = new Dictionary(); //2
  
  /**
   * addVertex - add vertex to the graph
   */
  this.addVertex = function(v)
  {
    vertices.push(v);   //3
    adjList.set(v, []); //4
  };
  
  /**
   * addEdge - adds connection between two vertices
   */
  this.addEdge = function(v, w)
  {
    adjList.get(v).push(w);   //5
    adjList.get(w).push(v);   //6
  };
  
  /**
   * toString 
   */
  this.toString = function()
  {
    var s = '';
    for (let i = 0; i < vertices.length; i++) //10
    {
      s += vertices[i] + ' -> ';
      var neighbors = adjList.get(vertices[i]); //11
      for (let j = 0; j < neighbors.length; j++)  //12
      {
        s += neighbors[j] + ' ';
      }
      s += '\n';    //13
    }
    return s;
  };
  
  // BREADTH-FIRST SEARCH ALGORITHM METHODS
  /**
   * Colors: white - node not visited
   *         gray - node visited only
   *         black - node visited and full explored 
   *                  (i.e., all its neighbors visited)
   */
  var initializeColor = function()
  {
    var color = [];
    for (let i = 0; i < vertices.length; i++)
    {
      color[vertices[i]] = 'white';   //1
    }
    return color;
  };
  this.printNode = function(value)
  {
    console.log('Visited vertex: ' + value);
  };
  /**
   * bfs
   */
  this.bfs = function(v, callback)
  {
    var color = initializeColor(),  // 2
        queue = new Queue;          // 3
    queue.enqueue(v);               // 4
    
    while (!queue.isEmpty())          // 5
    {
      var u = queue.dequeue(),        // 6
          neighbors = adjList.get(u); // 7
          
      // Mark DQed element as visited.
      color[u] = 'gray';              // 8
      // Get all the neighbors of the DQed element.
      for (let i = 0; i < neighbors.length; i++)  // 9
      {
        let w = neighbors[i];       // 10
        if (color[w] === 'white')   // 11
        {
          color[w] = 'grey';        // 12
          queue.enqueue(w);         // 13
        }
      }
      // DQed element has been fully explored
      color[u] = 'black';           // 14
      if (callback)                 // 15
        callback(u);
    }
  };
}

function testGraph()
{
  var graph = new Graph();
  var myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];   //7
  for (let i = 0; i < myVertices.length; i++)  //8
  {
    graph.addVertex(myVertices[i]);
  }
  graph.addEdge('A','B');    //9
  graph.addEdge('A','C');
  graph.addEdge('A','D');
  graph.addEdge('C','D');
  graph.addEdge('C','G');
  graph.addEdge('D','G');
  graph.addEdge('D','H');
  graph.addEdge('B','E');
  graph.addEdge('B','F');
  graph.addEdge('E','I');
  console.log(graph.toString());
  graph.bfs(myVertices[0], graph.printNode);
}