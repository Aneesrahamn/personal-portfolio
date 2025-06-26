// ========== Sticky Navbar ========== //
var navbar = document.querySelector(".navbar");
window.onscroll = () => {
  this.scrollY > 20 ? navbar.classList.add("sticky") : navbar.classList.remove("sticky");
};

// ========== Nav Toggle ========== //
const navMenu = document.querySelector(".menu");
const navToggle = document.querySelector(".menu-btn");
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

// ========== Close Menu on Link Click ========== //
const navLink = document.querySelectorAll(".nav-link");
navLink.forEach(n => n.addEventListener("click", () => {
  navMenu.classList.remove("active");
}));

// ========== Scroll Section Active Link ========== //
const Section = document.querySelectorAll("section[id]");
function scrollActive() {
  const scrollY = window.pageYOffset;
  Section.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(".links a[href*=" + sectionId + "]").classList.add("active");
    } else {
      document.querySelector(".links a[href*=" + sectionId + "]").classList.remove("active");
    }
  });
}
window.addEventListener("scroll", scrollActive);

// ========== Skills Progress Bar ========== //
const skills_wrap = document.querySelector(".about-skill");
const skills_bar = document.querySelectorAll(".progress-line");
function checkScroll(el) {
  let rect = el.getBoundingClientRect();
  return window.innerHeight >= rect.top + el.offsetHeight;
}
function skillEffect() {
  if (checkScroll(skills_wrap)) return;
  skills_bar.forEach(skill => (skill.style.width = skill.dataset.progress));
}
window.addEventListener("scroll", skillEffect);

// ========== Portfolio Filter Section (Fixed) ========== //
const FilterContainer = document.querySelector(".portfolio-filter");
const filterBtns = FilterContainer.children;
const portfolioItems = document.querySelectorAll(".portfolio-item");

for (let i = 0; i < filterBtns.length; i++) {
  filterBtns[i].addEventListener("click", function () {
    const activeBtn = FilterContainer.querySelector(".active");
    if (activeBtn) activeBtn.classList.remove("active");
    this.classList.add("active");

    const filterValue = this.getAttribute("data-filter");

    portfolioItems.forEach(item => {
      const itemCategory = item.getAttribute("data-category");

      if (filterValue === itemCategory || filterValue === "all") {
        item.classList.remove("hide");
        item.classList.add("show");
      } else {
        item.classList.remove("show");
        item.classList.add("hide");
      }
    });

    // ✅ Only animate visible items
    triggerFilteredAnimation();
  });
}

function triggerFilteredAnimation() {
  const visibleItems = document.querySelectorAll('.portfolio-item.show');
  const windowHeight = window.innerHeight;

  visibleItems.forEach(item => {
    const itemTop = item.getBoundingClientRect().top;
    if (itemTop < windowHeight - 100) {
      item.classList.add('show');
    }
  });
}

// ========== Lightbox ========== //
const lightbox = document.querySelector(".lightbox"),
  lightboxImg = lightbox.querySelector(".lightbox-img"),
  lightboxClose = lightbox.querySelector(".lightbox-close"),
  lightboxText = lightbox.querySelector(".caption-text"),
  lightboxCounter = lightbox.querySelector(".caption-counter");

let itemIndex = 0;

portfolioItems.forEach((item, i) => {
  item.addEventListener("click", function () {
    itemIndex = i;
    changeItem();
    toggleLightbox();
  });
});

function nextItem() {
  itemIndex = (itemIndex + 1) % portfolioItems.length;
  changeItem();
}

function prevItem() {
  itemIndex = (itemIndex - 1 + portfolioItems.length) % portfolioItems.length;
  changeItem();
}

function toggleLightbox() {
  lightbox.classList.toggle("open");
}

function changeItem() {
  const imgSrc = portfolioItems[itemIndex].querySelector(".portfolio-img img").getAttribute("src");
  lightboxImg.src = imgSrc;
  lightboxText.innerHTML = portfolioItems[itemIndex].querySelector("h4").innerHTML;
  lightboxCounter.innerHTML = `${itemIndex + 1} of ${portfolioItems.length}`;
}

lightbox.addEventListener("click", function (event) {
  if (event.target === lightboxClose || event.target === lightbox) {
    toggleLightbox();
  }
});

// ========== Reveal Animations ========== //
function animateOnScroll(selector, animationClass) {
  const elements = document.querySelectorAll(selector);
  const windowHeight = window.innerHeight;

  elements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (!el.classList.contains("hide") && elementTop < windowHeight - 100) {
      el.classList.add(animationClass);
    }
  });
}

function scrollAnimations() {
  animateOnScroll('.fade-up', 'show');
  animateOnScroll('.fade-scale', 'show');
  animateOnScroll('.fade-slide-up', 'show');
  animateOnScroll('.slide-in-left', 'show');
  animateOnScroll('.slide-in-right', 'show');
}

window.addEventListener("scroll", scrollAnimations);
window.addEventListener("load", scrollAnimations);

// ========== Progress Bars Animation ========== //
function animateProgressBars() {
  const progressBars = document.querySelectorAll('.progress-line');
  const windowHeight = window.innerHeight;

  progressBars.forEach(bar => {
    const barTop = bar.getBoundingClientRect().top;
    if (barTop < windowHeight - 100) {
      bar.style.width = bar.getAttribute('data-progress');
    }
  });
}
window.addEventListener('scroll', animateProgressBars);
window.addEventListener('load', animateProgressBars);
