export class UnsplashApi {
  API_KEY = '31174976-e4ea20c1e3f3139c1b6ab1378';
  BASE_URL = 'https://pixabay.com/api/';

  page = 1;
  q = null;

  fetchGallery() {
    const searchParams = new URLSearchParams({
      key: this.API_KEY,
      q: this.q,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: 40,
    });

    return fetch(`${this.BASE_URL}?${searchParams}`).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }
}
