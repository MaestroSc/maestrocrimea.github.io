/*
* MaestroLibrary для работы с текстом 1.0
* Список методов:
*	.vowels() - Метод нахождения гласных букв в тексте
*	.consonant() - Метод нахождения согласных букв в тексте
*	.syllable() - Метод разбиения слов на слоги
* 	.wordCount() - Метод определения колличества слов в тексте
*	.prefix() - Метод определения приставки у слова
*/


function mL_getLetter(gLArray, gLText, caseResult) { //Фунцкция поиска заданных букв
	var outArray = [], k = 0, i, j;
			outArray.length = 0; //Очищаем массив
			for (i = 0; i < gLText.length; i++){ //Цикл перебора текста
				top:{
					for (j = 0; j< gLArray.length; j++){ //Цикл перебора заданных букв
						if (gLText[i].toUpperCase() == gLArray[j].toUpperCase()){ // Сравнение заданных букв с символом текста
							outArray[k] = gLText[i]; // Если совпадают, то записываем букву в массив
							k++; // Счётчик заполнения массива
							break top; // прерывает дальнейший перебор для символа из текста
						};
					};
				};
			};
	if (caseResult == 0){
		return outArray;// Возвращаем совпадающие буквы	
	}
	else{
		return k;// Возвращаем колличество совпадающих букв
	}
	
}


