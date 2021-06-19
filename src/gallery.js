import images from './gallery-items.js';

const gallery=document.querySelector('.gallery');
const body=document.querySelector('body');
const lightbox =document.querySelector('.js-lightbox');
const lightboxImage=document.querySelector('.lightbox__image');
const lightboxCloseBtn=document.querySelector(`button[data-action="close-lightbox"]`);
const lightboxOverlay=document.querySelector('.lightbox__overlay');

let index=0;
const getIndex=()=>{
  for(let i=0; i<images.length; i+=1){
    return index+=1;
  }
}

const allImages=images.map(({preview,original,description})=>
      `<li class="gallery__item">
         <a class="gallery__link" href=${original}>
            <img class="gallery__image" src=${preview} 
            data-source=${original} alt=${description}
            data-index=${getIndex()-1}>
         </a>
      </li>`
)

gallery.innerHTML=allImages.join('');


const onImageClick=(e)=>{
  e.preventDefault();
  const galleryImg=e.target;
  if (e.target.nodeName!=='IMG'){
    return;
  }
  openLightbox(galleryImg);
}

gallery.addEventListener('click',onImageClick);

const setNewlightboxImage=(src="",alt = "",index = "")=>{
  lightboxImage.src=src;
  lightboxImage.alt=alt;
  lightboxImage.dataset.index=index;
}

const openLightbox=(galleryImg)=> {
  lightbox.classList.add('is-open');
  setNewlightboxImage(galleryImg.dataset.source, galleryImg.alt, galleryImg.dataset.index);

  body.style.overflow='hidden';

  lightboxCloseBtn.addEventListener('click',closeLightbox);
  lightboxOverlay.addEventListener('click',closeLightbox);
  document.addEventListener('keydown',pressEscToCloseLightbox);
  document.addEventListener('keydown',pressArrowRightLightbox);
  document.addEventListener('keydown',pressArrowLeftLightbox);
}

const closeLightbox=()=> {
  lightbox.classList.remove('is-open');
  setNewlightboxImage();

  lightboxCloseBtn.removeEventListener;
  lightboxOverlay.removeEventListener;
  document.removeEventListener;
}

const pressEscToCloseLightbox=(e)=>{
  if (e.code === 'Escape') {
    closeLightbox();
  }
}

const pressArrowRightLightbox=(e)=>{
  const nextImageIndex=`${Number(lightboxImage.dataset.index)+1}`;
  const nextImage=document.querySelector(`img[data-index='${nextImageIndex}']`);
    
  if (e.code === 'ArrowRight'&nextImageIndex<allImages.length)
  setNewlightboxImage(nextImage.dataset.source,nextImage.alt,nextImage.dataset.index);
}

const pressArrowLeftLightbox=(e)=>{
  const previousImageIndex=`${Number(lightboxImage.dataset.index)-1}`;
  const previousImage=document.querySelector(`img[data-index='${previousImageIndex}']`);
    
  if ( e.code === 'ArrowLeft'&previousImageIndex>=0)
  setNewlightboxImage(previousImage.dataset.source,previousImage.alt,previousImage.dataset.index);
}