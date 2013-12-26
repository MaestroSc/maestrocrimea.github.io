function getRandom() //Функция возвращающая случайное число
{
  return Math.floor(Math.random() * 100);
}

var RandomNum = new Array();

var filling = function () //Функция заполняющая массив случайными значениями
{
	document.getElementById('result_field').value =''; 
	for(var i=0; i<10; i++)
	{
		RandomNum[i] = getRandom();
		document.getElementById('result_field').value += RandomNum[i] + ' ';
	}
	document.getElementById('result_field').value +='\r\r'; 
	document.getElementById('but_sort').disabled = false;
}

var sorting = function () //Функция сортирующая пузырьковым методом
{
	var temp;
	for(var i=0; i<10; i++)
	{
		for(var j=0; j<10; j++)
		{
			if(RandomNum[i] > RandomNum[j])
			{
				temp = RandomNum[i];
				RandomNum[i] = RandomNum[j];
				RandomNum[j] = temp;
			}
		}
	}
	for(i=9; i>=0; i--)
	{
		document.getElementById('result_field').value += RandomNum[i] + ' ';
	}
	document.getElementById('but_sort').disabled = true;
}