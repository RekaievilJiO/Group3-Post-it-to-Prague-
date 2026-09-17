"use strict";

// Add real project images here after placing the files in assets/.
// Each entry uses this shape: { src: "./assets/filename.jpg", alt: "Image description" }.
const galleryImages = [];

const gallery = document.querySelector(".gallery");

if (gallery) {
  const image = gallery.querySelector(".gallery-image");
  const previous = gallery.querySelector(".gallery-previous");
  const next = gallery.querySelector(".gallery-next");
  const counter = gallery.querySelector(".gallery-counter");
  let currentIndex = 0;

  function renderImage() {
    const total = galleryImages.length;
    previous.disabled = total < 2;
    next.disabled = total < 2;
    image.hidden = total === 0;
    counter.textContent = total ? `${currentIndex + 1} / ${total}` : "";
    if (!total) return;
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
