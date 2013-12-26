var fnelement = function ()
{
	var fn_fe = document.getElementById('first_el').value;
	var fn_q = document.getElementById('q_p').value;
	var fn_ne = document.getElementById('in_n_el').value;

	if((fn_q != 0) && (fn_ne > 0))
	{
		document.getElementById('result_field').value = "Последовательность:\r";
		var fn_now_el = fn_fe;
		var fn_sum = 0;
		for(var i = 1; i <= fn_ne; i += 1)
		{
			document.getElementById('result_field').value += (fn_now_el + ' ');
			fn_sum += Number(fn_now_el); //Вычисление суммы прогрессии
			fn_now_el = fn_now_el * fn_q;// Вычисление порядкового члена прогрессии
		}
		document.getElementById('result_field').value += ("\r\rСумму арифметической прогрессии:\r" + fn_sum);
		document.getElementById('result_field').value += ("\r\rN-ый элемент:\r" + fn_now_el / fn_q);
	}
	else
	{
		document.getElementById('result_field').value = "Введены некорректные данные. Знаменатель прогрессии должен и номер элемента должны быть > 0.";
	}
}