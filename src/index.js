import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { UnsplashApi } from './api';
// const BASE_URL = 'https://pixabay.com/api/';
// const API_KEY = '31174976-e4ea20c1e3f3139c1b6ab1378';

const searchFormEl = document.querySelector('#search-form');

const galleryListEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');

const unsplashApi = new UnsplashApi();

const onSearchFormSubmit = event => {
  event.preventDefault();

  const searchQuery = event.currentTarget.elements.searchQuery.value;
  unsplashApi.q = searchQuery;

  unsplashApi
    .fetchGallery()
    .then(data => {
      if (data.hits.length === 0) {
        Notiflix.Notify.info(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      createMarkup(data.hits);
      loadMoreBtnEl.classList.remove('is-hidden');
    })
    .catch(err => {
      console.log(err);
    });
};

const onLoadMoreBtnClick = () => {
  unsplashApi.page += 1;

  unsplashApi
    .fetchGallery()
    .then(({ data }) => {
      if (unsplashApi.page === data.total_pages) {
        loadMoreBtnEl.classList.add('is-hidden');
      }

      galleryListEl.insertAdjacentHTML += createMarkup(data.hits);
    })
    .catch(err => {
      console.log(err);
    });
};

function createMarkup(photo) {
  const markup = photo.map(
    rest =>
      `
      <div class="photo-card">
      <a class="gallery-item" href="${rest.largeImageURL}">
      <img src="${rest.webformatURL}" alt="${rest.tags}" class="gallery-img" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
          "${rest.likes}" 
        </p>
        <p class="info-item">
          <b>Views</b>
          "${rest.views}" 
        </p>
        <p class="info-item">
          <b>Comments</b>
          "${rest.comments}" 
        </p>
        <p class="info-item">
          <b>Downloads</b>
          "${rest.downloads}" 
        </p>
      </div>
    </div>
             `
  );
  galleryListEl.insertAdjacentHTML('beforeend', markup.join(''));
}
searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);
