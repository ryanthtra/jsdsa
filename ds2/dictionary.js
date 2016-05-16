/*
Dictionary
Based on the ES6 Map class.
Stores items as [key, value] pairs.
*/
function Dictionary()
{
  var items = {};
  
  /**
   * @set - add a new item to the dictionary or sets an existing key to a new value.
   */ 
  this.set = function(key, value)
  {
    items[key] = value;
  }; 
  /**
   * remove - removes the value from the dictionary using key
   * @return - true if the key (and its value) was successfully removed
   */
  this.remove = function(key)
  {
    if (this.has(key))
    {
      delete items[key];
      return true;
    }
    return false;
  };
  /**
   * has - checks if key exists in the dictionary
   * @param key - the key we are looking for
   * @return - true if the dictionary as the key
   */
  this.has = function(key)
  {
    //return items.hasOwnProperty(key);
    return key in items;
  };
  /**
   * @get - returns specific value searched by the key
   */
  this.get = function(key)
  {
    return this.has(key) ? items[key] : undefined;
  };
  /**
   * @clear - removes all items from the dictionary
   */
  this.clear = function()
  {
    this.items = {};
  };
  /**
   * @size - returns the number of elements in the dictionary
   * Use in newer browsers.
   */
  this.size = function()
  {
    return Object.keys(items).length;
  };
  /**
   * @keys - returns array of all keys in the dictionary
   * Use in newer browsers.
   */
  this.keys = function()
  {
    return Object.keys(items);
  };
  /**
   * @values - returns array of all values in the dictionary
   */
  this.values = function()
  {
    var values = [];
    for (var k in items)
    {
      if (this.has(k))
      {
        values.push(items[k]);
      }
    }
    return values;
  };
  /**
   * getItems - returns the items object 
   */
  this.getItems = function()
  {
    return items;
  };
}

function testDictionary()
{
  console.log('-----------------');
  console.log("TESTING DICTIONARY");
  var dictionary = new Dictionary();
  dictionary.set('Gandalf', 'gandalf@email.com');
  dictionary.set('John', 'johnsnow@email.com');
  dictionary.set('Tyrion', 'tyrion@email.com');
  console.log(dictionary.has('Gandalf'));
  console.log(dictionary.size());
  console.log(dictionary.keys());
  console.log(dictionary.values());
  console.log(dictionary.get('Tyrion'));
  dictionary.remove('John');
  console.log(dictionary.keys());
  console.log(dictionary.values());
  console.log(dictionary.getItems());
}