var get_result = function()
{
	var myText = new mL(document.getElementById('input_date').value);
	if (document.getElementById('iVowels').checked == true){
		document.getElementById('output_date').value = myText.vowels();
	}
	if (document.getElementById('iConsonant').checked == true){
		document.getElementById('output_date').value = myText.consonant();
	}
	if (document.getElementById('iSyllable').checked == true){
		document.getElementById('output_date').value = myText.syllable();
	}
	if (document.getElementById('iWordCount').checked == true){
		document.getElementById('output_date').value = myText.wordCount();
	}
	if (document.getElementById('iPrefix').checked == true){
		document.getElementById('output_date').value = myText.prefix();
	}
};

function turn1 (){
	document.getElementById('iVowels').checked = true;
}

function turn2 (){
	document.getElementById('iConsonant').checked = true;
}

function turn3 (){
	document.getElementById('iSyllable').checked = true;
	document.getElementById('input_date').value = 'Текст для проверки функции, разбивающей слово на слоги.';
}

function turn4 (){
	document.getElementById('iWordCount').checked = true;
}

function turn5 (){
	document.getElementById('iPrefix').checked = true;
	document.getElementById('input_date').value = 'Разрешить, расписать, сумрак, противовоздушный, прибежать.';
}