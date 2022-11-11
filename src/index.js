import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { unsplashApi } from './api';
import { createMarkup } from './markup';

const searchFormEl = document.querySelector('#search-form');
const galleryListEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);

let hits = 0;
let page = 1;
let searchQuery = '';

async function onSearchFormSubmit(event) {
  event.preventDefault();
  searchQuery = event.currentTarget.searchQuery.value.trim();
  page = 1;

  if (!searchQuery) {
    return;
  }

  const data = await unsplashApi(searchQuery, page);
  hits = data.hits.length;

  if (data.totalHits > 40) {
    loadMoreBtnEl.classList.remove('is-hidden');
  } else {
    loadMoreBtnEl.classList.add('is-hidden');
  }

  try {
    if (data.totalHits > 0) {
      outputInformation(data);
      galleryListEl.innerHTML = '';
      createMarkup(data.hits);
    }

    if (data.totalHits === 0) {
      galleryListEl.innerHTML = '';
      alertNothingEntered();
      loadMoreBtnEl.classList.add('is-hidden');
    }
  } catch (error) {
    console.log(error);
  }
}

async function onLoadMoreBtnClick() {
  page += 1;
  const data = await unsplashApi(searchQuery, page);
  createMarkup(data.hits);
  hits += data.hits.length;

  if (hits === data.totalHits) {
    loadMoreBtnEl.classList.add('is-hidden');
  }
}

function alertNothingEntered() {
  Notiflix.Notify.warning(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function outputInformation(data) {
  Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
}
