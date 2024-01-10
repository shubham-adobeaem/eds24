// Import any necessary utility functions or modules

function createCarouselSlide(col) {
  const slide = document.createElement('div');
  slide.classList.add('custom-slide');

  // Create picture element for responsive images
  const picture = col.children[2];

  // Create slide content
  const slideContent = document.createElement('div');
  slideContent.classList.add('custom-slide-content');
  const title = document.createElement('h2');
  title.textContent = col.children[0].textContent;
  const description = document.createElement('p');
  description.textContent = col.children[1].textContent;
  slideContent.appendChild(title);
  slideContent.appendChild(description);

  slide.appendChild(picture);
  slide.appendChild(slideContent);

  return slide;
}

export default function decorate(block) {
  // Define classes and other constants if needed
  const carouselClass = 'custom-carousel';
  const prevBtnClass = 'custom-prev';
  const nextBtnClass = 'custom-next';

  const divCarousel = document.createElement('div');
  divCarousel.classList.add('custom-carousel-container');

  const divSlides = document.createElement('div');
  divSlides.classList.add(carouselClass);

  // Iterate through rows in the block
  [...block.children].forEach((row) => {
    const slide = createCarouselSlide(row);
    divSlides.appendChild(slide);
  });

  divCarousel.appendChild(divSlides);

  // Add navigation buttons
  const prevBtn = document.createElement('button');
  prevBtn.classList.add(prevBtnClass);
  prevBtn.innerHTML = '&#10094;';
  prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));

  const nextBtn = document.createElement('button');
  nextBtn.classList.add(nextBtnClass);
  nextBtn.innerHTML = '&#10095;';
  nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));

  divCarousel.appendChild(prevBtn);
  divCarousel.appendChild(nextBtn);

  block.textContent = '';
  block.appendChild(divCarousel);

  let currentSlide = 0;

  function showSlide(index) {
    const slides = document.querySelectorAll(`.${carouselClass} .custom-slide`);
    if (index >= slides.length) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide = index;
    }

    const translateValue = -currentSlide * 100 + '%';
    divSlides.style.transform = `translateX(${translateValue})`;
  }
}
