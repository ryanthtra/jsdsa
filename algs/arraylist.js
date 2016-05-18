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
  
  
  this.isSorted = function()
  {
    var length = array.length;
    for (let i = 0; i < length - 1; i++)
    {
      if (array[i] > array[i+1])
        return false;
    }
    return true;
  };
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
    var length = array.length;
    // Recursion stop condition.
    if (length === 1)                     // 1
    {
      return array;                       // 2
    }
    
    // Split the array into two
    var mid = Math.floor(length / 2),     // 3  
        left = array.slice(0, mid),       // 4
        right = array.slice(mid, length); // 5
        
    return merge(mergeSortRec(left), mergeSortRec(right));  // 6
  };
  /**
   * (private) merge 
   * Merges
   */
  var merge = function(left, right)
  {
    var result = [],                      // 7
        il = 0,
        ir = 0;
        
    // Compare the current smallest elements of the two halves.
    // Push the smaller element onto the return array until we've
    // gone through the entirety of one of the halves.
    while (il < left.length && ir < right.length) // 8
    {
      if (left[il] < right[ir])
        result.push(left[il++]);          // 9
      else
        result.push(right[ir++]);         // 10
    }
    
    // Push the remaining elements of the incomplete halves 
    // onto the return array.
    while (il < left.length)              // 11
      result.push(left[il++]);
    
    while (ir < right.length)             // 12
      result.push(right[ir++]); 
      
    return result;                        // 13
  };
  
  
  /**
   * quicksort
   * 
   * Basic steps:
   *  1. Pick a 'pivot' (typically the middle element).
   *  2. Use two iterators: left (first item of array) and right (last item)
   *     i.   Move left up until the value is more than the the pivot's value.
   *     ii.  Move right down until the value is less than the pivot's value.
   *     iii. Swap the places of the left and right values.
   *     iv.  Repeat i-iii until left and right pass each other.
   * 3. Split the array into two halves (left array of pivot and right array).
   * 4. Repeat 1-3 for each subarray.
   *     
   */
  this.quicksort = function()
  {
    quick(array, 0, array.length - 1);
  };
  /**
   * (private) quick
   */
  var quick = function(array, left, right)
  {
    var index;                                // 1
    
    if (array.length > 1)                     // 2
    {
      // Basic steps #1 and #2
      index = partition(array, left, right); // 3
      
      // Basic steps #3 and 4
      if (left < index - 1)                   // 4
        quick(array, left, index - 1);        // 5
      
      if (index < right)                      // 6
        quick(array, index, right);           // 7
    }
  };
  /**
   * (private) partition
   */
  var partition = function(array, left, right)
  {
    // Basic step #1
    var pivot = array[Math.floor((right + ))]
  };
}




function createNonSortedArray(size)
{
  var array = new ArrayList();
  for (let i = size; i > 0; i--)
  {
    array.insert(i);
  }
  console.log('Created unsorted array of ' + size + ' elements.');
  return array;
}

function testSorts()
{
  console.log('RUNNING BUBBLE SORT');
  var array = createNonSortedArray(32768);
  console.log('Is array sorted: ' + array.isSorted());
  array.modifiedBubbleSort();
  console.log('BUBBLE -- Is array sorted: ' + array.isSorted());
  
  console.log('RUNNING SELECTION SORT');
  var array = createNonSortedArray(32768);
  console.log('Is array sorted: ' + array.isSorted());
  array.selectionSort();
  console.log('SELECTION -- Is array sorted: ' + array.isSorted());
  
  console.log('RUNNING INSERTION SORT');
  var array = createNonSortedArray(32768);
  console.log('Is array sorted: ' + array.isSorted());
  array.insertionSort();
  console.log('INSERTION -- Is array sorted: ' + array.isSorted());
  
  console.log('RUNNING MERGE SORT - 32768 elements');
  var array = createNonSortedArray(32768);
  console.log('Is array sorted: ' + array.isSorted());
  array.mergeSort();
  console.log('MERGE -- Is array sorted: ' + array.isSorted());
  
  console.log('RUNNING QUICK SORT - 32768 elements');
  var array = createNonSortedArray(32768);
  console.log('Is array sorted: ' + array.isSorted());
  array.mergeSort();
  console.log('QUICK -- Is array sorted: ' + array.isSorted());
}

