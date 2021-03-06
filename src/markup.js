import { galleryEl } from './index.js';
function appendPicturesMarkup(hits){
    galleryEl.insertAdjacentHTML('beforeend', 
    hits.map( ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card">
        <div class="photo-container">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" class="gallery__image" />
        </div>
        <div class="info">
          <p class="info-item">
            <b>Likes: ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views: ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads: ${downloads}</b>
          </p>
        </div>
      </div>`
    }).join(''));
}

function clearPage(){
    galleryEl.innerHTML = '';
}

export {appendPicturesMarkup, clearPage};