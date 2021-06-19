import images from './gallery-items.js';

export const gallery=document.querySelector('.gallery');

let index=0;
const getIndex=()=>{
  for(let i=0; i<images.length; i+=1){
    return index+=1;
  }
}

export const allImages=images.map(({preview,original,description})=>
      `<li class="gallery__item">
         <a class="gallery__link" href=${original}>
            <img class="gallery__image" src=${preview} 
            data-source=${original} alt=${description}
            data-index=${getIndex()-1}>
         </a>
      </li>`
)

gallery.innerHTML=allImages.join('');

