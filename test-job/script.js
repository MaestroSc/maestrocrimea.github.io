window.onload = function() {

  var imgList = document.getElementsByClassName('gallery-list-main')[0], // Блок списка миниатюр
      widthGallery = document.getElementsByClassName('gallery')[0], // Ширина галлереи
      galleryShow = document.getElementsByClassName('gallery-show-window-img')[0],
      widthShowWindow = document.getElementsByClassName('gallery-show-window')[0],
      countImage = 1; // счётчик кол-ва картинок
      

  document.body.addEventListener('click', function(event) {
    if (event.target.className.search('gallery-nav-right') != -1) galleryLeftScroll();
    if (event.target.className.search('gallery-nav-left') != -1) galleryRightScroll();
    if (event.target.className.search('gallery-list-item') != -1) listSelectImg(event.target);
  });

  document.getElementsByClassName('gallery-nav-right')[0].style.marginLeft = widthGallery.clientWidth - 30 + "px";

  window.addEventListener('resize', function(){
    document.getElementsByClassName('gallery-nav-right')[0].style.marginLeft = widthGallery.clientWidth - 30 + "px";
  });

  imgList.style.transition = '.3s';
  loadImageList(countImage);
 

  function galleryLeftScroll(){
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


  function galleryRightScroll(){
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


  function loadImageList(countImageF){
    var newImg = new Image();
    newImg.src = 'img/photo'+ countImageF +'.jpg';
    newImg.onload = function(){
      if (countImage == 1) galleryShow.src = 'img/photo1.jpg';
      imgList.innerHTML += '<div class="gallery-list-item" style="background: url(img/photo' + countImage + '.jpg); background-size: cover; background-position: center;" width="100px">';
      imgList.style.width = countImage * 102 + 30 + "px";
      countImage++;
      loadImageList(countImage);
    } 
  }


  function listSelectImg(parentDiv){
    galleryShow.src = parentDiv.style.backgroundImage.substring(4, parentDiv.style.backgroundImage.length - 1);
  }    
}
