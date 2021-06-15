document.addEventListener('DOMContentLoaded', () => {
  // Get all gallery items
  const galleryItems = Array.from(
    document.querySelectorAll('#gallery .gallery-item')
  );

  // Get navigation icons container
  const galleryIcons = document.querySelector('#gallery .gallery-nav.icons');

  // Get navigation arrows
  const galleryNavPrev = document.querySelector('#gallery .gallery-nav-prev');
  const galleryNavNext = document.querySelector('#gallery .gallery-nav-next');

  // Navigation icon list array
  // Adding them to an array while they are also being appended to the DOM to make selecting and styling easier for later
  const galleryIconsList = [];

  // Current active gallery item index
  let currentItemIndex = 0;

  // Set initial position for the gallery items and populate nav icons
  for (let i = 0; i < galleryItems.length; i++) {
    // Place the first one in view and hide the others
    i === 0
      ? (galleryItems[i].style.left = '0')
      : (galleryItems[i].style.left = '100%');

    // Populate gallery navigation icons
    // Create anchor element
    let icon = document.createElement('span');
    icon.classList.add('gallery-nav-icon');
    // Create fontawesome icon element
    let iconFA = document.createElement('i');
    iconFA.classList.add('fas', 'fa-circle');

    // Append fontawesome icon element to anchor element
    icon.appendChild(iconFA);

    // Append anchor elements to the navigation icons container
    galleryIcons.appendChild(icon);
    galleryIconsList.push(icon);
  }

  // Set auto slide interval
  let autoSlide = setInterval(gallerySlide, 3000);

  // Attach event listeners to previous and next arrows
  galleryNavNext.addEventListener('click', gallerySlide);
  galleryNavPrev.addEventListener('click', gallerySlide);

  // Function to control gallery slide properties
  function gallerySlide(e) {
    // If function called from an event, prevent default and stop auto slide
    if (e) {
      e.preventDefault();
      clearInterval(autoSlide);
    }

    // Get previous gallery item
    let prevItem = calcNextPrev(currentItemIndex, galleryItems, 'prev');
    // Get current visible gallery item
    let currentItem = galleryItems[currentItemIndex];
    // Get next gallery item
    let nextItem = calcNextPrev(currentItemIndex, galleryItems, 'next');

    // If previous arrow is clicked, slide images to the right
    if (e && e.target.classList.contains('fa-chevron-circle-left')) {
      // Move previous gallery item in to view
      prevItem.style.zIndex = '1';
      prevItem.style.left = '0';
      // Move current visible gallery item to the right
      currentItem.style.left = '100%';
      // Move next gallery item to the back and left to make it ready for the next slide
      nextItem.style.zIndex = '0';
      nextItem.style.left = '-100%';

      // Set active gallery item index
      currentItemIndex = galleryItems.indexOf(prevItem);
    }
    // If next arrow is clicked or based on interval slide images to the left
    else {
      // Move previous gallery item to the back and right to make it ready for the next slide
      prevItem.style.zIndex = '0';
      prevItem.style.left = '100%';
      // Move current visible gallery item to the left
      currentItem.style.left = '-100%';
      // Move next gallery item in to view
      nextItem.style.zIndex = '1';
      nextItem.style.left = '0';

      // Set active gallery item index
      currentItemIndex = galleryItems.indexOf(nextItem);
    }

    // Add active class to the nav icons based on current gallery item index
    for (let i = 0; i < galleryIconsList.length; i++) {
      galleryIconsList[i].classList.remove('active');
    }
    galleryIconsList[currentItemIndex].classList.add('active');
  }

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
