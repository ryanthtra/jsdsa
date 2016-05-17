/*
(undirected, unweighted) Graph class.  Implemented using adjacency list.
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
    var s = '------STRING REPRESENTATION OF GRAPH------\n';
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
    s += '------END STRING REPRESENTATION------';
    return s;
  };
  
  /**
   * printNode - the process function when visiting a vertex in BFS and DFS
   */
  this.printNode = function(value)
  {
    console.log('Visited vertex: ' + value);
  };
  
  
  //*****************************************//
  // BREADTH-FIRST SEARCH ALGORITHM METHODS
  //*****************************************//
  /**
   * Colors: white - node not visited
   *         gray - node discovered only
   *         black - node visited and fully explored 
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
  /**
   * bfs
   * @param v - the 'starting point' vertex
   * @param callback - function we use to process a fully explored vertex
   */
  this.bfs = function(v, callback)
  {
    var color = initializeColor(),  // 2
        queue = new Queue;              // 3
    queue.enqueue(v);               // 4
    
    while (!queue.isEmpty())          // 5
    {
      // u - the current vertex to be explored
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
  /**
   * BFS - a breadth-first search method that stores the distances of all vertices from the parameter vertex
   * @param v - the starting point vertex
   * @return - an object holding the distances array and the predecessors array
   */
  this.BFS = function(v)
  {
    var color = initializeColor(),  // 2
        queue = new Queue,          // 3
        // d array: stores distance of index vertex from v.
        d = [],                     //{1}
        // pred array: the vertex from which the index vertex came
        pred = [];                  //{2}
    queue.enqueue(v);               // 4
    
    for (let i = 0; i < vertices.length; i++) //{3}
    {
      d[vertices[i]] = 0;           //{4}
      pred[vertices[i]] = null;     //{5}
    }    
    
    while (!queue.isEmpty())          // 5
    {
      // u - the current vertex to be explored
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
          d[w] = d[u] + 1;          //{6}
          pred[w] = u;              //{7}
          queue.enqueue(w);         // 13
        }
      }
      // DQed element has been fully explored
      color[u] = 'black';           // 14
    }
    return {
      distances: d,
      predecessors: pred
    };
  };
  /**
   * printShortestPaths
   * @param v - the starting point vertex
   */
  this.printShortestPaths = function(v_origin)
  {
    var shortestPathOrigin = this.BFS(v_origin);
    for (let i = 1; i < vertices.length; i++)
    {
      let toVertex = vertices[i], // Destination vertex
          path = new Stack();
      // From the destination vertex, we trace back to its predecessor, to the predecessor's predecessor, until we reach the origin vertex.  The 'path' stack is used to keep track of those vertices.
      for (let v = toVertex; v !== v_origin; v = shortestPathOrigin.predecessors[v]) 
      {
        path.push(v);
      }
      path.push(v_origin);  // Since the origin ends the for loop, we have to add the vertex to the path here.
      
      // Create the string of the path 
      let s = path.pop();
      while (!path.isEmpty())
      {
        s += ' - ' + path.pop();
      }
      console.log(s);
    }
  };
  
  
  //*****************************************//
  // DEPTH-FIRST SEARCH ALGORITHM METHODS
  //*****************************************//
  /**
   * dfs - a DFS algorithm for only 'visiting' vertices
   * @param callback the function used to 'process' the vertex.
   * 
   */
  this.dfs = function(callback)
  {
    // Array for marking the status of all the vertices.
    var color = initializeColor();
    
    for (let i = 0; i < vertices.length; i++)
    {
      if (color[vertices[i]] === 'white')
      {
        // If the graph is entirely connected, then this will only be called once (not counting the recursive calls).
        dfsVisit(vertices[i], color, callback);
      }
    }
  };
  /**
   * (private) dfsVisit - the recursive helper function that does the actual DFS.
   * @param u - the vertex we are currently visiting
   * @param color - array holding the visiting statuses of the vertices in the graph.
   * @param callback - the process function.
   *  
   ***** Basic steps: *****
   * 1. Mark 'v' as discovered/visited.
   * 2. For all unvisited neighbors 'w' of 'v':
   *    - Visit 'w'.
   * 3. Mark 'v' as explored. 
   */
  var dfsVisit = function(u, color, callback)
  {
    // Mark the parameter vertex as visited. (Basic step #1)
    color[u] = 'grey';
    if (callback) 
      callback(u);
      
    // Get all the adjacent vertices of 'u'.
    var neighbors = adjList.get(u);
    for (let i = 0; i < neighbors.length; i++)
    {
      var w = neighbors[i];
      if (color[w] === 'white')
      {
        // (Basic step #2) - recursive call 
        dfsVisit(w, color, callback);
      }
    }
    
    // (Basic step #3) - All neighbors have been visited, which means the vertex is fully explored.
    color[u] = 'black';
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
  var shortestPathA = graph.BFS(myVertices[0]);
  console.log(shortestPathA);
  graph.printShortestPaths(myVertices[0]);
  console.log('-------DOING dfs---------');
  graph.dfs(graph.printNode);
}