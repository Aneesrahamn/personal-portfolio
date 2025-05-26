/*============= Resize Navbar on scroll ======*/
var navbar = document.querySelector(".navbar");
window.onscroll = () => {
  this.scrollY > 20 ? navbar.classList.add("sticky") : navbar.classList.remove("sticky");
}

/*============= Nav Toggler======*/
const navMenu = document.querySelector(".menu");
navToggle = document.querySelector(".menu-btn");
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  })
}
// closing menu when link is clicked
const navLink = document.querySelectorAll(".nav-link");
function linkAction() {
  const navMenu = document.querySelector(".menu");
  navMenu.classList.remove("active");
}
navLink.forEach(n => n.addEventListener("click", linkAction))

/*============= Scroll Section Active Link ======*/
const Section = document.querySelectorAll("section[id]")
function scrollActive() {
  const scrollY = window.pageYOffset
  Section.forEach(current => {
    const sectionHeight = current.offsetHeight
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id")

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(".links a[href*=" + sectionId + "]").classList.add("active")
    }
    else {
      document.querySelector(".links a[href*=" + sectionId + "]").classList.remove("active")

    }
  })
}

window.addEventListener("scroll", scrollActive)
/*============= Skills animation ======*/

const skills_wrap = document.querySelector(".about-skill"),
  skills_bar = document.querySelectorAll(".progress-line");
window.addEventListener("scroll", () => {
  skillEffect();
  /// checkScroll(skills_wrap);
})
// every time we scroll checking , we exceded the about-skills or not

function checkScroll(el) {
  let rect = el.getBoundingClientRect();

  // after knowing the amount of pixels between the top edge of about skills and the top edge of window
  if (window.innerHeight >= rect.top + el.offsetHeight) return true;
  return false;
}
function skillEffect() {
  if (checkScroll(skills_wrap)) return;
  skills_bar.forEach((skill) => (skill.style.width = skill.dataset.progress));
}
/*============= Portfolio Item Filter ======*/
const FilterContainer = document.querySelector(".portfolio-filter");
const filterBtns = FilterContainer.children;
const totalFilterBtn = filterBtns.length;
const portfolioItems = document.querySelectorAll(".portfolio-item");
const totalPortfolioItem = portfolioItems.length;

for (let i = 0; i < totalFilterBtn; i++) {
  filterBtns[i].addEventListener("click", function () {
    const activeBtn = FilterContainer.querySelector(".active");
    if (activeBtn) activeBtn.classList.remove("active");
    this.classList.add("active");

    const filterValue = this.getAttribute("data-filter");

    for (let k = 0; k < totalPortfolioItem; k++) {
      if
        (filterValue === portfolioItems[k].getAttribute("data-category") || filterValue === "all") {
        portfolioItems[k].classList.remove("hide");
        portfolioItems[k].classList.add("show");
      }
      else {
        portfolioItems[k].classList.remove("show");
        portfolioItems[k].classList.add("hide");
      }
    }
  });
}

/*============= Portfolio Item Filter end ======*/
/*============= Lightbox======*/
   lightbox = document.querySelector(".lightbox"),
  lightboxImg = lightbox.querySelector(".lightbox-img"),
  lightboxClose = lightbox.querySelector(".lightbox-close"),
  lightboxText = lightbox.querySelector(".caption-text"),
  lightboxCounter = lightbox.querySelector(".caption-counter");
let itemIndex = 0;

for (let i = 0; i < totalPortfolioItem; i++) {
  portfolioItems[i].addEventListener("click", function () {
    itemIndex = i;
    changeItem();
    toggleLightbox()
    // console.log(i);
  })
}
       function nextItem()
       {
        if (itemIndex == totalPortfolioItem - 1)
        {
          itemIndex = 0;

        }
        else
        {
         itemIndex++
        }
       changeItem();
       }
      //  
      function prevItem()
      {
       if (itemIndex == 0)
       {
         itemIndex = totalPortfolioItem -1;

       }
       else
       {
        itemIndex--
       }
      changeItem();
      }
      function toggleLightbox() {
  lightbox.classList.toggle("open");
}
function changeItem() {
  imgSrc = portfolioItems[itemIndex].querySelector(".portfolio-img img").getAttribute("src");
  lightboxImg.src = imgSrc;
  lightboxText.innerHTML = portfolioItems[itemIndex].querySelector("h4").innerHTML;
            lightboxCounter.innerHTML=(itemIndex+1) + " of  " + totalPortfolioItem;
}
                 /*============= Close Lightbox======*/
                 lightbox.addEventListener("click", function(event)
                {
                 if(event.target === lightboxClose || event.target === lightbox)
                {
                toggleLightbox()
              }
             })
              




