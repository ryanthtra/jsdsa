/*
Custom set based on the ES6 version.
Stores items as a [key, key] pair.
*/

function Set_()
{
  var items = {};
  
  /**
   * @add - Adds new item to the set.
   * @param value - The value of item to be added.
   * @return - true if the item was successfully added
   */
  this.add = function(value)
  {
    if (!this.has(value))
    {
      items[value] = value; // Item's value will also be the key.
      return true;
    }
    return false;  // Trying to add a duplicate item.
  };
  /**
   * @remove - Remove a value from the set.
   * @param value - The value to be removed.
   * @return - True is the value was successfully removed.
   */
  this.remove = function(value)
  {
    if (this.has(value))
    {
      delete items[value];
      return true;
    }
    return false;
  };
  /**
   * @has - does the set have the value?
   * @param value - the value we're looking for
   * @return - true if value is found
   */
  this.has = function(value)
  {
    return items.hasOwnProperty(value);
  };
  /**
   * @Clear - clears the set of all items
   */
  this.clear = function()
  {
    items = {};
  };
  /**
   * @size - get the number of items in the set
   * NOTE: this implementation works only in ES5+
   */
  this.size = function()
  {
    return Object.keys(items).length;
  };
  /**
   * @sizeLegacy - implementation of size friendlier to older browsers 
   */
  this.sizeLegacy = function()
  {
    var count = 0;
    for (var prop in items)
    {
      if (items.hasOwnProperty(prop))
        ++count;
    }
    return count;
  }
  /**
   * @values
   * NOTE - works only on modern browsers
   */
  this.values = function()
  {
    return Object.keys(items);
  };
  /**
   * @valuesLegacy
   * NOTE - version of values method that works on all browsers.
   */
  this.valuesLegacy = function()
  {
    var keys = [];
    for (var key in items)
    {
      keys.push(key);
    }
    return keys;
  };
  /**
   * @print
   */
  this.print = function()
  {
    console.log(items);
  };
  
  /**
   * @union - unionizes this set with another set
   * @param otherSet - the other set 
   * @return - set of items which are in this set and/or in the other set.
   */
  this.union = function(otherSet)
  {
    var unionSet = new Set();
    
    var values = this.values();
    for (let i = 0; i < values.length; i++)
    {
      unionSet.add(values[i]);
    }
    values = otherSet.values();
    for (let i = 0; i < values.length; i++)
    {
      unionSet.add(values[i]);
    }
    
    return unionSet;
  };
  /**
   * @intersection - intersects this set with another set
   * @param otherSet
   * @return - set of items which are in both sets
   */
  this.intersection = function(otherSet)
  {
    var intersectionSet = new Set_();
    
    var values = this.values();
    for (let i = 0; i < values.length; i++)
    {
      if (otherSet.has(values[i]))
      {
        intersectionSet.add(values[i]);
      }
    }
    return intersectionSet;
  };
  /**
   * @difference - finds difference between this set and the other set
   * @param otherSet - the other set.
   * @return - the set of items that are only in this set.
   */
  this.difference = function(otherSet)
  {
    var differenceSet = new Set_();
    
    var values = this.values();
    for (let i = 0; i < values.length; i++)
    {
      if (!otherSet.has(values[i]))
      {
        differenceSet.add(values[i]);
      }
    }
    return differenceSet;
  };
  /**
   * @subset - sees if this set is a subset of the other set
   * @param otherSet - the other set
   * @return - true if all the items in this set are in the other set
   */
  this.subset = function(otherSet)
  {
    if (this.size() > otherSet.size()) return false;
    else
    {
      var values = this.values();
      for (let i = 0; i < values.length; i++)
      {
        // immediately return false if any item isn't in the other set
        if (!otherSet.has(values[i])) return false;
      }
      return true;
    }
  };
}


/**
 * @testSet
 */
function testSet()
{
  var set = new Set_();
  set.add(1);
  console.log(set.values());
  console.log(set.has(1));
  console.log(set.size());
  set.add(2);
  console.log(set.values());
  console.log(set.has(2));
  console.log(set.size());
  set.remove(1);
  console.log(set.values());
  set.remove(2);
  console.log(set.values());
  console.log('-------------------');
  console.log("TESTING UNION");
  var setA = new Set_();
  setA.add(1);
  setA.add(2);
  setA.add(3);
  var setB = new Set_();
  setB.add(3);
  setB.add(4);
  setB.add(5);
  setB.add(6);
  var unionAB = setA.union(setB);
  console.log(unionAB.values());
  console.log('-------------------');
  console.log("TESTING INTERSECTION");
  setA.clear();
  setA.add(1);
  setA.add(2);
  setA.add(3);
  setB.clear();
  setB.add(2);
  setB.add(3);
  setB.add(4);
  var intersectionAB = setA.intersection(setB);
  console.log(intersectionAB.values());
  console.log('-------------------');
  console.log("TESTING DIFFERENCE");
  var differenceAB = setA.difference(setB);
  console.log(differenceAB.values());
  console.log('-------------------');
  console.log("TESTING SUBSET");
  setA.clear();
  setA.add(1);
  setA.add(2);
  setB.clear();
  setB.add(1);
  setB.add(2);
  setB.add(3);
  var setC = new Set_();
  setC.add(2);
  setC.add(3);
  setC.add(4);
  console.log(setA.subset(setB));
  console.log(setA.subset(setC));
}