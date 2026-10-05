document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contacto-form');
  const confirmation = document.getElementById('contactoConfirmation');
  const confirmationClose = document.getElementById('contactoConfirmationClose');

  let hideTimeout;

  function showConfirmation() {
    confirmation.hidden = false;

    requestAnimationFrame(() => {
      confirmation.classList.add('contacto-confirmation--visible');
    });

    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(hideConfirmation, 5000);
  }

  function hideConfirmation() {
    confirmation.classList.remove('contacto-confirmation--visible');
    setTimeout(() => {
      confirmation.hidden = true;
    }, 400);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    form.reset();
    showConfirmation();
  });

  confirmationClose.addEventListener('click', () => {
    clearTimeout(hideTimeout);
    hideConfirmation();
  });
});