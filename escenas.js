document.addEventListener('DOMContentLoaded', () => {
  const spoilerButton = document.getElementById('spoilerButton');
  const spoilerWarning = document.getElementById('spoilerWarning');
  const spoilerContent = document.getElementById('spoiler-content');

  spoilerButton.addEventListener('click', () => {
    spoilerContent.classList.remove('spoilers-hidden');
    spoilerContent.classList.add('spoilers-revealed');

    spoilerWarning.classList.add('spoiler-warning--dismissed');
    setTimeout(() => {
      spoilerWarning.hidden = true;
    }, 400);
  });

  const videoTriggers = document.querySelectorAll('.escena-video');
  const videoModal = document.getElementById('videoModal');
  const videoModalOverlay = document.getElementById('videoModalOverlay');
  const videoModalClose = document.getElementById('videoModalClose');
  const videoModalPlayer = document.getElementById('videoModalPlayer');

  function openVideoModal(src) {
    videoModalPlayer.src = src;
    videoModal.hidden = false;

    requestAnimationFrame(() => {
      videoModal.classList.add('video-modal--visible');
    });

    videoModalPlayer.play();
  }

  function closeVideoModal() {
    videoModalPlayer.pause();
    videoModalPlayer.currentTime = 0;

    videoModal.classList.remove('video-modal--visible');

    setTimeout(() => {
      videoModal.hidden = true;
      videoModalPlayer.removeAttribute('src');
      videoModalPlayer.load();
    }, 300);
  }

  videoTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      openVideoModal(trigger.dataset.video);
    });
  });

  videoModalClose.addEventListener('click', closeVideoModal);
  videoModalOverlay.addEventListener('click', closeVideoModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !videoModal.hidden) {
      closeVideoModal();
    }
  });

});