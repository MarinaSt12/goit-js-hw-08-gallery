const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

// ==========================================================================================================

// const refs = {
//   gallery: document.querySelector('.js-gallery'),
//   modalCloseBtn: document.querySelector('[data-action="close-lightbox"]'),
//   modal: document.querySelector('.js-lightbox'),
//   overlay: document.querySelector('.lightbox__overlay'),
//   modalImage: document.querySelector('.lightbox__image'),
// };

// const images = galleryItems.reduce(
//   (str, { preview, original, description }) =>
//     str +
//     `<li class="gallery__item">
//       <a class="gallery__link" href=${original}>
//         <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}"/>
//       </a>
//     </li>`,
//   '',
// );

// refs.gallery.insertAdjacentHTML('afterbegin', images);
// refs.gallery.addEventListener('click', event => {
//   event.preventDefault();
//   const target = event.target;
//   if (event.target.nodeName !== 'IMG') {
//     return;
//   }
//   onModalOpen(target);
// });

// function onModalOpen(target) {
//   refs.modal.classList.add('is-open');
//   refs.overlay.addEventListener('click', onModalClose);
//   window.addEventListener('keydown', onModalPress);
//   refs.modalCloseBtn.addEventListener('click', onModalClose);

//   galleryItems.forEach(({ preview, original, description }) => {
//     if (target.src === preview) {
//       refs.modalImage.src = `${original}`;
//       refs.modalImage.alt = `${description}`;
//     }
//   });
// }

// function onModalClose() {
//   refs.modal.classList.remove('is-open');
//   refs.modalImage.src = '';
//   refs.modalImage.alt = '';
//   window.removeEventListener('keydown', onModalPress);
//   refs.modalCloseBtn.removeEventListener('click', onModalClose);
//   refs.overlay.removeEventListener('click', onModalClose);
// }

// function onModalPress(event) {
//   const target = event;
//   if (event.key === 'Escape') {
//     onModalClose();
//   }
//   onChangeSlide(target);
// }

//==============================================================================================================
const refs = {
  container: document.querySelector('.js-gallery'),
  modal: document.querySelector('.js-lightbox'),
  btnClose: document.querySelector('button[data-action="close-lightbox"]'),
  original: document.querySelector('.lightbox__image'),
};

function createItemGallery(galleryArr) {
  return galleryArr
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
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
    </li>
    `;
    })
    .join('');
}

const collectionItems = createItemGallery(galleryItems);
refs.container.insertAdjacentHTML('beforeend', collectionItems);

refs.container.addEventListener('click', showModal);
refs.modal.addEventListener('click', closeModal);
window.addEventListener('keydown', closeModal);

function showModal(event) {
  event.preventDefault();
  const isImg = event.target.classList.contains('gallery__image');
  if (!isImg) {
    return;
  }
  showOriginalImg();
  open();
}

function closeModal(event) {
  if (
    (event.type === 'click' && event.target === refs.btnClose) ||
    event.target.classList.contains('lightbox__overlay') ||
    (event.type === 'keydown' && event.keyCode === 27)
  ) {
    switch (event.type) {
      case 'click':
        close();
        break;
      case 'keydown':
        close();
        break;
    }
  }
}

function close() {
  refs.modal.classList.remove('is-open');
}
function open() {
  refs.modal.classList.add('is-open');
}

function showOriginalImg() {
  const imgPreview = event.target;
  refs.original.removeAttribute('src');
  refs.original.setAttribute('src', imgPreview.dataset.source);
  refs.original.alt = imgPreview.alt;
}
