document.addEventListener('DOMContentLoaded', () => {
  const mapaContainer = document.getElementById('mapaContainer');
  const hotspots = document.querySelectorAll('.mapa-hotspot');
  const flashcard = document.getElementById('flashcard');
  const flashcardTitle = document.getElementById('flashcardTitle');
  const flashcardText = document.getElementById('flashcardText');
  const flashcardClose = document.getElementById('flashcardClose');
  const flashcardVideo = document.getElementById('flashcardVideo');
  const flashcardImage = document.getElementById('flashcardImage');

  let activeHotspot = null;

  function openFlashcard(hotspot) {
    activeHotspot = hotspot;

    hotspots.forEach((h) => h.classList.remove('mapa-hotspot--active'));
    hotspot.classList.add('mapa-hotspot--active');

    flashcardTitle.textContent = hotspot.dataset.title;
    flashcardText.textContent = hotspot.dataset.desc;

    const youtubeId = hotspot.dataset.youtube;
    if (youtubeId) {
      flashcardVideo.innerHTML = `<iframe
        src="https://www.youtube.com/embed/${youtubeId}"
        title="${hotspot.dataset.title}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>`;
      flashcardVideo.hidden = false;
    } else {
      flashcardVideo.innerHTML = '';
      flashcardVideo.hidden = true;
    }

    const imageSrc = hotspot.dataset.image;
    if (imageSrc) {
      flashcardImage.src = imageSrc;
      flashcardImage.alt = hotspot.dataset.title;
      flashcardImage.hidden = false;
    } else {
      flashcardImage.removeAttribute('src');
      flashcardImage.hidden = true;
    }

    flashcard.hidden = false;
    flashcard.style.visibility = 'hidden';

    requestAnimationFrame(() => {
      positionFlashcard(hotspot);
      flashcard.style.visibility = 'visible';
    });
  }

  function positionFlashcard(hotspot) {
    const margin = 12;
    const containerRect = mapaContainer.getBoundingClientRect();
    const hotspotRect = hotspot.getBoundingClientRect();
    const cardRect = flashcard.getBoundingClientRect();

    let left = (hotspotRect.left - containerRect.left) + (hotspotRect.width / 2) - (cardRect.width / 2);
    const maxLeft = containerRect.width - cardRect.width - margin;
    left = Math.max(margin, Math.min(left, maxLeft));

    let top = (hotspotRect.top - containerRect.top) + hotspotRect.height + 10;

    if (top + cardRect.height > containerRect.height - margin) {
      top = (hotspotRect.top - containerRect.top) - cardRect.height - 10;
      if (top < margin) top = margin;
    }

    flashcard.style.left = left + 'px';
    flashcard.style.top = top + 'px';
  }

  function closeFlashcard() {
    activeHotspot = null;
    flashcard.hidden = true;
    flashcardVideo.innerHTML = '';
    flashcardImage.removeAttribute('src');
    flashcardImage.hidden = true;
    hotspots.forEach((h) => h.classList.remove('mapa-hotspot--active'));
  }

  hotspots.forEach((hotspot) => {
    hotspot.addEventListener('click', (e) => {
      e.stopPropagation();
      if (activeHotspot === hotspot) {
        closeFlashcard();
      } else {
        openFlashcard(hotspot);
      }
    });
  });

  flashcardClose.addEventListener('click', (e) => {
    e.stopPropagation();
    closeFlashcard();
  });

  document.addEventListener('click', (e) => {
    if (!flashcard.hidden && !flashcard.contains(e.target)) {
      closeFlashcard();
    }
  });

  window.addEventListener('resize', () => {
    if (activeHotspot) {
      positionFlashcard(activeHotspot);
    }
  });
});