const resetBackgroundBlurHash = (event) => {
  event.target.style.background = null;
  event.target.removeEventListener("load", resetBackgroundBlurHash);
};
const imagesWithBackgroundBlurHash =
  document.querySelectorAll("img[loading=lazy]");

for (const image of imagesWithBackgroundBlurHash) {
  if (image.complete) {
    resetBackgroundBlurHash({ target: image });
  } else {
    image.addEventListener("load", resetBackgroundBlurHash);
  }
}
