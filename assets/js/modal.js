document.addEventListener('DOMContentLoaded', () => {
  const modalEls = document.querySelectorAll('[data-attr="modal"]');
  const loginModal = document.getElementById('login-modal');
  const modalBg = document.getElementById('modal-bg');

  for (let i = 0; i < modalEls.length; i++) {
    modalEls[i].addEventListener('click', () => {
      loginModal.classList.toggle('modal-hidden');
      modalBg.classList.toggle('modal-hidden');
    });
  }
});
