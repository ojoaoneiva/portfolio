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
  const scrollAmount = 200;
  let scrollY = window.scrollY;

  if (e.key === 'ArrowUp') {
    scrollY -= scrollAmount;
  } else if (e.key === 'ArrowDown') {
    scrollY += scrollAmount;
  }

  lenis.scrollTo(scrollY);
});

// Capture events dragging the mouse
let isDragging = false;
let startY = 0;

document.addEventListener('mousedown', (e) => {
  isDragging = true;
  startY = e.clientY;
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const deltaY = startY - e.clientY;
    const scrollAmount = 15;
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
      event.stopPropagation();

      // close other projects
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

// Gasping effect for the title when the page loads
gsap.from(".title", {
  y: "60%",
  autoAlpha: 0,
  duration: 2,
  ease: "power4.out",
  onComplete: function () {
    // Animation is complete, set visibility to visible
    gsap.set(".title", { autoAlpha: 1 });
  },
  delay: 0.5,
});

// Fade in the "scroll down" text after 2 seconds
gsap.fromTo(".scroll", {
  opacity: 0,
}, {
  y: "-50%",
  opacity: 1,
  duration: 0.6,
  ease: "power4.out",
  delay: 1.5
});

// Header animation
gsap.from(".header", {
  y: "-100%",
  autoAlpha: 0,
  duration: 0.5,
  ease: "power4.out",
  onComplete: function () {
    // Animation is complete, set visibility to visible
    gsap.set(".header", { autoAlpha: 1 });
  },
});

//Gasping effect for the "about" element
gsap.from("#about", {
  y: "60%",
  autoAlpha: 0,
  duration: 2,
  ease: "power4.out",
  scrollTrigger: {
    trigger: "#about",
    start: "top bottom",
  },
});
//Gasping effect for the "contact" element
gsap.from("#contact", {
  y: "30%",
  autoAlpha: 0,
  duration: 2,
  ease: "power4.out",
  scrollTrigger: {
    trigger: "#about",
    start: "top bottom",
  },
});

//copy email
document.addEventListener("DOMContentLoaded", function () {
  const emailDiv = document.getElementById("email");

  // Add atext element to sugest copy
  const copyText = document.createElement("span");
  copyText.textContent = "Click to copy";
  copyText.classList.add("copy-text");
  emailDiv.appendChild(copyText);

  // Add events on mouse
  emailDiv.addEventListener("mouseenter", function () {
    gsap.to(copyText, { opacity: 1, y: -20, duration: 0.3, ease: "power2.out" });
  });

  emailDiv.addEventListener("mouseleave", function () {
    gsap.to(copyText, { opacity: 0, y: 0, duration: 0.3, ease: "power2.out" });
  });

  emailDiv.addEventListener("click", function () {
    // Create a text element to copy
    const tempInput = document.createElement("input");
    tempInput.value = emailDiv.textContent.trim().replace("Click to copy", "");
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    // Change the text to show it was coppied
    copyText.textContent = "Copied!";
    setTimeout(() => {
      copyText.textContent = "Click to copy";
    }, 2000);
  });
});

// Use ScrollTrigger to trigger the animation for each .line element
gsap.utils.toArray('.line').forEach((line) => {
  gsap.from(line, {
    scaleX: 0,
    transformOrigin: "left center",
    duration: 3,
    ease: "power4.out",
    scrollTrigger: {
      trigger: line,
    },
  });
});


//section trasition smoothly
document.addEventListener("DOMContentLoaded", function () {
  // Get all the navigation links
  const navLinks = document.querySelectorAll('.header-navbar a');


  // Function to handle smooth scrolling
  function scrollToSection(e) {
    e.preventDefault();

    const targetId = this.getAttribute("href").substring(1); // Remove the '#' from the href
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      const offset = targetSection.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  }

  // Attach the scrollToSection function to each navigation link
  navLinks.forEach(function (link) {
    link.addEventListener("click", scrollToSection);
  });
});

// Set scroll position to the top on page load/refresh
window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
  // Hide the title instantly when the page is reloaded
  document.querySelector(".title").style.opacity = 0;
});

// Initialize all sliders with the class "album"
const albumTracks = document.querySelectorAll('.album-images');

albumTracks.forEach((track) => {
  let isDragging = false;
  let startX;
  let scrollLeftStart;

  // Mouse events
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

  // touch events (mobile)
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