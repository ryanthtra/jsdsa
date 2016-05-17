/**
 * ArrayList - the data structure for sort algorithms
 */
function ArrayList()
{
  var array = [];
  
  this.insert = function(item)
  {
    array.push(item);
  };
  
  this.toString = function()
  {
    return array.join(',');
  };
  
  var swap = function(index1, index2)
  {
    var temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp; 
  }
  
  
  //***************************//
  //    SORTING FUNCTIONS      //
  //***************************//
  
  //-----START CRAPPY QUADRATIC SORTS-----//
  /**
   * bubbleSort
   */
  this.bubbleSort = function()
  {
    var length = array.length;              // 1
    // Outer loop is just a counter for the number of passes though the array we need to make.
    for (let i = 0; i < length; i++)        // 2
    {
      for (let j = 0; j < length - 1; j++)  // 3
      {
        if (array[j] > array[j+1])          // 4
          swap(j, j+1);                     // 5
      }
    }
  };
  /**
   * modifiedBubbleSort - optimized bubble sort
   * 
   * Greatest values will already bubble up to the end of the array, so no need to make a swap check at the end as its already sorted.
   */
  this.modifiedBubbleSort = function()
  {
    var length = array.length;
    for (let i = 0; i < length; i++)
    {
      for (let j = 0; j < length-1-i; j++)
      {
        if (array[j] > array[j+1])
          swap(j, j+1);
      }
    }
  };

  /**
   * selectionSort  
   * 
   * At each pass i, look for the minimum value of the array starting from the i index.  When found, that minimum value will then be placed at i via swap.
   */
  this.selectionSort = function()
  {
    var length = array.length,            // 1
        indexMin;
    
    for (let i = 0; i < length - 1; i++)  // 2
    {
      indexMin = i;                       // 3
      for (let j = i; j < length; j++)    // 4
      {
        if (array[indexMin] > array[j])   // 5
        indexMin = j;                     // 6
      }
      if (i !== indexMin)                 // 7
        swap(i, indexMin);
    }
  };
  
  /**
   * insertionSort
   * 
   *  
   */
  this.insertionSort = function()
  {
    var length = array.length,            // 1
        j,
        temp;
        
    for (let i = 1; i < length; i++)      // 2
    {
      j = i;                              // 3
      temp = array[i];                    // 4
      // Loop until we reach the beginning of the array, or the item we're evaluating is less than the insertion item.
      while (j > 0 && array[j-1] > temp)  // 5
      {
        array[j] = array[j-1];
        j--;
      }
      array[j] = temp;
    }
  };
  //-----END CRAPPY QUADRATIC SORTS-----//
  
  /**
   * mergeSort
   */
  this.mergeSort = function()
  {
    array = mergeSortRec(array);
  };
  /**
   * (private) mergeSortRec
   */
  var mergeSortRec = function(array)
  {
    
  };
}




function createNonSortedArray(size)
{
  var array = new ArrayList();
  for (let i = size; i > 0; i--)
  {
    array.insert(i);
  }
  return array;
}

function testSorts()
{
  console.log('RUNNING BUBBLE SORT');
  var array = createNonSortedArray(500);
  console.log(array.toString());
  array.bubbleSort();
  console.log(array.toString());
  
  console.log('RUNNING SELECTION SORT');
  var array = createNonSortedArray(500);
  console.log(array.toString());
  array.selectionSort();
  console.log(array.toString());
  
  console.log('RUNNING INSERTION SORT');
  var array = createNonSortedArray(500);
  console.log(array.toString());
  array.insertionSort();
  console.log(array.toString());
}

