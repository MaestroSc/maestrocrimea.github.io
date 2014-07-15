window.onload = function() {

  var ImgList = document.getElementsByClassName('gallery-list-main')[0], // Блок списка миниатюр
      WidthGalery = document.getElementsByClassName('gallery')[0], // Ширина галлереи
      countImage = 1; // счётчик кол-ва картинок

  document.body.addEventListener('click', function(event) {
    if (event.target.className.search('gallery-nav-left') != -1) galleryLeftScroll();
    if (event.target.className.search('gallery-nav-right') != -1) galleryRightScroll();
  });

  document.getElementsByClassName('gallery-nav-right')[0].style.marginLeft = WidthGalery.clientWidth - 30 + "px";

  window.addEventListener('resize', function(){
    document.getElementsByClassName('gallery-nav-right')[0].style.marginLeft = WidthGalery.clientWidth - 30 + "px";
  });

  ImgList.style.transition = '.3s';
  loadImageList(countImage);
 

  function galleryLeftScroll(){
    var sizeImgLine = 104 * (countImage - 1) + 8 - (ImgList.style.left).replace(/px/, '')*(-1);
    
    if (sizeImgLine - 8 > (parseInt(WidthGalery.clientWidth, 10) - 60)){

      if((sizeImgLine - 8 - parseInt(WidthGalery.clientWidth, 10) + 60) % 104 == 0){
        ImgList.style.left = (ImgList.style.left).replace(/px/, '') - 104 + 'px';
      }
      else{
        ImgList.style.left = (ImgList.style.left).replace(/px/, '') - ((sizeImgLine - 8 - parseInt(WidthGalery.clientWidth, 10) + 60) % 104) + 'px';
    }
    }
  }


  function galleryRightScroll(){
    var sizeImgLine = 102 * (countImage - 1) + 30 - (ImgList.style.left).replace(/px/, '')*(-1);
    
    if((ImgList.style.left).replace(/px/, '')*(-1) > 0){
      if ((ImgList.style.left).replace(/px/, '')*(-1) % 104 == 0){
        ImgList.style.left = parseInt((ImgList.style.left).replace(/px/, ''), 10) + 104 + 'px';
      }
      else{
        ImgList.style.left = parseInt((ImgList.style.left).replace(/px/, ''), 10) + (ImgList.style.left).replace(/px/, '')*(-1) % 104 + 'px'
      }
    }
  }


  function loadImageList(countImageF){
    var newImg = new Image();
    newImg.src = 'img/photo'+ countImageF +'.jpg';
    newImg.onload = function(){
      ImgList.innerHTML += '<div class="gallery-list-item" style="background: url(img/photo' + countImage + '.jpg); background-size: cover; background-position: center;" width="100px">';
      ImgList.style.width = countImage * 102 + 30 + "px";
      countImage++;
      loadImageList(countImage);
    } 
  }

  

}
