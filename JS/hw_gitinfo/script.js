document.body.getElementsByTagName('button')[0].addEventListener('click', getXmlHttp);
document.body.getElementsByTagName('input')[0].addEventListener('keydown', function(e){
    if (e.keyCode == 13) {
       return getXmlHttp();
    }

});

function getXmlHttp(){
	var inLogin = document.getElementsByTagName('input')[0].value,
		outData = document.getElementById('outInfo'),
		outLine = document.getElementsByClassName('lineOut'),
		outRepo = document.getElementById('outRepo'),
		outImg = document.getElementById('avatar'),
		clientData, i, strRepo;

	function getMainData() { //функция парсит: имя, email, кол-во фолловеров и аватар, записывает в localStorage, и размещает на странице
		var xhr = new XMLHttpRequest();

		xhr.open('GET', 'https://api.github.com/users/'+inLogin);

		xhr.onreadystatechange = function() {
    		if (xhr.readyState != 4) return;
	    	
	    	clientData = JSON.parse(xhr.responseText);

	    	if (clientData.message != undefined){ //Проверка страницы на существование
	    		outRepo.innerHTML = '<span class="errorInfo">Такого пользователя не существует</span>';
	    		outData.style.display = 'none';
	    		localStorage.setItem(inLogin, false); //Проверка на существование страницы
	    	} else{
	    		localStorage.setItem(inLogin, true);
	    		outData.style.display = 'block';
	    		outImg.style.display = 'block';

	    		localStorage.setItem(inLogin+'Img', clientData.avatar_url);
	    		outImg.src = clientData.avatar_url;

	    		localStorage.setItem(inLogin+'Name', clientData.name);
	    		outLine[0].innerHTML = '<span>Имя: </span>' + clientData.name;

	    		if ((clientData.email == null) || (clientData.email == '')){
	    			localStorage.setItem(inLogin+'Email', 'нет информации');
	   	 			outLine[1].innerHTML = '<span>Email:</span> нет информации';
	   			} else {
	   	 			outLine[1].innerHTML = '<span>Email: </span>' + clientData.email;
	   	 			localStorage.setItem(inLogin+'Email', clientData.email);
	   			}

	 			localStorage.setItem(inLogin+'Foll', clientData.followers);
	    		outLine[2].innerHTML = '<span>Фолловеров: </span>'+clientData.followers + '<hr>';

	    	}
		};

		xhr.send();
	}

	function getRepoData() { //Функция парсит публичные репозитории
		var xhr = new XMLHttpRequest();

		xhr.open('GET', 'https://api.github.com/users/'+inLogin+'/repos');

		xhr.onreadystatechange = function() {
    		if (xhr.readyState != 4) return;

	    	clientData = JSON.parse(xhr.responseText);

	    	if (clientData.message == undefined){
	    		outRepo.innerHTML = '<span>Репозитории: </span><br>';
	    		
	    		strRepo = '';
	    		clientData.forEach(function(elem, i){
	    			outRepo.innerHTML += '<a href="'+clientData[i].html_url+'">'+ clientData[i].name + '</a>';
	    			strRepo += '<a href="'+clientData[i].html_url+'">'+ clientData[i].name + '</a>';
	    		});
	   		}
	   		localStorage.setItem(inLogin+'Repo', strRepo);
	   		localStorage.setItem(inLogin+'Date', checkDate);
		};

		xhr.send();
	}

	//Проверка на кэш результата, и если они есть, на их актуальность (не прошли ли сутки с момента их создания)
	if ((localStorage.getItem(inLogin) == null) || (new Date() - new Date(localStorage.getItem(inLogin+'Date')) > 86400000)){
		getMainData();
		getRepoData();
	} else {
		if (localStorage.getItem(inLogin) == 'false'){
			outRepo.innerHTML = '<span class="errorInfo">Такого пользователя не существует</span>';
	    	outData.style.display = 'none';
		} else {
			outData.style.display = 'block';
	    	outImg.style.display = 'block';

	    	outImg.src = localStorage.getItem(inLogin+'Img');

	    	outLine[0].innerHTML = '<span>Имя: </span>' + localStorage.getItem(inLogin+'Name');

	    	outLine[1].innerHTML = '<span>Email: </span>'+localStorage.getItem(inLogin+'Email');

	    	outLine[2].innerHTML = '<span>Фолловеров: </span>'+localStorage.getItem(inLogin+'Foll') + '<hr>';
	    	outRepo.innerHTML = '<span>Репозитории: </span><br>'+localStorage.getItem(inLogin+'Repo');
		}
	}
	
}