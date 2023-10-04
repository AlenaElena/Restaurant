//  PRELOAD
const preloader = document.querySelector('.preload');
window.addEventListener('load', function () {
  preloader.classList.add('loaded');
  document.body.classList.add('loaded');
});

// add event listener on multiple elems
const addEventListeners = function (elems, eventType, callBack) {
  elems.forEach((el) => {
    el.addEventListener(eventType, callBack);
  });
};

//  NAVBAR
const navToggler = document.querySelectorAll('.nav-toggler');
const headerNav = document.querySelector('.header-nav');
const overlay = document.querySelector('.overlay');
const toggleNav = function () {
  headerNav.classList.toggle('active');
  overlay.classList.toggle('active');
  document.body.classList.toggle('nav-active');
};
addEventListeners(navToggler, 'click', toggleNav);

//  HEADER & BACK TO TOP
const header = document.querySelector('.header');
const backTopBtn = document.querySelector('.backTop-btn');
let lastScrollPos = 0;
const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add('hide');
  } else {
    header.classList.remove('hide');
  }
  lastScrollPos = window.scrollY;
};
window.addEventListener('scroll', function () {
  if (window.scrollY >= 50) {
    header.classList.add('active');
    backTopBtn.classList.add('active');
    hideHeader();
  } else {
    header.classList.remove('active');
    backTopBtn.classList.remove('active');
  }
});

//  INTRO SLIDER
const introSlider = document.querySelector('.intro-slider');
const introSlides = document.querySelectorAll('.intro-slide');
const introBtnPrev = document.querySelector('.intro-slider__prev');
const introBtnNext = document.querySelector('.intro-slider__next');

let currentSlidePos = 0;
let lastActiveSlide = introSlides[0];
const updateSliderPos = function () {
  lastActiveSlide.classList.remove('active');
  introSlides[currentSlidePos].classList.add('active');
  lastActiveSlide = introSlides[currentSlidePos];
};
const slideNext = function () {
  if (currentSlidePos >= introSlides.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }
  updateSliderPos();
};
introBtnNext.addEventListener('click', slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = introSlides.length - 1;
  } else {
    currentSlidePos--;
  }
  updateSliderPos();
};
introBtnPrev.addEventListener('click', slidePrev);

let autoSlideInterval;
const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
};
introBtnPrev.addEventListener('mouseover', function () {
  clearInterval(autoSlideInterval);
});
introBtnNext.addEventListener('mouseover', function () {
  clearInterval(autoSlideInterval);
});
introBtnPrev.addEventListener('mouseout', autoSlide);
introBtnNext.addEventListener('mouseout', autoSlide);

window.addEventListener('load', autoSlide);

// PARALLAX EFFECT
const parallaxItems = document.querySelectorAll('[data-parallax-item]');
let x, y;
window.addEventListener('mousemove', function (event) {
  x = (event.clientX / window.innerWidth) * 10 - 5;
  y = (event.clientY / window.innerHeight) * 10 - 5;

  // reverse the number eg. 20 = -20  -5 = 5

  x = x - x * 2;
  y = y - y * 2;

  parallaxItems.forEach((el) => {
    x = x * Number(el.dataset.parallaxSpeed);
    y = y * Number(el.dataset.parallaxSpeed);

    el.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  });
});

// SELECT
const select = function () {
  const selectHeader = document.querySelectorAll('.select-header');
  selectHeader.forEach((el) => {
    el.addEventListener('click', selectTogle);
  });

  const selectItem = document.querySelectorAll('.select-body__item');
  selectItem.forEach((el) => {
    el.addEventListener('click', selectChoose);
  });

  function selectTogle() {
    this.parentElement.classList.toggle('active');
  }

  function selectChoose() {
    const text = this.innerText;
    const select = this.closest('.select');
    const currentText = select.querySelector('.select-header__current');
    currentText.innerText = text;
    select.classList.remove('active');
  }
};
select();
