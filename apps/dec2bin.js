function divideBy2(decNumber)
{
	var rem_stack = new Stack(),
		 	rem,
			binary_string = '';
			
	while (decNumber > 0)
	{
		rem = Math.floor(decNumber % 2);
		rem_stack.push(rem);
		decNumber = Math.floor(decNumber / 2);
	}
	
	while (!rem_stack.isEmpty())
	{
		binary_string += rem_stack.pop().toString();
	}
	
	return binary_string;
}

function baseConverter(decNumber, base)
{
	var remainder_stack = new Stack(),
			remainder,
			base_string = '',
			digits = '0123456789ABCDEF';
			
	while (decNumber > 0)
	{
		remainder = Math.floor(decNumber % base);
		remainder_stack.push(remainder);
		decNumber = Math.floor(decNumber / base);
	}
	
	while (!remainder_stack.isEmpty())
	{
		base_string += digits[remainder_stack.pop()];
	}
	
	return base_string;
}