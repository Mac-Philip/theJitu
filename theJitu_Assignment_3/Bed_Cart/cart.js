/* image slider*/
const slideImg = document.getElementById("sliderImg");

const sliderImages = [
  "images/slide1.jpg",
  "images/slide2.jpg",
  "images/slide3.jpg",
  "images/slide4.jpg",
  "images/slide5.jpg",
];

let imgLength = sliderImages.length;

let i = 0;

const slider = () => {
  if (i > imgLength - 1) {
    i = 0;
  }
  slideImg.src = sliderImages[i];
  i++;

  setTimeout("slider()", 3000);
};
/*
change navbar color on scroll
window.addEventListener("scroll", ()=> {
  let header = document.getElementsByClassName("container-header");
  let windowPosition = window.scrollY > 0;
  header.classList.toggle("scrolling-active", windowPosition);
});
*/