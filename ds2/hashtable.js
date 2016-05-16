function HashTable()
{
  var table = [];
  
  var hashCodeFunction = function(key)
  {
    return djb2HashCode(key);
  };
  
  /**
   * (private) loseloseHashCode - hash function that adds the ASCII values of the characters of the key 
   */
  var loseloseHashCode = function(key)
  {
    var hash = 0;
    for (let i = 0; i < key.length; i++)
    {
      hash += key.charCodeAt(i);
    }
    // Modulus is just used to work with lower numbers (here, 37 elements)
    return hash % 37;
  };
  /**
   * (private) djb2HashCode
   */
  var djb2HashCode = function(key)
  {
    var hash = 5381;
    for (var i = 0; i < key.length; i++)
    {
      hash = hash * 33 + key.charCodeAt(i);
    }
    return hash % 1013;
  };
  
  /**
   * @constructor ValuePair
   */
  var ValuePair = function(key, value)
  {
    this.key = key;
    this.value = value;
    
    this.toString = function()
    {
      return '[' + this.key + ' - ' + this.value + ']';
    }
  };
  
  /**
   * put - adds a new item to the hash table or updates an existing item in the hash table
   */
  this.put = function(key, value)
  {
    var position = hashCodeFunction(key);
    
    // Linked-list Chaining method
    // if (table[position] == undefined)
    // {
    //   table[position] = new LinkedList();
    // }
    // table[position].append(new ValuePair(key, value));
    
    
    // Linear probing method
    if (table[position] == undefined) // Empty position
    {
      table[position] = new ValuePair(key, value);
    }
    else // Position is already occupied
    {
      var index = ++position; // Start at the next position
      // Go through table starting from there until we find an empty position.
      while (table[index] != undefined)
      {
        index++;
      }
      table[index] = new ValuePair(key, value);
    }
  };
  
  /**
   * remove - removes a value from the hash table
   */
  this.remove = function(key)
  {
    var position = hashCodeFunction(key);
    
    // Linked-list chaining method
    // if (table[position] !== undefined)
    // {
    //   // Iterate though the linked list
    //   var current = table[position].getHead();
    //   do
    //   {
    //     if (current.element.key === key)
    //     {
    //       table[position].remove(current.element);
    //       // If we removed the last element of this chain, then set this position to undefined.
    //       if (table[position].isEmpty())
    //       {
    //         table[position] = undefined;
    //       }
    //       return true;
    //     }
    //   }
    //   while (current);
    // }
    // return false;
    
    // Linear probing method
    if (table[position] !== undefined)
    {
      if (table[position].key === key)
      {
        table[position] = undefined;
        return true;
      }
      else // This was pre-occupied by another ValuePair
      {
        // Keep going through the rest of the table to find the key.
        var index = ++position;
        while (table[index] === undefined || table[index] !== key)
        {
          index++;
        }
        if (table[index].key === key)
        {
          table[index] = undefined;
          return true;
        }
      }
    }
    return false;
  };
  
  /**
   * get - returns a specific value search by the key
   */
  this.get = function(key)
  {
    var position = hashCodeFunction(key);
    
    // Linked-list chaining method
    // if (table[position] !== undefined && !table[position].isEmpty())
    // {
    //   // Iterate though the list to find the right value
    //   var current = table[position].getHead();
      
    //   do
    //   {
    //     if (current.element.key === key)
    //     {
    //       return current.element.value;
    //     }
    //     current = current.next;
    //   }
    //   while (current);
    // }
    // // Either the index is empty, or we didn't find the ValuePair element we're looking for.
    // return undefined;
    
    // Linear probing method
    if (table[position] !== undefined)
    {
      if (table[position].key === key)
      {
        return table[position].value;
      }
      else // This was pre-occupied by another ValuePair
      {
        // Keep going through the rest of the table to find the key.
        var index = ++position;
        while (table[index] === undefined || table[index] !== key)
        {
          index++;
        }
        if (table[index].key === key)
        {
          return table[index].value;
        }
      }
    }
    return undefined;
  };
  
  /**
   * clear - empties the entire table
   */
  this.clear = function()
  {
    table = [];
  };
  
  /**
   * print
   */
  this.print = function()
  {
    for (let i = 0; i < table.length; ++i)
    {
      if (table[i] !== undefined)
      {
        console.log(i + ': ' + table[i]);
      }
    }
  }
}


function testHashTable()
{
  var hash = new HashTable();
  hash.put('Gandalf', 'gandalf@email.com');
  hash.put('John', 'johnsnow@email.com');
  hash.put('Tyrion', 'tyrion@email.com');
  console.log(hash.get('Gandalf'));
  console.log(hash.get('Loiane'));
  hash.remove('Gandalf');
  console.log(hash.get('Gandalf'));
  console.log('-----------------------------');
  console.log('HASHTABLE COLLISIONS');
  hash.clear();
  hash.put('Gandalf', 'gandalf@email.com');
  hash.put('John', 'johnsnow@email.com');
  hash.put('Tyrion', 'tyrion@email.com');
  hash.put('Aaron', 'aaron@email.com');
  hash.put('Donnie', 'donnie@email.com');
  hash.put('Ana', 'ana@email.com');
  hash.put('Jonathan', 'jonathan@email.com');
  hash.put('Jamie', 'jamie@email.com');
  hash.put('Sue', 'sue@email.com');
  hash.put('Mindy', 'mindy@email.com');
  hash.put('Paul', 'paul@email.com');
  hash.put('Nathan', 'nathan@email.com');
  console.log('Printing out hash table:');
  hash.print();
}