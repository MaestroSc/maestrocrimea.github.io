window.onload = function() {

  var imgList = document.getElementsByClassName('gallery-list-main')[0], // Блок списка миниатюр
      widthGallery = document.getElementsByClassName('gallery')[0], // Ширина галлереи
      galleryShow = document.getElementsByClassName('gallery-show-window-img')[0], // Главное фото в просмотрщике
      galleryRightNav = document.getElementsByClassName('gallery-nav-right')[0], // Навигация списка миниатюр вправо
      widthShowWindow = document.getElementsByClassName('gallery-show-window')[0], // Ширина области обозревателя фото
      leftGalleryPhoto = document.getElementsByClassName('gallery-prev-photo')[0], // Предыдущее фото
      rightGalleryPhoto = document.getElementsByClassName('gallery-next-photo')[0], // Следующее фото
      countImage = 1; // счётчик кол-ва картинок
      

  document.body.addEventListener('click', function(event) {
    if (event.target.className.search('gallery-nav-right') != -1) galleryLeftScroll();
    if (event.target.className.search('gallery-nav-left') != -1) galleryRightScroll();
    if (event.target.className.search('gallery-list-item') != -1) listSelectImg(event.target);
    if (event.target.className.search('gallery-next-photo') != -1) changePhoto(true);
    if (event.target.className.search('gallery-prev-photo') != -1) changePhoto(false);
  });

  galleryRightNav.style.marginLeft = widthGallery.clientWidth - 30 + "px"; //правая стрелка списка миниатюр


  window.addEventListener('resize', function(){
    galleryRightNav.style.marginLeft = widthGallery.clientWidth - 30 + "px";
    // changeButtonNav(galleryShow.clientHeight);
  });

  imgList.style.transition = '.3s';
  loadImageList(countImage);
 
  // function changeButtonNav(hDiv){ // Размещение невидимых кнопок перелистывания фото
  //   leftGalleryPhoto.style.width = rightGalleryPhoto.style.width = widthGallery.clientWidth / 2 - 10 + "px";
  //   leftGalleryPhoto.style.height = hDiv + 4 + "px";
  //   rightGalleryPhoto.style.height = hDiv + 4 + "px";
  // }

  function galleryLeftScroll(){ // Скролл миниатют влево
    var sizeImgLine = 104 * (countImage - 1) + 8 - (imgList.style.left).replace(/px/, '')*(-1);
    
    if (sizeImgLine - 8 > (parseInt(widthGallery.clientWidth, 10) - 60)){

      if((sizeImgLine - 8 - parseInt(widthGallery.clientWidth, 10) + 60) % 104 == 0){
        imgList.style.left = (imgList.style.left).replace(/px/, '') - 104 + 'px';
      }
      else{
        imgList.style.left = (imgList.style.left).replace(/px/, '') - ((sizeImgLine - 8 - parseInt(widthGallery.clientWidth, 10) + 60) % 104) + 'px';
    }
    }
  }


  function galleryRightScroll(){// Скролл миниатют вправо
    var sizeImgLine = 102 * (countImage - 1) + 30 - (imgList.style.left).replace(/px/, '')*(-1);
    
    if((imgList.style.left).replace(/px/, '')*(-1) > 0){
      if ((imgList.style.left).replace(/px/, '')*(-1) % 104 == 0){
        imgList.style.left = parseInt((imgList.style.left).replace(/px/, ''), 10) + 104 + 'px';
      }
      else{
        imgList.style.left = parseInt((imgList.style.left).replace(/px/, ''), 10) + (imgList.style.left).replace(/px/, '')*(-1) % 104 + 'px'
      }
    }
  }


  function loadImageList(countImageF){ // Загрузка списка миниатюр
    var newImg = new Image();
    newImg.src = 'img/photo'+ countImageF +'.jpg';
    newImg.onload = function(){
      if (countImage == 1)
      { 
        galleryShow.src = 'img/photo1.jpg';
        // changeButtonNav(newImg.height);
      }
      imgList.innerHTML += '<div class="gallery-list-item" style="background: url(img/photo' + countImage + '.jpg); background-size: cover; background-position: center;" width="100px">';
      imgList.style.width = countImage * 102 + 30 + "px";
      countImage++;
      loadImageList(countImage);
    } 
  }


  function listSelectImg(parentDiv){ // Вывод миниатюры в окно
    var temp = parentDiv.style.backgroundImage;
    temp = temp.replace('url(','').replace(')','');
    temp = temp.replace('"','').replace("'","");
    galleryShow.src = temp.substr(0, temp.indexOf('.jpg') + 4);
    galleryShow.onload = function(){
      // changeButtonNav(galleryShow.height)
    };
  } 

  function changePhoto(bool){ // Перелистывание фото с окна обозревателя
    thisNumber = galleryShow.getAttribute('src');

    if (thisNumber.substr(thisNumber.length - 6, 1) % 2)
    {
      thisNumber = thisNumber.substr(thisNumber.length - 6, 2);    
    }
    else{
      thisNumber = thisNumber.substr(thisNumber.length - 5, 1);
    }

    if (bool){
      thisNumber = parseInt(thisNumber, 10) + 1;
      if (thisNumber <= countImage - 1) galleryShow.src= 'img/photo' + thisNumber + '.jpg';
    }
    else{
      thisNumber = parseInt(thisNumber, 10) - 1;
      if (thisNumber > 0) galleryShow.src= 'img/photo' + thisNumber + '.jpg';
    }
    galleryShow.onload = function(){
      // changeButtonNav(galleryShow.height);
    }
  }


}
