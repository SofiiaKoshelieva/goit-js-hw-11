import Notiflix from 'notiflix';
import NewsApiServise from './news-servise';
import { appendPicturesMarkup, clearPage } from './markup.js';

const newsApiServise = new NewsApiServise();
const formEl = document.querySelector('.search-form');
const inputEl = document.querySelector('input');
const buttonSubmitEl = document.querySelector('button[type="submit"]');
const buttonLoadEl = document.querySelector('.load-more');
export const galleryEl = document.querySelector('.gallery');
let counter = 1;
buttonLoadEl.hidden = true;


formEl.addEventListener('submit', onFormSubmit);
buttonLoadEl.addEventListener('click', onBtnClick);
async function onFormSubmit(e) {
  e.preventDefault();
  newsApiServise.query = e.currentTarget.elements.query.value;
  newsApiServise.resetPage();
  const inputValue = inputEl.value
  if (inputValue === '') {
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
      counter = 1;
      clearPage();
      appendPicturesMarkup(info);
      buttonLoadEl.hidden = false;
      Notiflix.Notify.info(`Hooray! We found ${dataPictures.data.totalHits} images.`);
      if (counter * 40 >= dataResponse.data.totalHits) {
        buttonLoadEl.hidden = true;
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function onBtnClick() {
  counter++;
  try {
    const dataResponse = await newsApiServise.fetchPhotos();
    const info = dataResponse.data.hits;
    if (counter * 40 >= dataResponse.data.totalHits) {
      Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
      buttonLoadEl.hidden = true;
    } else {
      appendPicturesMarkup(info);
    }
  } catch (error) {
    console.log(error);
  }
}
