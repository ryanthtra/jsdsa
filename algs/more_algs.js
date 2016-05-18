var recursion_count = 0;

function recursiveFn()
{
  recursion_count++;
  recursiveFn();
}

function testInfiniteRecursion()
{
  try
  {
    recursiveFn();
  }
  catch (ex)
  {
    alert('Recursion count = ' + recursion_count + ' error: ' + ex);
  }
}


/**
 * fibonacci - recursive version of the Fibonacci sequence
 */
function fibonacci(num)
{
  if (num === 1 || num === 2)
    return 1;
    
  return (fibonacci(num - 1) + fibonacci(num - 2));
}

/**
 * fib - non-recursive version of the Fibonacci sequence
 */
function fib(num)
{
  var n1 = 1,
      n2 = 1,
      n = 1;
      
  for (let i = 3; i <= num; i++)
  {
    n = n1 + n2;
    n1 = n2;
    n2 = n;
  }
  return n;
}

function testFibonacci(num)
{
  console.log('fib(' + num + ') = ' + fib(num));
  console.log('fibonacci(' + num + ') = ' + fibonacci(num));
}