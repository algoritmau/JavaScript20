const photosContainer = document.querySelector('.photos-container');
const loader = document.querySelector('.loader');
let photos;
let shouldLoadMorePhotos = false;
let photosLoaded = 0;
let totalPhotos = 0;

// API-related variables
const API_ACCESS_KEY = 'TXKEQ8CyVzrzrkp8bYoikXi50Umc7pzsY4Os1uqYnWU';
const PHOTOS_REQUESTED = 10;
const API_URL = `https://api.unsplash.com/photos/random/?client_id=${API_ACCESS_KEY}&count=${PHOTOS_REQUESTED}`;

// Calculate scroll height
function getScrollHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );
}

// Set attributes on an given element
function setAttributes(element, attributes) {
  for (let attribute of Object.entries(attributes)) {
    element.setAttribute(attribute[0], attribute[1]);
  }
}

// Check if all photos have finished loading
function checkPhotoLoaded() {
  photosLoaded++;

  if (photosLoaded === totalPhotos) {
    shouldLoadMorePhotos = true;
  }
}

// Create elements for links and photos
function renderPhotos() {
  photosLoaded = 0;
  totalPhotos = photos.length;

  photos.forEach((photo) => {
    // Create link for photographer profile and set attributes to it
    const photographerProfileLink = document.createElement('a');
    setAttributes(photographerProfileLink, {
      href: photo.links.self,
      target: '_blank',
      rel: 'noreferrer',
    });
    photographerProfileLink.textContent = photo.user.name;
    photographerProfileLink.classList.add('photo__credits__author');

    // Create link for Unsplash site
    const unsplashLink = document.createElement('a');
    setAttributes(unsplashLink, {
      href: 'https://unsplash.com',
      target: '_blank',
      rel: 'noreferrer',
    });
    unsplashLink.classList.add('photo__credits__url');
    unsplashLink.textContent = 'Unsplash';

    // Create figcaption element
    const figcaption = document.createElement('figcaption');
    const figcaptionTextNode = document.createTextNode('Photo by ');
    const figcaptionTextNode2 = document.createTextNode(' on ');
    figcaption.appendChild(figcaptionTextNode);
    figcaption.appendChild(photographerProfileLink);
    figcaption.appendChild(figcaptionTextNode2);
    figcaption.appendChild(unsplashLink);
    figcaption.classList.add('photo__credits');

    // Create <img> for photo
    const photoImage = document.createElement('img');
    setAttributes(photoImage, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    photoImage.classList.add('photo__image');

    // Check when each image has loaded
    photoImage.addEventListener('load', checkPhotoLoaded);

    // Create <figure> element
    const photoContainer = document.createElement('figure');
    photoContainer.classList.add('photo-container');
    photoContainer.appendChild(photoImage);
    photoContainer.appendChild(figcaption);

    photosContainer.appendChild(photoContainer);
  });
}

// Fetch photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(API_URL);
    photos = await response.json();
    renderPhotos();
  } catch (error) {
    console.log(error);
  }
}

// Check if scrolling near bottom
window.addEventListener('scroll', () => {
  let currentScrollHeight = getScrollHeight();

  if (
    window.pageYOffset >= currentScrollHeight * 0.85 &&
    shouldLoadMorePhotos
  ) {
    shouldLoadMorePhotos = false;
    getPhotos();
  }
});

// On load
getPhotos();
