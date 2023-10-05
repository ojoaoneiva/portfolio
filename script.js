// smooth scroll
const lenis = new Lenis();

lenis.on('scroll', (e) => {
  ScrollTrigger.update(e);
});

gsap.ticker.add((time) => {
  lenis.raf(time * 600);
});

gsap.ticker.lagSmoothing(0);

// Capture keyboard events for arrow keys
document.addEventListener('keydown', (e) => {
  const scrollAmount = 200; // Adjust the scroll amount as needed
  let scrollY = window.scrollY;

  if (e.key === 'ArrowUp') {
    scrollY -= scrollAmount;
  } else if (e.key === 'ArrowDown') {
    scrollY += scrollAmount;
  }

  lenis.scrollTo(scrollY);
});




// Capturar eventos de arrasto do mouse para rolagem suave
let isDragging = false;
let startY = 0;

document.addEventListener('mousedown', (e) => {
  isDragging = true;
  startY = e.clientY;
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const deltaY = startY - e.clientY;
    const scrollAmount = 15; // Ajuste a quantidade de rolagem conforme necessário
    lenis.scrollTo(window.scrollY + deltaY * scrollAmount);
    startY = e.clientY;
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

// Open project
document.addEventListener("DOMContentLoaded", function () {
  const projectTitles = document.querySelectorAll(".project-title");
  const projectContents = document.querySelectorAll(".project-content");

  projectTitles.forEach(function (projectTitle, index) {
    projectTitle.addEventListener("click", function (event) {
      event.stopPropagation(); // Impede que o evento de clique se propague para o elemento pai

      // Fecha todos os outros projetos
      projectContents.forEach(function (content, contentIndex) {
        if (contentIndex !== index) {
          content.style.maxHeight = "0px";
        }
      });

      const projectContent = this.parentElement.querySelector(".project-content");

      if (projectContent.style.maxHeight === "0px" || projectContent.style.maxHeight === "") {
        projectContent.style.maxHeight = projectContent.scrollHeight + "px";
      } else {
        projectContent.style.maxHeight = "0px";
      }
    });
  });
});


// Initialize all sliders with the class "album"
const albumTracks = document.querySelectorAll('.album-images');

albumTracks.forEach((track) => {
  let isDragging = false;
  let startX;
  let scrollLeftStart;

  // Manipuladores de eventos de mouse
  track.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    scrollLeftStart = track.scrollLeft;
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const mouseDelta = e.clientX - startX;
    track.scrollLeft = scrollLeftStart - mouseDelta;
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Manipuladores de eventos de toque
  track.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    scrollLeftStart = track.scrollLeft;
  });

  document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;

    const touchDelta = e.touches[0].clientX - startX;
    track.scrollLeft = scrollLeftStart - touchDelta;
  });

  document.addEventListener('touchend', () => {
    isDragging = false;
  });
});
