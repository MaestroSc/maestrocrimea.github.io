var fibo = function () // Функция вывода элемента последовательности
{
	var fb_ne = document.getElementById('num_element').value;
	if (fb_ne < 1)
	{
		document.getElementById('result_field').value = "Введите число > 0.";
	}
	if (fb_ne == 1)
	{
		document.getElementById('result_field').value = 0;
	}
	if (fb_ne == 2)
	{
		document.getElementById('result_field').value = 1;
	}
	if (fb_ne > 2) //Если заданный номер < 3, то выводим последовательность вручную, так как эти два значения являются задающими для последовательности. Если больше - используем для этого цикл.
	{		
		var fn_a = 0, fn_b = 1, fn_now; 
		for (var i=3; i <= fb_ne; i++)
		{
			fn_now = fn_a + fn_b;
			fn_a = fn_b;
			fn_b = fn_now;
		}
		document.getElementById('result_field').value = ("n-ый элемент:\r" + fn_now);
	}
}

var fibo_full = function () //Функция вывода всей последовательности
{
	var fb_ne = document.getElementById('num_element').value;
	if (fb_ne < 1)
	{
		document.getElementById('result_field').value = "Введите число > 0.";
	}
	if (fb_ne == 1)
	{
		document.getElementById('result_field').value = 0;
	}
	if (fb_ne == 2)
	{
		document.getElementById('result_field').value = ("0 " + "1 ");
	}
	if (fb_ne > 2)//Если заданный номер < 3, то выводим последовательность вручную, так как эти два значения являются задающими для последовательности. Если больше - используем для этого цикл.
	{		
		var fn_a = 0, fn_b = 1, fn_now; 
		document.getElementById('result_field').value = ("0 " + "1 ");
		for (var i=3; i <= fb_ne; i++)
		{
			fn_now = fn_a + fn_b;
			fn_a = fn_b;
			fn_b = fn_now;
			document.getElementById('result_field').value += (fn_now + " ");
		}
	}
}