// ========== Sticky Navbar ========== //
// Note: Is code mein 'navbar' variable use ho raha hai,
// lekin aapke HTML mein ID 'mainNav' hai. Agar aap ID use kar rahe hain
// toh yeh line bhi badalni padegi: const navbar = document.getElementById('mainNav');
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
});

/* ------ Typing Effect ------- */
var TypingEffect = new Typed(".typedText", {
    strings: [
        "Professional Freelancer Web Developer",
        "WordPress Developer",
        "Web Designer",
        "Frontend Developer"
    ],
    loop: true,
    typeSpeed: 20,
    backSpeed: 20,
    backDelay: 1000,
});

// ========== NAV TOGGLE (REMOVED) ========== //
// Bootstrap ka 'data-bs-toggle' is functionality ko khud handle karta hai.

// ========== Close Menu on Link Click (Mobile) ========== //
// Jab user mobile menu mein link par click kare, toh menu band ho jaye.
const navLink = document.querySelectorAll(".nav-link");
const navCollapse = document.querySelector(".navbar-collapse"); 

navLink.forEach(n =>
    n.addEventListener("click", () => {
        // Agar collapse menu khula hua hai, toh use band karo (Bootstrap function)
        if (navCollapse && navCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navCollapse, { toggle: false });
            bsCollapse.hide();
        }
    })
);

// ========== Back to Top Button ========== //
const mybutton = document.getElementById("btn-back-to-top");
window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
});
mybutton?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// ========== Scroll Section Active Link (FIXED) ========== //
const Section = document.querySelectorAll("section[id]");
function scrollActive() {
    const scrollY = window.scrollY;
    Section.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute("id");

        // FIX: '.links a' ko '.navbar-nav a' se badal diya gaya hai.
        const link = document.querySelector(".navbar-nav a[href*='#" + sectionId + "']");
        if (!link) return;

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}
window.addEventListener("scroll", scrollActive);

// ========== Portfolio Filter Section ========== //
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

// for pricing btn method
document.addEventListener('DOMContentLoaded', function() {
    // 1. Target all 'Get Started' buttons (using the existing class: btn-2)
    const pricingButtons = document.querySelectorAll('.btn-2'); 
    
    // 2. Target the Subject input field (using the added ID: subject-input)
    const subjectInput = document.getElementById('subject-input');
    
    if (pricingButtons.length > 0 && subjectInput) {
        pricingButtons.forEach(button => {
            // Ensure the button is for scrolling to contact and has the plan data
            if (button.getAttribute('href') === '#contact' && button.hasAttribute('data-plan')) {
                
                // Add Click Listener
                button.addEventListener('click', function(e) {
                    const selectedPlan = this.getAttribute('data-plan');
                    
                    if (selectedPlan) {
                        // Set the subject input value
                        subjectInput.value = `Enquiry for ${selectedPlan}`;
                        
                        // Scroll is handled by href="#contact"
                        
                        // Focus on the subject field for better User Experience
                        // Use a short delay before focusing to let the scroll complete
                        setTimeout(() => {
                           subjectInput.focus();
                        }, 500); 
                    }
                });
            }
        });
    }
});
// ========== Progress Bars Animation (Fixed) ========== //
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
