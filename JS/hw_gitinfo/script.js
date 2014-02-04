function getXmlHttp(){
	var inLogin = document.getElementsByTagName('input')[0].value,
		outData = document.getElementById('outInfo'),
		outRepo = document.getElementById('outRepo'),
		clientData, i;

	outData.innerHTML = '';

	function getMainData() {
		var xhr = new XMLHttpRequest();

		xhr.open('GET', 'https://api.github.com/users/'+inLogin);

		xhr.onreadystatechange = function() {
    		if (xhr.readyState != 4) return;
	    	
	    	clientData = JSON.parse(xhr.responseText);

	    	if (clientData.message != undefined){
	    		outData.innerHTML = '<div class="errorInfo">Такого пользователя не существует</div>';
	    		outRepo.style.display = 'none';
	    	} else{

	    		outRepo.style.display = 'block';
	    		outData.innerHTML = '<img src='+clientData.avatar_url+' alt="" >';
	    		outData.innerHTML += '<div class = lineOut><span>Имя:</span> ' + clientData.name + '</div>\n';

	    		if ((clientData.email == null) || (clientData.email == '')){
	   	 		outData.innerHTML += '<div class = lineOut><span>Email:</span> нет информации</div>\n';
	   			} else {
	   	 			outData.innerHTML += '<div class = lineOut><span>Email:</span> ' + clientData.email + '</div>\n';
	   			}

	    		outData.innerHTML += '<div class = lineOut><span>Фолловеров:</span> '+clientData.followers+'</div><hr>';
	    	}
		};

		xhr.send();
	}

	function getRepoData() {
		var xhr = new XMLHttpRequest();

		xhr.open('GET', 'https://api.github.com/users/'+inLogin+'/repos');

		xhr.onreadystatechange = function() {
    		if (xhr.readyState != 4) return;

	    	clientData = JSON.parse(xhr.responseText);

	    	if (clientData.message == undefined){
	    		outRepo.innerHTML = '<span>Репозитории:</span><br>';
	    	
	    		clientData.forEach(function(elem, i){
	    			outRepo.innerHTML += '<a href="'+clientData[i].html_url+'">'+ clientData[i].name + '</a>';
	    		});
	   		}
		};

		xhr.send();
	}

	getMainData();
	getRepoData();
}