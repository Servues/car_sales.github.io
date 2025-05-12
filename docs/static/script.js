const galleryModal = document.getElementById('galleryModal');
const galleryImage = document.getElementById('galleryImage');
const closeBtn = galleryModal.querySelector('.close');
const prevBtn = document.getElementById('prevPhoto');
const nextBtn = document.getElementById('nextPhoto');
const photoCounter = document.getElementById('photoCounter');

let currentCarPhotos = [];
let currentPhotoIndex = 0;

// Получаем данные автомобилей из JSON
const carsData = JSON.parse(document.getElementById('cars-data-json').textContent);

// Функции для работы галереи
function updatePhotoCounter() {
  photoCounter.textContent = currentCarPhotos.length 
    ? `${currentPhotoIndex + 1}/${currentCarPhotos.length}`
    : 'Нет фото';
}

function openGallery(carId) {
  const car = carsData[carId];
  if (!car || !car.images) {
    console.error(`Нет данных для автомобиля: ${carId}`);
    return;
  }
  
  currentCarPhotos = car.images;
  currentPhotoIndex = 0;
  
  if (currentCarPhotos.length > 0) {
    galleryImage.src = currentCarPhotos[0];
    galleryModal.classList.remove('hidden');
    updatePhotoCounter();
  } else {
    console.warn(`Нет фотографий для ${carId}`);
  }
}

function closeGallery() {
  galleryModal.classList.add('hidden');
}

function navigatePhotos(direction) {
  const lastIndex = currentCarPhotos.length - 1;
  
  currentPhotoIndex = direction === 'next' 
    ? (currentPhotoIndex === lastIndex ? 0 : currentPhotoIndex + 1)
    : (currentPhotoIndex === 0 ? lastIndex : currentPhotoIndex - 1);
  
  galleryImage.src = currentCarPhotos[currentPhotoIndex];
  updatePhotoCounter();
}

// Обработчики событий
document.querySelectorAll('.car-card').forEach(card => {
  const btn = card.querySelector('.gallery-hint');
  btn.addEventListener('click', () => {
    const carId = card.dataset.car;
    if (carsData[carId]) {
      openGallery(carId);
    }
  });
});

closeBtn.addEventListener('click', closeGallery);
prevBtn.addEventListener('click', () => navigatePhotos('prev'));
nextBtn.addEventListener('click', () => navigatePhotos('next'));

window.addEventListener('click', (e) => {
  if (e.target === galleryModal) closeGallery();
});

document.addEventListener('keydown', (e) => {
  if (galleryModal.classList.contains('hidden')) return;

  switch(e.key) {
    case 'Escape':
      closeGallery();
      break;
    case 'ArrowLeft':
      navigatePhotos('prev');
      break;
    case 'ArrowRight':
      navigatePhotos('next');
      break;
  }
});

// Обработка формы
document.getElementById('orderForm').addEventListener('submit', function(e) {
  e.preventDefault();
  this.classList.add('hidden');
  document.getElementById('successMessage').classList.remove('hidden');
});

// В script.js заменить анимацию на
function animateSteps() {
  const steps = document.querySelectorAll('.step');
  const triggerBottom = window.innerHeight * 0.8;
  
  steps.forEach(step => {
    const stepTop = step.getBoundingClientRect().top;
    if (stepTop < triggerBottom) {
      step.style.opacity = '1';
      step.style.transform = 'translateY(0)';
    }
  });
}