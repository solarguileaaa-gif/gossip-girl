/* =========================================================
   GALERÍA - Lightbox simple
   Abre cada imagen en grande al hacer click, con overlay
   oscuro. Se cierra con la X, clickeando fuera o con Escape.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.galeria-item');
  const lightbox = document.getElementById('galeriaLightbox');
  const lightboxOverlay = document.getElementById('galeriaLightboxOverlay');
  const lightboxImage = document.getElementById('galeriaLightboxImage');
  const lightboxClose = document.getElementById('galeriaLightboxClose');

  function openLightbox(src, alt) {
    lightboxImage.src = src;
    lightboxImage.alt = alt;
    lightbox.hidden = false;

    requestAnimationFrame(() => {
      lightbox.classList.add('galeria-lightbox--visible');
    });
  }

  function closeLightbox() {
    lightbox.classList.remove('galeria-lightbox--visible');

    setTimeout(() => {
      lightbox.hidden = true;
      lightboxImage.src = '';
    }, 250);
  }

  items.forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      openLightbox(item.dataset.full, img.alt);
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxOverlay.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.hidden) {
      closeLightbox();
    }
  });
});