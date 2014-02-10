document.getElementById('button').addEventListener('click', StartPBar, true);

function StartPBar(){
    var ProBar = document.getElementById('progressGo'), //Зелёная полоса загрузки
        inPercent = document.getElementById('inputPercent'), //Инпут с значением процентов
        inDate = inPercent.value, //Значение инпута с процентами
        barPercentElem = document.getElementById('percentBar'), //элемент процентов на прогресс баре
        barPercentDate = barPercentElem.innerHTML.replace(/%/, ''), //Получение значения процентов с прогресс бара
        timeDuration, changeWidth;

    if (inDate > 100){
        inPercent.value='100';
        inDate = 100;
    }
    if (inDate < 0){
        inPercent.value='0';
        inDate = 0;
    }

        function MyResult(sign){ //Функция изменения числа процентов загрузки
            if (sign == -1){barPercentDate--} 
                      else {barPercentDate++}

            barPercentElem.innerHTML = barPercentDate+'%';
            if (barPercentDate != inDate){return setTimeout(function(){MyResult(sign)}, 50)};
            return true;
        }

    timeDuration = Math.abs(inDate - barPercentDate) * 0.05; //Время выполнения анимации
    ProBar.style.transitionDuration = timeDuration+'s';

    changeWidth = inDate * 210 / 100;   //Конечное изменение ширины полосы загрузки
    ProBar.style.width = changeWidth+'px';

    if (parseInt(inDate) > parseInt(barPercentDate)){
        MyResult(1);
    } else {
        if (inDate < barPercentDate){
            MyResult(-1);
        }
    }
}