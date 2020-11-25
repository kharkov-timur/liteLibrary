import $ from '../core';

$.prototype.carousel = function () {
  for (let i = 0; i < this.length; i++) {
    const slides = this[i].querySelectorAll('.carousel>div');

    //? Create slides wrapper
    let carouselInner = document.createElement('div');
    carouselInner.className = 'carousel-inner';
    this[i].prepend(carouselInner);
    let carouselSlides = document.createElement('div');
    carouselSlides.className = 'carousel-slides';
    carouselInner.append(carouselSlides);
    for (let slide of slides) {
      carouselSlides.prepend(slide);
      slide.className = 'carousel-item';
    }

    const width = window.getComputedStyle(this[i].querySelector('.carousel-inner')).width;
    const slidesField = this[i].querySelector('.carousel-slides');

    slidesField.style.width = 100 * slides.length + '%';
    slides.forEach(slide => {
      slide.style.width = width;
    });

    //? Create dots indicators
    const dotList = document.createElement('ol');
    dotList.classList.add('carousel-indicators');
    for (let j = 0; j < slides.length; j++) {
      const liList = document.createElement('li');
      liList.setAttribute('data-slide-to', `${[j]}`);
      dotList.appendChild(liList);
      this[i].insertAdjacentElement('afterbegin', dotList);
    }
    $('.carousel-indicators li').eq(0).addClass('active')

    const dots = this[i].querySelectorAll('.carousel-indicators li');
    const slideId = this[i].getAttribute('id');
    $(`#${slideId} .carousel-indicators li`).click(e => {
      const slideTo = e.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = +width.replace(/\D/g, '') * slideTo;

      slidesField.style.transform = `translateX(-${offset}px)`;
      dots.forEach(dot => dot.classList.remove('active'));
      dots[slideIndex].classList.add('active');
    });

    //? Create arrows
    //? Create arrow next
    const arrowNext = document.createElement('a');
    arrowNext.className = 'carousel-next';
    arrowNext.setAttribute('data-slide', 'next');
    arrowNext.setAttribute('href', '#');
    const iconNext = document.createElement('span');
    iconNext.className = 'carousel-next-icon';
    iconNext.textContent = '>';
    arrowNext.append(iconNext);
    this[i].insertAdjacentElement('beforeend', arrowNext);

    //? Create arrow prev
    const arrowPrev = document.createElement('a');
    arrowPrev.className = 'carousel-prev';
    arrowPrev.setAttribute('data-slide', 'prev');
    arrowPrev.setAttribute('href', '#');
    const iconPrev = document.createElement('span');
    iconPrev.className = 'carousel-prev-icon';
    iconPrev.textContent = '<';
    arrowPrev.append(iconPrev);
    this[i].insertAdjacentElement('beforeend', arrowPrev);

    //? Show next slide
    let offset = 0;
    let slideIndex = 0;

    $(this[i].querySelector('[data-slide="next"]')).click((e) => {
      e.preventDefault();
      if (offset === (+width.replace(/\D/g, '') * (slides.length - 1))) {
        offset = 0;
      } else {
        offset += +width.replace(/\D/g, '');
      }

      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slideIndex === slides.length - 1) {
        slideIndex = 0;
      } else {
        slideIndex++;
      }

      dots.forEach(dot => dot.classList.remove('active'));
      dots[slideIndex].classList.add('active');
    });

    //? Show previous slide
    $(this[i].querySelector('[data-slide="prev"]')).click((e) => {
      e.preventDefault();
      if (offset === 0) {
        offset = +width.replace(/\D/g, '') * (slides.length - 1);
      } else {
        offset -= +width.replace(/\D/g, '');
      }
      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slideIndex === 0) {
        slideIndex = slides.length - 1;
      } else {
        slideIndex--;
      }

      dots.forEach(dot => dot.classList.remove('active'));
      dots[slideIndex].classList.add('active');
    });
  }
};

$('.carousel').carousel();