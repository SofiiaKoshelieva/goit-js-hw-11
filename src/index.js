import Notiflix from 'notiflix';
import NewsApiServise from './news-servise';
import { appendPicturesMarkup, clearPage } from './markup.js';

const newsApiServise = new NewsApiServise();
const formEl = document.querySelector('.search-form');
const inputEl = document.querySelector('input');
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
        buttonLoadEl.classList.add('more');
      }
      counter = 1;
      clearPage();
      appendPicturesMarkup(info);
      Notiflix.Notify.info(`Hooray! We found ${dataResponse.data.totalHits} images.`);
      if (counter * 40 >= dataResponse.data.totalHits) {
        buttonLoadEl.hidden = true;
        buttonLoadEl.classList.remove('more');
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function onBtnClick() {

  try {
    const dataResponse = await newsApiServise.fetchPhotos();
    const info = dataResponse.data.hits;
    if (counter * 40 >= dataResponse.data.totalHits) {
      Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
      buttonLoadEl.hidden = true;
      buttonLoadEl.classList.remove('more');
    } else if (info.length < 40) {
       appendPicturesMarkup(info);
      counter++;
      buttonLoadEl.hidden = true;
      buttonLoadEl.classList.remove('more');
    }
    else {
      appendPicturesMarkup(info);
        counter++;
    }
  } catch (error) {
    console.log(error);
  }
}

