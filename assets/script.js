
const track = document.querySelector('.carousel-track');
const slides = Array.from(document.querySelectorAll('.carousel-slide'));
const dots = Array.from(document.querySelectorAll('.dot'));
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

const slideWidth = slides[0].clientWidth;
let currentIndex = 0;

// Ajouter les clones
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

// Ajuster la position initiale pour inclure le clone de fin
currentIndex = 1; // À cause du clone
track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

// Mettre à jour les dots
function updateDots() {
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === (currentIndex - 1 + slides.length) % slides.length);
  });
}

// Déplacer vers un slide donné
function goToSlide(index) {
  track.style.transition = 'transform 0.5s ease-in-out';
  track.style.transform = `translateX(-${index * slideWidth}px)`;
}

// Ajuster la position après un cycle
function checkPosition() {
  if (currentIndex === 0) {
    track.style.transition = 'none';
    currentIndex = slides.length;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }
  if (currentIndex === slides.length + 1) {
    track.style.transition = 'none';
    currentIndex = 1;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }
}

// Flèche droite
rightArrow.addEventListener('click', () => {
  if (currentIndex <= slides.length) {
    currentIndex++;
    goToSlide(currentIndex);
    updateDots();
  }
});

// Flèche gauche
leftArrow.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    goToSlide(currentIndex);
    updateDots();
  }
});

// Transition terminée : vérifier position
track.addEventListener('transitionend', checkPosition);

// Swipe pour écrans tactiles
let startX = 0;

track.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

track.addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (diff > 50) {
    rightArrow.click();
  } else if (diff < -50) {
    leftArrow.click();
  }
});



