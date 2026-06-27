window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        if (loader) {
            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
            loader.style.pointerEvents = "none";
        }
    }, 1200);
});
// ================= CUSTOM CURSOR =================
const cursor = document.querySelector(".cursor");

if (cursor) {
  window.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });
}

// ================= CARD MOUSE GLOW =================
const cards = document.querySelectorAll(".preview-card");

cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(244,180,0,0.16), #ffffff 40%)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.background = "#ffffff";
  });
});

// ================= SKILLS ANIMATION =================
const skillCards = document.querySelectorAll(".skill-card");

if (skillCards.length) {
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.2 });

  skillCards.forEach((card) => skillObserver.observe(card));
}

// ================= PORTFOLIO FILTER =================
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioCards = document.querySelectorAll(".portfolio-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    portfolioCards.forEach((card) => {
      if (filter === "all" || card.dataset.category === filter) {
        card.classList.remove("hide");
      } else {
        card.classList.add("hide");
      }
    });
  });
});

// ================= GALLERY LIGHTBOX =================
const galleryImages = document.querySelectorAll(".portfolio-img");
const galleryLightbox = document.getElementById("galleryLightbox");
const galleryImage = document.getElementById("galleryImage");
const galleryClose = document.querySelector(".gallery-close");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

let currentIndex = 0;

function showGalleryImage(index) {
  if (!galleryImage || !galleryImages.length) return;
  galleryImage.src = galleryImages[index].src;
  currentIndex = index;
}

if (galleryLightbox && galleryImage && galleryImages.length) {
  galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => {
      galleryLightbox.classList.add("active");
      showGalleryImage(index);
    });
  });

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % galleryImages.length;
      showGalleryImage(currentIndex);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      showGalleryImage(currentIndex);
    });
  }

  if (galleryClose) {
    galleryClose.addEventListener("click", () => {
      galleryLightbox.classList.remove("active");
    });
  }

  galleryLightbox.addEventListener("click", (e) => {
    if (e.target === galleryLightbox) {
      galleryLightbox.classList.remove("active");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (!galleryLightbox.classList.contains("active")) return;
    if (e.key === "ArrowRight" && nextBtn) nextBtn.click();
    if (e.key === "ArrowLeft" && prevBtn) prevBtn.click();
    if (e.key === "Escape") galleryLightbox.classList.remove("active");
  });
}

// ================= STATS COUNTER =================
const counters = document.querySelectorAll(".counter");
const statsSection = document.querySelector(".stats");
let counterStarted = false;

function startCounters() {
  if (counterStarted || !statsSection) return;

  const sectionTop = statsSection.getBoundingClientRect().top;
  const triggerPoint = window.innerHeight * 0.7;

  if (sectionTop < triggerPoint) {
    counterStarted = true;

    counters.forEach((counter) => {
      const target = Number(counter.dataset.target);
      let count = 0;
      const increment = target / 160;

      function updateCounter() {
        if (count < target) {
          count += increment;
          counter.innerText = Math.ceil(count);
          requestAnimationFrame(updateCounter);
        } else {
          counter.innerText = target;
        }
      }

      updateCounter();
    });
  }
}

window.addEventListener("scroll", startCounters);

// ================= NAVBAR / MOBILE MENU =================
const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const navLinksMenu = document.getElementById("navLinks");

function closeMobileMenu() {
  if (!navLinksMenu || !menuToggle) return;
  navLinksMenu.classList.remove("active");
  document.body.classList.remove("menu-open");
  menuToggle.innerText = "☰";
  menuToggle.setAttribute("aria-label", "Open menu");
}

window.addEventListener("scroll", () => {
  if (!navbar) return;
  if (window.scrollY > 80) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

if (menuToggle && navLinksMenu) {
  menuToggle.addEventListener("click", () => {
    navLinksMenu.classList.toggle("active");
    document.body.classList.toggle("menu-open", navLinksMenu.classList.contains("active"));
    menuToggle.innerText = navLinksMenu.classList.contains("active") ? "×" : "☰";
    menuToggle.setAttribute(
      "aria-label",
      navLinksMenu.classList.contains("active") ? "Close menu" : "Open menu"
    );
  });

  navLinksMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });
}

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) closeMobileMenu();
});

// ================= LOADER =================
const loader = document.getElementById("loader");

window.addEventListener("load", () => {
  if (!loader) return;
  setTimeout(() => {
    loader.classList.add("hide");
  }, 1200);
});

// ================= SCROLL PROGRESS =================
const scrollProgress = document.getElementById("scrollProgress");

window.addEventListener("scroll", () => {
  if (!scrollProgress) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = progress + "%";
});

// ================= BACK TO TOP =================
const backTop = document.getElementById("backTop");

if (backTop) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      backTop.classList.add("show");
    } else {
      backTop.classList.remove("show");
    }
  });

  backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ================= ACTIVE NAV LINK =================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

function setActiveNavLink() {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 180;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveNavLink);
window.addEventListener("load", setActiveNavLink);

const darkBtn = document.getElementById("darkModeBtn");

if (darkBtn) {
    darkBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        darkBtn.textContent = document.body.classList.contains("dark-mode")
            ? "☀️"
            : "🌙";
    });
}

const themeToggle = document.getElementById("themeToggle");
const toggleIcon = document.querySelector(".toggle-icon");

if (themeToggle && toggleIcon) {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        toggleIcon.textContent = "☀️";
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            toggleIcon.textContent = "☀️";
            localStorage.setItem("theme", "dark");
        } else {
            toggleIcon.textContent = "🌙";
            localStorage.setItem("theme", "light");
        }
    });
}

window.addEventListener("scroll", () => {
    if (!navbar) return;

    if(window.scrollY > 80){
        navbar.classList.add("scrolled");
    }else{
        navbar.classList.remove("scrolled");
    }
});/* =====================================
   PREMIUM CONTACT SECTION
===================================== */

// Copy Email
const copyBtn = document.querySelector(".copy-btn");

if (copyBtn) {
    copyBtn.addEventListener("click", () => {

        navigator.clipboard.writeText("soumya7001019064@gmail.com");

        copyBtn.innerHTML = "✓ Copied";

        setTimeout(() => {
            copyBtn.innerHTML = "Copy";
        }, 2000);

    });
}


// Contact Form
const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function(e){

        e.preventDefault();

        const button = this.querySelector("button");

        button.innerHTML = "Sending...";

        button.disabled = true;

        setTimeout(() => {

            button.innerHTML = "✓ Message Sent";

            button.style.background = "#28a745";

            this.reset();

            setTimeout(() => {

                button.innerHTML = "✈ Send Message";

                button.style.background = "";

                button.disabled = false;

            },2500);

        },1500);

    });

}