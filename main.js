document.addEventListener("DOMContentLoaded", function()
{
	var list_data = [
		"Mercury",
		"Venus",
		"Earth",
		"Mars",
		"Jupiter",
		"Saturn",
		"Uranus",
		"Neptune",
		"Pluto"
	];
	
	var ll_planets = new LinkedList();
	for (var i = 0; i < list_data.length; i++)
	{
		ll_planets.add(list_data[i]);
	}
	
	ll_planets.display();
	
	ll_planets.insert('Eden Prime', new Node('Jupiter'));
	ll_planets.insert('Virmire', new Node('Noveria'));
	ll_planets.display();
	console.log("Is there a planet Earth: " + ll_planets.has(new Node('Earth')));
});