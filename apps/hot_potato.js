function hotPotato(name_list, num)
{
	var queue = new Queue();
	
	for (let i = 0; i < name_list.length; i++)
	{
		queue.enqueue(name_list[i]);
	}
	
	var eliminated = '';
	while (queue.size() > 1)
	{
		for (let i = 0; i < num; i++)
		{
			queue.enqueue(queue.dequeue());
		}
		eliminated = queue.dequeue();
		console.log(eliminated + ' was eliminated from the Hot Potato game.');
	}
	return queue.dequeue();
}