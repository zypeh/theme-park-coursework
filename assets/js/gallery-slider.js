document.addEventListener('DOMContentLoaded', () => {
  // Get all gallery items
  const galleryItems = document.querySelectorAll('#gallery .gallery-item');

  // Get navigation icons container
  const galleryIcons = document.querySelector('#gallery .gallery-nav.icons');

  // Navigation icon list array
  // Adding them to an array while they are also being appended to the DOM to make selecting and styling easier for later
  const galleryIconsList = [];

  // Array to contain gallery items position
  const galleryItemsPos = [];

  // Current active gallery item index
  let currentItemIndex = 0;

  // Set initial position for the gallery items and populate nav icons
  for (let i = 0; i < galleryItems.length; i++) {
    // Place the first one in view and hide the others
    if (i === 0) {
      galleryItems[i].style.left = '0';
      // Push an object containing gallery item, index and current position to the position array
      galleryItemsPos.push({
        item: galleryItems[i],
        index: i,
        pos: '0'
      });
    } else {
      galleryItems[i].style.left = '100%';
      galleryItemsPos.push({
        item: galleryItems[i],
        index: i,
        pos: '100%'
      });
    }

    // Populate gallery navigation icons
    // Create anchor element
    let icon = document.createElement('a');
    icon.href = '#';
    icon.classList.add('gallery-nav-icon');
    icon.setAttribute('data-index', i);
    // Create fontawesome icon element
    let iconFA = document.createElement('i');
    iconFA.classList.add('fas', 'fa-circle');

    // Append fontawesome icon element to anchor element
    icon.appendChild(iconFA);

    // Append anchor elements to the navigation icons container
    galleryIcons.appendChild(icon);
    galleryIconsList.push(icon);
  }

  let autoSlide = setInterval(() => {
    let prevItem = calcNextPrev(currentItemIndex, galleryItemsPos, 'prev');
    let currentItem = galleryItemsPos[currentItemIndex];
    let nextItem = calcNextPrev(currentItemIndex, galleryItemsPos, 'next');

    prevItem.item.style.zIndex = '0';
    currentItem.item.style.left = '-100%';
    nextItem.item.style.zIndex = '1';
    nextItem.item.style.left = '0';
    prevItem.item.style.left = '100%';
    prevItem.item.style.display = 'block';

    currentItemIndex = galleryItemsPos.indexOf(nextItem);

    for (let i = 0; i < galleryIconsList.length; i++) {
      galleryIconsList[i].classList.remove('active');
    }

    galleryIconsList[currentItemIndex].classList.add('active');
  }, 3000);

  // A function to return the next item or the previous item in an array
  // If there is no next item, it sets the first index as the next item
  // if there is no previous item, it sets the last index as the previous item
  function calcNextPrev(index, array, direction) {
    if (direction === 'next') {
      return array[index + 1] ? array[index + 1] : array[0];
    } else if (direction === 'prev') {
      return array[index - 1] ? array[index - 1] : array[array.length - 1];
    }

    return false;
  }
});