function mL (inText){
	this.vowels = function () // Метод нахождения гласных букв в тексте
		{
			var array_vowels = ['о', 'а', 'е', 'и', 'у', 'я', 'ы', 'ю', 'э', 'ё']; // Выстроены в порядке уменьшения вероятности их использования.
			return mL_getLetter(array_vowels, inText, 0); //Передаём гласные буквы для сравнения. Возвращает массив с гласными из текста
		};

	this.consonant = function () // Метод нахождения согласных букв в тексте
		{
			var array_consonant = ['н', 'т', 'р', 'с', 'л', 'в', 'к', 'п', 'м', 'д', 'з', 'б', 'г', 'й', 'ч', 'х', 'ж', 'ш', 'ц', 'щ', 'ф']; // Выстроены в порядке уменьшения вероятности их использования.
			return mL_getLetter(array_consonant, inText, 0); //Передаём согласные буквы для сравнения. Возвращает массив с согласными из текста
		};

	this.syllable = function () // Метод разбиения слов на слоги
		{
			var wordArray = [], exitArray = [], countWord = 0, countWordT = 0, i, j, countSyllable,  tempK, array_vowels = ['о', 'а', 'е', 'и', 'у', 'я', 'ы', 'ю', 'э', 'ё'], tempWord, previous, tempArray = [], tempArray2 = [];
			var regexp = /^[а-яё]+$/i;
			/* Эта часть помещает каждое слово в отдельную ячейку массива*/
			for (i = 0; i < inText.length; i++){
				if (regexp.test(inText[i])){
					if (wordArray[countWordT] == undefined){
						wordArray[countWordT] = ''
						countWord++;
					}
					wordArray[countWordT] += inText[i];
				}
				else{
					countWordT = countWord;
				}
			}
			// ------------------------------------------------------------
			/*
			Эта часть представляет слово в виде цифр в массиве tempArray, заменя согласную на '1', 
			а гласную на '0'.
			Например, в таком виде слово "Проверка" будет иметь вид: 11010110
			Далее суммируем последовательные согласные,  и помещаем эти данные в массив tempArray2.
			В этом виде слово проверка уже будет иметь вид: 201020
			*/
			for (i = 0; i < wordArray.length; i++){ // Пробегаемся по массиву, в ячейках которого слова из текста
				tempWord = wordArray[i];
				if (exitArray[i] == undefined){
					exitArray[i] = '';
				}
				tempArray.length = 0;  //Чистим массив
				tempArray2.length = 0; //Чистим массив
				for (j = 0; j < wordArray[i].length; j++){ // Пробегаемся по каждой букве в слове
					if (tempArray[j] == undefined){ 
						tempArray[j] = '';
					}
					/*Отправляем в функцию mL_getLetter() массив с гласными, и индекс 1. Тогда, если она
					найдёт гласную, то вернёт 1, иначе вернёт 0*/
					if (mL_getLetter(array_vowels, tempWord[j], 1) == 1){ //соответственно записываем '1', или '0'
						tempArray[j] = 0;
					}
					else{
						tempArray[j] = 1;
					}
				}
				countK = 0;
				for (j = 0; j < wordArray[i].length; j++){ // В этом цикле суммируем последовательно идущие согласные буквы
					if (tempArray2[countK] == undefined){
						tempArray2[countK] = '';
					}
					if (tempArray[j] == 0){
						tempArray2[countK] = 0;
						countK++;
					}
					else{
						tempArray2[countK]++;
						if (tempArray[j + 1] == 0){
							countK++;
						}
					}
				}
				//-----------------------------------------------------------
				// В этой часте на основе данных массива tempArray2 разделяем слово на слоги
				// Часть1. Разбиение согласных:
				// Если подряд идёт чётное кол-во согласных, то делим их пополам, ставя между ними '-': нннн = нн-нн
				// Если подрят идёт нечётное кол-во согласных, то результат от целочисленного деления помещаем влево, а большую часть - вправо: ннн = н-нн
				//Если согласные стоят вначале слова, или в конце, то просто оставляем их без изменения

				countK = 0;
				for (j = 0; j < tempArray2.length; j++){
					top:{
						if (tempArray2[j] > 0){ // Если согласная
							if (tempArray2[j-1] == undefined){ // Если согласная в начале
								exitArray[i] += tempWord.substr(j,tempArray2[j]);
								break top;
							}
							else{
								if (tempArray2[j + 1] == undefined){ // Если согласная в конце
									exitArray[i] += tempWord.substr(countK , tempArray2[j]);
									break top;
								}
								else{
									if (tempArray2[j] % 2 == 0){ //Если подряд идущих согласных чётное кол-во
											exitArray[i] += tempWord.substr(countK,(tempArray2[j] / 2)) + '-' + tempWord.substr(countK + (tempArray2[j] / 2),tempArray2[j] / 2);
											break top;
									}
									else{
										if (tempArray2[j] == 1){//Если одна согласная
											exitArray[i] += '-' + tempWord.substr(countK , 1);
											break top;
										}
										else{//Если подряд идущих согласных нечётное кол-во
											exitArray[i] += tempWord.substr(countK ,((tempArray2[j] / 2) - 0.5)) + '-' + tempWord.substr(countK + (tempArray2[j] / 2) - 0.5,((tempArray2[j] / 2) + 0.5));
											break top;
										}
									}
								}
							}
						}
						// Часть2. Разбиение гласных:
						// Просто ставим на место
						// Если после гласной ещё одна гласная, то ставим в конце '-'
						if (tempArray2[j] == 0){
							if (tempArray2[j-1] == undefined){
								exitArray[i] += tempWord.substr(countK,1);
								if (tempArray2[j + 1] == 0){
									exitArray[i] += '-';
								}
							}
							else{
								exitArray[i] += tempWord.substr(countK,1);
								if (tempArray2[j + 1] == 0){
									exitArray[i] += '-';
								}
							}
						}
					}
					//Счётчик места установки буквы
					if (tempArray2[j] == 0){
						countK ++
					}
					else{
						countK += tempArray2[j];
					}
				}
			}
			return exitArray;
		};

	this.wordCount = function () // Метод определения колличества слов
		{
			var early_el = ' ', countK = 0, i;
			var regexp = /^[а-яё]+$/i; // Регулярное выражение для проверки на наличие русских букв
			for (i = 0; i < inText.length; i++){ //Прогебаемся циклом по каждому символу текста
				if (regexp.test(inText[i])) 
					{
					if (regexp.test(early_el)  == false) //Если текущий символ является русской буквой, и предыдущий не является русской буквой, то считаем что это слово
						{
						countK++;
						}
					}
				early_el = inText[i];
			}
			if (regexp.test(inText[inText.length])){countK++}; // Если последний элемент в тексте является русской буквой, то суммируем к счётчику слов +1
			return countK;
		};

	this.prefix = function () // Метод определения приставки у слова
		{
			var prefixArray = ['противо', 'внутри', 'предо', 'преди', 'сверх', 'среди', 'через', 'черес', 'испод', 'междо', 'между', 'ебез', 'небес', 'около', 'после', 'возо', 'надо', 'недо', 'низо', 'обез', 'обес', 'пере', 'подo', 'оза', 'пред', 'разо', 'чрез', 'без', 'бес', 'под', 'пра', 'пре', 'при', 'про', 'раз', 'рас', 'роз', 'ос', 'вне', 'воз', 'вос', 'все', 'взо', 'изо', 'кое', 'кой', 'меж', 'над', 'наи', 'низ', 'нис', 'обо', 'ото', 'сыз', 'тре', 'во', 'вз', 'вс', 'вы', 'до', 'за', 'из', 'ис', 'на', 'не', 'ни', 'об', 'от', 'па', 'по', 'со', 'су', 'у', 'в', 'к', 'о', 'с'], i, j, jin, tempWord ='', countWord = 0, countWordT = 0, countK = 0, exitArray = [], checkPref = 0, buffer;
			var regexp = /^[а-яё]+$/i;
			inText += ' '; 
			for (i = 0; i < inText.length; i++){ // Вытягиваем отдельное слово в переменную tempWord
				if (regexp.test(inText[i])){
					tempWord += inText[i];
				}
				else{
					if (tempWord != ''){
						check_2:{
							for (j = 0; j < prefixArray.length; j++){
								check_1:{
									/*Начинаем поочерёдно сравнивать каждую приставку с началом слова.
									 Если хотябы одна буква не совпадает, то прерываем проверку на эту 
									 приставку. Если же приставка полностью подходт слову, то прекращаем
									  дальнейший перебор.*/
									if (tempWord.length > prefixArray[j].length){
										checkPref = 0;
										buffer = prefixArray[j];
										for (jin = 0; jin < prefixArray[j].length; jin++){
											if (tempWord[jin].toUpperCase() == buffer[jin].toUpperCase()){
												checkPref = 1;
											}
											else{
												checkPref = 0;
												break check_1;
											}
										}
										if (checkPref == 1){
											exitArray[countK] = buffer + '-';
											countK++;
											break check_2;
										}
									}
								}
							}
						}
					}
					tempWord = '';
				}
			}

			return exitArray;
		}
}
