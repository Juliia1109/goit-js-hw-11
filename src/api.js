import axios from 'axios';
export { unsplashApi };

async function unsplashApi(value, page) {
  const url = 'https://pixabay.com/api/';
  const key = '31174976-e4ea20c1e3f3139c1b6ab1378';
  const rest = `?key=${key}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;

  return await axios.get(`${url}${rest}`).then(response => response.data);
}
