const botonesVideo = document.querySelectorAll(".escena-video");

const videoModal = document.getElementById("videoModal");
const videoModalPlayer = document.getElementById("videoModalPlayer");
const videoModalClose = document.getElementById("videoModalClose");
const videoModalOverlay = document.getElementById("videoModalOverlay");

botonesVideo.forEach((boton) => {

  boton.addEventListener("click", () => {

    const videoSrc = boton.dataset.video;

    videoModalPlayer.src = videoSrc;

    videoModal.hidden = false;

    videoModalPlayer.play();
  });

});

function cerrarVideo() {

  videoModalPlayer.pause();

  videoModalPlayer.currentTime = 0;

  videoModalPlayer.removeAttribute("src");

  videoModalPlayer.load();

  videoModal.hidden = true;
}

videoModalClose.addEventListener("click", cerrarVideo);

videoModalOverlay.addEventListener("click", cerrarVideo);