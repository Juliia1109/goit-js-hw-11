export { createMarkup };
const galleryListEl = document.querySelector('.gallery');
function createMarkup(images) {
  const markup = images
    .map(image => {
      const {
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;
      return `
      
<div class="photo-card">
<a class="gallery-item" href="${largeImageURL}">
<img src="${webformatURL}" alt="${tags}" class="gallery-image" loading="lazy" />
<div class="info">
  <p class="info-item">
    <b>Likes</b>
    "${likes}" 
  </p>
  <p class="info-item">
    <b>Views</b>
    "${views}" 
  </p>
  <p class="info-item">
    <b>Comments</b>
    "${comments}" 
  </p>
  <p class="info-item">
    <b>Downloads</b>
    "${downloads}" 
  </p>
</div>
</a>
</div>

       `;
    })
    .join('');
  galleryListEl.insertAdjacentHTML('beforeend', markup);
}
