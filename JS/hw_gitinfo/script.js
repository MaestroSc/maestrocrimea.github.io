document.body.getElementsByTagName('button')[0].addEventListener('click', getXmlHttp);
document.body.getElementsByTagName('input')[0].addEventListener('keydown', function(e){
    if (e.keyCode == 13) {
       return getXmlHttp();
    }

});

function getXmlHttp(){
	var inLogin = document.getElementsByTagName('input')[0].value,
		outData = document.getElementById('outInfo'),
		outName = document.getElementsByClassName('lineName')[0],
		outEmail = document.getElementsByClassName('lineEmail')[0],
		outFollow = document.getElementsByClassName('lineFollow')[0],
		outRepo = document.getElementById('outRepo'),
		outImg = document.getElementById('avatar'),
		clientData, i, strRepo,
		userInfo = {};

	function getMainData() { //функция парсит данные
		var xhr = new XMLHttpRequest();

		xhr.open('GET', 'https://api.github.com/users/'+inLogin);

		xhr.onreadystatechange = function() {
    		if (xhr.readyState != 4) return;
	    	
	    	clientData = JSON.parse(xhr.responseText);

	    	if (this.status == 404){ //Проверка страницы на существование
	    		outRepo.innerHTML = '<span class="errorInfo">Такого пользователя не существует</span>';
	    		outData.style.display = 'none';
	    		userInfo.loginStatus = false;
	    	} else{
	    		// Статус существования пользователя
	    		userInfo.loginStatus = true;
	    		outData.style.display = 'block';
	    		outImg.style.display = 'block';

	    		// Получения url аватара пользователя
	    		userInfo.avatar = outImg.src = clientData.avatar_url;

	    		// Получение имени пользователя
	    		userInfo.name = clientData.name;
	    		outName.innerHTML = '<span>Имя: </span>' + userInfo.name;

	    		// Получение Email пользователя
	    		if ((clientData.email == null) || (clientData.email == '')){
	    			userInfo.email = 'нет информации';
	   	 			outEmail.innerHTML = '<span>Email:</span> нет информации';
	   			} else {
	   				userInfo.email = clientData.email;
	   	 			outEmail.innerHTML = '<span>Email: </span>' + userInfo.email;
	   			}

	   			// Получение кол-ва фолловеров пользователя
	   			userInfo.followers = clientData.followers;
	    		outFollow.innerHTML = '<span>Фолловеров: </span>'+userInfo.followers + '<hr>';

				// Время кэширования данных
				userInfo.createTime = new Date();

	    		if (this.status == 200) {
           			// Получение публичных репозиториев
	    			getRepoData();
       			}
	    	}	    	
		};

		xhr.send();
	}

	function getRepoData() {
		var xhrIn = new XMLHttpRequest(),
			urlRepo;

		xhrIn.open('GET', 'https://api.github.com/users/'+inLogin+'/repos');

		xhrIn.onreadystatechange = function() {
	    	if (xhrIn.readyState != 4) return;

		    clientRepo = JSON.parse(xhrIn.responseText);

		    outRepo.innerHTML = '<span>Репозитории: </span><br>';
		    		
		    userInfo.repo = '';

		    clientRepo.forEach(function(elem, i){
		    	urlRepo = '<a href="'+clientRepo[i].html_url+'">'+clientRepo[i].name+'</a>';
		    	outRepo.innerHTML += urlRepo;
		    	userInfo.repo += urlRepo;
		    });
		    
		    if (this.status == 200) {
           		localStorage[inLogin] = JSON.stringify(userInfo);
       		}	    
		}

		xhrIn.send();

	}

	if (localStorage[inLogin]) userInfo = JSON.parse(localStorage[inLogin]);

	//Проверка на кэш результата, и если они есть, на их актуальность (не прошли ли сутки с момента их создания)
	if ((!userInfo.name) || (new Date() - new Date(userInfo.createTime) > 86400000)){
		getMainData(); // Функция парсинга данных пользователя
	} else {
		if (userInfo.loginStatus == false){
			outRepo.innerHTML = '<span class="errorInfo">Такого пользователя не существует</span>';
	    	outData.style.display = 'none';
		} else {
			outData.style.display = 'block';
	    	outImg.style.display = 'block';

	    	outImg.src = userInfo.avatar;

	    	outName.innerHTML = '<span>Имя: </span>' + userInfo.name;

	    	outEmail.innerHTML = '<span>Email: </span>'+ userInfo.email;

	    	outFollow.innerHTML = '<span>Фолловеров: </span>'+userInfo.followers + '<hr>';

	    	outRepo.innerHTML = '<span>Репозитории: </span><br>'+userInfo.repo;
		}
	}	
}