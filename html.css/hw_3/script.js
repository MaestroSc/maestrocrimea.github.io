document.getElementById('button').addEventListener('click', StartPBar, true);

function StartPBar(){
    var ProBar = document.getElementById('progressGo'),
        inDate = document.getElementById('inputPercent').value,
        tempDateStr = document.getElementById('percentBar'),
        tempDate = tempDateStr.innerHTML.replace(/%/, ''),      
        max;
    if (inDate > 100){
        document.getElementById('inputPercent').value='100';
        inDate = 100;
    }
    if (inDate < 0){
        document.getElementById('inputPercent').value='0';
        inDate = 0;
    }

        function MyResult(sign){
            if (sign == -1){tempDate--} 
                      else {tempDate++}

            max = tempDate * 210 / 100; //Расчёт изменения колличества пикселей progress bar за 1 шаг
            ProBar.style.width = max+'px';
            tempDateStr.innerHTML = tempDate+'%';
            if (tempDate != inDate){return setTimeout(function(){MyResult(sign)}, 100)};
            return true;
        }

    if (parseInt(inDate) > parseInt(tempDate)){
        MyResult(1);
    } else {
        if (inDate < tempDate){
            MyResult(-1);
        }
    }
}