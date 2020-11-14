const photosContainer = document.querySelector('.photos-container');
const loader = document.querySelector('.loader');
let photos;

// API-related variables
const API_ACCESS_KEY = 'TXKEQ8CyVzrzrkp8bYoikXi50Umc7pzsY4Os1uqYnWU';
const PHOTOS_REQUESTED = 10;
const API_URL = `https://api.unsplash.com/photos/random/?client_id=${API_ACCESS_KEY}&count=${PHOTOS_REQUESTED}`;

// Set attributes on an given element
function setAttributes(element, attributes) {
  for (let attribute of Object.entries(attributes)) {
    element.setAttribute(attribute[0], attribute[1]);
  }
}

// Create elements for links and photos
function renderPhotos() {
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
    figcaption.classList.add('photo__credits');
    figcaption.textContent = `Photo by ${photographerProfileLink} on ${unsplashLink}`;

    // Create <img> for photo
    const photoImage = document.createElement('img');
    setAttributes(photoImage, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    photoImage.classList.add('photo__image');

    // Create <figure> element
    const photoContainer = document.createElement('figure');
    photoContainer.classList.add('photo-container');
    photoContainer.appendChild(photoImage);

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

// On load
getPhotos();
