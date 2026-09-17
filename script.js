"use strict";

const galleryImages = [
  {
    "src": "./assets/development/connertape1.png",
    "alt": "Corner tape design"
  },
  {
    "src": "./assets/development/D_Collagedevelopment2.png",
    "alt": "Collage development"
  },
  {
    "src": "./assets/finallogowhite1.png",
    "alt": "Post it to Prague logo"
  },
  {
    "src": "./assets/gallery/fnalbiglogo1.png",
    "alt": "Post it to Prague white logo on black"
  },
  {
    "src": "./assets/gallery/Posteronthewall.png",
    "alt": "Prague exhibition posters on a wall"
  },
  {
    "src": "./assets/gallery/tape1rp.png",
    "alt": "Red and white patterned tape"
  },
  {
    "src": "./assets/gallery/tape2rp.png",
    "alt": "Black and cream patterned tape"
  }
  ,{ "pair": true }
];

const gallery = document.querySelector(".gallery");

if (gallery) {
  const image = gallery.querySelector(".gallery-image");
  const pair = gallery.querySelector(".gallery-pair");
  const previous = gallery.querySelector(".gallery-previous");
  const next = gallery.querySelector(".gallery-next");
  const counter = gallery.querySelector(".gallery-counter");
  let currentIndex = 0;

  function renderImage() {
    const total = galleryImages.length;
    previous.disabled = total < 2;
    next.disabled = total < 2;
    const isPair = total > 0 && galleryImages[currentIndex].pair === true;
    image.hidden = total === 0 || isPair;
    if (pair) pair.hidden = !isPair;
    counter.textContent = total ? `${currentIndex + 1} / ${total}` : "";
    if (!total || isPair) return;
    image.src = galleryImages[currentIndex].src;
    image.alt = galleryImages[currentIndex].alt;
  }

  function moveImage(direction) {
    if (galleryImages.length < 2) return;
    currentIndex = (currentIndex + direction + galleryImages.length) % galleryImages.length;
    renderImage();
  }

  previous.addEventListener("click", () => moveImage(-1));
  next.addEventListener("click", () => moveImage(1));
  gallery.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      moveImage(event.key === "ArrowLeft" ? -1 : 1);
    }
  });

  renderImage();
}

const lightbox = document.querySelector(".image-lightbox");
if (lightbox) {
  const enlarged = lightbox.querySelector(".lightbox-image");
  const closeButton = lightbox.querySelector(".lightbox-close");
  let opener = null;
  let previousOverflow = "";
  document.querySelectorAll("button.development-board").forEach((button) => {
    button.addEventListener("click", () => {
      const thumbnail = button.querySelector("img");
      opener = button;
      enlarged.src = thumbnail.currentSrc || thumbnail.src;
      enlarged.alt = thumbnail.alt;
      previousOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = "hidden";
      lightbox.showModal();
      closeButton.focus();
    });
  });
  closeButton.addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("close", () => {
    document.documentElement.style.overflow = previousOverflow;
    enlarged.removeAttribute("src");
    opener?.focus({ preventScroll: true });
  });
}
