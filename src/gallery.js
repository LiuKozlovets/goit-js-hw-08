import galleryItems from "./gallery-items.js";
console.log(galleryItems);

const galleryItemList = document.querySelector('.js-gallery');
const galleryListMarkup = createGalleryListMarkup(galleryItems);
galleryItemList.insertAdjacentHTML('afterbegin', galleryListMarkup);

function createGalleryListMarkup(galleryItems) {
    return galleryItems.map(
        ({ preview, original, description }) => {
            return `<li class = gallary-item>
            <a
            class="gallery__link"
            href="${original}"
            >
                <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
            </a>
            </li>`
         }    
    ).join('')
}

galleryItemList.addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target.nodeName !== "IMG") return;

    const imgSource = event.target.getAttribute('data-source');
    document.querySelector('.lightbox__image').src = imgSource;
    document.querySelector('.js-lightbox').classList.add('is-open');
}
    )

document.querySelector('.lightbox__button').addEventListener('click', closeModal);
document.querySelector('.lightbox__overlay').addEventListener('click', closeModal);
window.addEventListener('keydown', onEscKeyDown);
window.addEventListener('keydown', onArrowDown);

function closeModal() {
    document.querySelector('.js-lightbox').classList.remove('is-open');
}

function onEscKeyDown(event) {
  const ESC_KEY_CODE = 'Escape';
  if (event.code !== ESC_KEY_CODE) return;

  closeModal();
}
 
function onArrowDown(event) {
    const ARROW_RIGHT_KEY_CODE = 'ArrowRight';
    const ARROW_LEFT_KEY_CODE = 'ArrowLeft';

    if (event.code !== ARROW_RIGHT_KEY_CODE && event.code !== ARROW_LEFT_KEY_CODE) return;

    const currentSrc = document.querySelector('.lightbox__image').src;
    const currentImageIndex = galleryItems.map(x => x.original).indexOf(currentSrc);
    
    const step = event.code === ARROW_RIGHT_KEY_CODE ? 1 : -1;
    const newImage = galleryItems[currentImageIndex + step].original;
    if (newImage) {
        document.querySelector('.lightbox__image').src = newImage;
    }
}

