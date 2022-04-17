import Notiflix from 'notiflix';
import NewsApiServise from './news-servise';
import { appendPicturesMarkup, clearPage } from './markup.js';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
const galleryApiService = new NewsApiServise();


const newsApiServise = new NewsApiServise();
const formEl = document.querySelector('.search-form');
const inputEl = document.querySelector('input');
const total = newsApiServise.fetchPhotos();
// const buttonLoadEl = document.querySelector('.load-more');
 const buttonLoadEl = document.querySelector('.tui-pagination');
export const galleryEl = document.querySelector('.gallery');
let counter = 1;
buttonLoadEl.hidden = true;

formEl.addEventListener('submit', onFormSubmit);
// buttonLoadEl.addEventListener('click', onBtnClick);
async function onFormSubmit(e) {
  e.preventDefault();
  newsApiServise.query = e.currentTarget.elements.query.value;
  newsApiServise.resetPage();
  const inputValue = inputEl.value;
  if (inputValue.trim() === '') {
    return Notiflix.Notify.warning('Please enter request');
  }
  try {
    const dataResponse = await newsApiServise.fetchPhotos();
    const info = dataResponse.data.hits;

    if (info.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
    } else {
      if (dataResponse.data.totalHits > 40) {
        buttonLoadEl.hidden = false;

      }
      counter = 1;
      clearPage();
      appendPicturesMarkup(info);
      Notiflix.Notify.info(`Hooray! We found ${dataResponse.data.totalHits} images.`);
      // if (counter * 40 >= dataResponse.data.totalHits) {
      //   // buttonLoadEl.hidden = true;
      //   // buttonLoadEl.classList.remove('more');
      // }
    }
  } catch (error) {
    console.log(error);
  }
}



const options = {
  totalItems: 1000,
        itemsPerPage: 7,
        visiblePages: 7,
        centerAlign: false,
  page: 1,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
};

const pagination = new Pagination('pagination', options);
pagination.on('afterMove', async e => {
  clearHitsContainer();
  const a = await galleryApiService.fetchPhotos();
  const { data } = a;
  const { page } = e;

  appendHitsMarkup(data.hits);
});
const refs = {
  formEl: document.querySelector('#search-form'),
  btnSubmit: document.querySelector('.btn-submit'),
  divGallery: document.querySelector('.gallery'),
  containerEl: document.querySelector('.container'),

};
function appendHitsMarkup(hits) {
  refs.divGallery.insertAdjacentHTML('beforeend', appendPicturesMarkup(hits));
}

function clearHitsContainer() {
  refs.divGallery.innerHTML = '';
}

