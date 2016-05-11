/* Set is an ES6 class that includes these methods
add
delete - returns true if object was successfully removed
clear
size
has
values
forEach
new Set()
A Set is a collection of unique objects.
*/

function testSet()
{
	// add method
	var categories = new Set();
	categories.add('Sports');
	categories.add('Weather');
	categories.add('Sports'); // Not added, since it's not unique to what's already in the set.
	console.log(categories);
	console.log('***********************');
	
	// delete method
	var coords = new Set();
	coords.add({x: 10, y: 15});
	coords.add({x: 20, y: 16});
	coords.add({x: 30, y: 23});
	coords.add({x: 40, y: 108});
	console.log(coords);
	// Does not remove the object, since the target object is of a different reference.
	coords.delete({x: 20, y: 16});
	console.log(coords);
	// Here's a way to remove that object
	// This should remove the third and fourth object.
	coords.forEach(function(point) 
	{
		if (point.y > 20)
		{
			coords.delete(point);
		}
	});
	console.log(coords);
	console.log('***********************');
	
	// clear method
	var someSet = new Set();
	for (var i = 0; i < 100; i++)
	{
		someSet.add(i);
	}
	console.log(someSet.size);
	someSet.clear();
	console.log(someSet.size);
	console.log('***********************');
	
	// has method
	var dates = new Set();
	dates.add('2014-11-28');
	dates.add('2015-05-25');
	dates.add('2016-07-20');
	console.log(dates);
	console.log(dates.has('2015-09-08'));
	console.log(dates.has('2015-05-25'));
	console.log('***********************');
	
	// values method
	var colors = new Set();
	colors.add('red');
	colors.add('blue');
	colors.add('green');
	colors.add('blue');
	colors.add('red');
	console.log(colors);
	// Manually iterating
	console.log('-----------------------');
	var itr = colors.values();
	for (var c = itr.next(); !c.done; c = itr.next())
	{
		console.log(c.value);
	}
	console.log('-----------------------');
	// Using for..of loop
	for (var c of colors)
	{
		console.log(c);
	}
	console.log('-----------------------');
	// Using forEach
	colors.forEach(function(value, key, set)
	{
		console.log(value);
	});
}