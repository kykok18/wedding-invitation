/* ========================================
   WEDDING CONFIGURATION
======================================== */
const WEDDING_CONFIG = {
  groomName: "Mario Indra Subagja",
  brideName: "Angela Putri",
  groomFather: "Hendra Subagja",
  groomMother: "Dewi Sartika",
  brideFather: "Budiman",
  brideMother: "Ratna Sari",
  weddingDate: new Date("2026-06-28T06:00:00+07:00"),
  akadTime: "06:00 - 10:00 WIB",
  resepsiTime: "10:00 - Selesai WIB",
  venue: "Gedung Serbaguna Jakarta",
  address: "Jl. Gatot Subroto No. 123, Jakarta Selatan",
  whatsappNumber: "6281234567890",
  mapsLink: "https://maps.app.goo.gl/xxxxx",
};

/* ========================================
   INITIALIZATION
======================================== */
document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".cover-page")) {
    initCoverPage();
  }

  if (document.querySelector(".dashboard-page")) {
    initDashboardPage();
  }
});

function initCoverPage() {
  // Add subtle animation to flower decorations
  const flowers = document.querySelectorAll(".flower-decor");
  flowers.forEach((flower, index) => {
    flower.style.animation = `floatFlower ${6 + index}s ease-in-out infinite`;
  });
}

function initDashboardPage() {
  initSlideshow();
  initGallery();
  initRSVP();
  initMusicPlayer();
  initLightbox();
  initCountdown();
  loadWishes();
  initScrollReveal();
  initBottomNav();
  updateMapsLink();
}

/* ========================================
   SLIDESHOW
======================================== */
let currentSlide = 0;
let slideInterval = null;
let currentLightboxIndex = 0;

const slides = [
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop", alt: "Foto 1" },
  { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop", alt: "Foto 2" },
  { src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=600&fit=crop", alt: "Foto 3" },
  { src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=600&fit=crop", alt: "Foto 4" },
  { src: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=800&h=600&fit=crop", alt: "Foto 5" },
  { src: "https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=800&h=600&fit=crop", alt: "Foto 6" },
  { src: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&h=600&fit=crop", alt: "Foto 7" },
  { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop", alt: "Foto 8" },
];

function initSlideshow() {
  const slideshowContainer = document.getElementById("slideshow");
  const dotsContainer = document.getElementById("slideDots");
  const counter = document.getElementById("slideCounter");

  if (!slideshowContainer || !dotsContainer || !counter) return;

  slides.forEach((slide, index) => {
    const slideElement = document.createElement("div");
    slideElement.className = `slide ${index === 0 ? "active" : ""}`;
    slideElement.innerHTML = `<img src="${slide.src}" alt="${slide.alt}" loading="lazy">`;
    slideshowContainer.appendChild(slideElement);

    const dot = document.createElement("button");
    dot.className = `slide-dot ${index === 0 ? "active" : ""}`;
    dot.setAttribute("aria-label", `Slide ${index + 1}`);
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  counter.querySelector(".total").textContent = slides.length;

  document.getElementById("prevSlide").addEventListener("click", prevSlide);
  document.getElementById("nextSlide").addEventListener("click", nextSlide);

  startSlideShow();

  slideshowContainer.addEventListener("mouseenter", stopSlideShow);
  slideshowContainer.addEventListener("mouseleave", startSlideShow);
}

function goToSlide(index) {
  const allSlides = document.querySelectorAll(".slide");
  const allDots = document.querySelectorAll(".slide-dot");
  const counter = document.getElementById("slideCounter");

  if (allSlides.length === 0) return;

  allSlides[currentSlide].classList.remove("active");
  allSlides[index].classList.add("active");

  allDots[currentSlide].classList.remove("active");
  allDots[index].classList.add("active");

  counter.querySelector(".current").textContent = index + 1;

  currentSlide = index;
}

function nextSlide() {
  goToSlide((currentSlide + 1) % slides.length);
}

function prevSlide() {
  goToSlide((currentSlide - 1 + slides.length) % slides.length);
}

function startSlideShow() {
  stopSlideShow();
  slideInterval = setInterval(nextSlide, 4000);
}

function stopSlideShow() {
  if (slideInterval) {
    clearInterval(slideInterval);
    slideInterval = null;
  }
}

/* ========================================
   GALLERY - MASONRY WITH VARIED HEIGHTS
======================================== */
const galleryImages = [
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=500&fit=crop", alt: "Portrait 1", height: 500 },
  { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop", alt: "Landscape 1", height: 300 },
  { src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&h=350&fit=crop", alt: "Square 1", height: 350 },
  { src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=500&fit=crop", alt: "Portrait 2", height: 500 },
  { src: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=400&h=300&fit=crop", alt: "Landscape 2", height: 300 },
  { src: "https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=400&h=300&fit=crop", alt: "Landscape 3", height: 300 },
  { src: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=400&h=500&fit=crop", alt: "Portrait 3", height: 500 },
  { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop", alt: "Landscape 4", height: 300 },
  { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=350&fit=crop", alt: "Square 2", height: 350 },
];

function initGallery() {
  const galleryGrid = document.getElementById("galleryGrid");
  if (!galleryGrid) return;

  galleryImages.forEach((img, index) => {
    const item = document.createElement("div");
    item.className = "gallery-item";
    item.innerHTML = `<img src="${img.src}" alt="${img.alt}" loading="lazy" style="height: ${img.height}px; object-fit: cover;">`;
    item.addEventListener("click", () => {
      currentLightboxIndex = index;
      openLightbox(slides[index % slides.length].src);
    });
    galleryGrid.appendChild(item);
  });
}

/* ========================================
   LIGHTBOX
======================================== */
function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const closeBtn = document.getElementById("lightboxClose");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");

  if (!lightbox) return;

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentLightboxIndex = (currentLightboxIndex - 1 + galleryImages.length) % galleryImages.length;
      updateLightboxImage();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentLightboxIndex = (currentLightboxIndex + 1) % galleryImages.length;
      updateLightboxImage();
    });
  }

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;

    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowLeft") {
      currentLightboxIndex = (currentLightboxIndex - 1 + galleryImages.length) % galleryImages.length;
      updateLightboxImage();
    } else if (e.key === "ArrowRight") {
      currentLightboxIndex = (currentLightboxIndex + 1) % galleryImages.length;
      updateLightboxImage();
    }
  });
}

function openLightbox(src) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  if (!lightbox || !lightboxImg) return;

  lightboxImg.src = src;
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function updateLightboxImage() {
  const lightboxImg = document.getElementById("lightboxImg");
  if (lightboxImg) {
    lightboxImg.src = galleryImages[currentLightboxIndex].src;
  }
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }
}

/* ========================================
   COUNTDOWN
======================================== */
function initCountdown() {
  const weddingDate = WEDDING_CONFIG.weddingDate;

  function updateCountdown() {
    const countdownContainer = document.getElementById("countdown");
    if (!countdownContainer) return;

    const now = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
      countdownContainer.innerHTML = `
        <div class="countdown-finished">
          <i class="fa-solid fa-heart"></i>
          <span>Acara Telah Berlangsung</span>
        </div>
      `;
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const countDays = document.getElementById("countDays");
    const countHours = document.getElementById("countHours");
    const countMinutes = document.getElementById("countMinutes");
    const countSeconds = document.getElementById("countSeconds");

    if (countDays) countDays.textContent = String(days).padStart(2, "0");
    if (countHours) countHours.textContent = String(hours).padStart(2, "0");
    if (countMinutes) countMinutes.textContent = String(minutes).padStart(2, "0");
    if (countSeconds) countSeconds.textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/* ========================================
   RSVP & WISHES
======================================== */
const defaultWishes = [
  { name: "Ahmad Fauzi", attendance: "Hadir", message: "Selamat menempuh hidup baru! Semoga menjadi keluarga sakinah, mawaddah, warahmah.", timestamp: Date.now() - 86400000 },
  { name: "Siti Nurhaliza", attendance: "Hadir", message: "Selamat ya! Semoga pernikahannya lancar dan bahagia selalu.", timestamp: Date.now() - 172800000 },
  { name: "Budi Santoso", attendance: "Tidak Hadir", message: "Mohon maaf tidak bisa hadir, tapi saya doakan yang terbaik!", timestamp: Date.now() - 259200000 },
];

function initRSVP() {
  const form = document.getElementById("rsvpForm");
  if (!form) return;
  form.addEventListener("submit", handleRSVPSubmit);
}

function handleRSVPSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("guestName").value.trim();
  const attendance = document.getElementById("attendance").value;
  const message = document.getElementById("message").value.trim();

  if (!name || name.length < 3 || !attendance || !message) {
    alert("Mohon lengkapi semua field dengan benar!");
    return;
  }

  const wishes = JSON.parse(localStorage.getItem("weddingWishes")) || [];
  wishes.unshift({ name, attendance, message, timestamp: Date.now() });
  localStorage.setItem("weddingWishes", JSON.stringify(wishes));

  const whatsappNumber = WEDDING_CONFIG.whatsappNumber;
  const text = `*Konfirmasi Kehadiran Pernikahan*\n\nNama: ${name}\nKehadiran: ${attendance}\n\nUcapan:\n${message}`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

  window.open(whatsappUrl, "_blank");

  e.target.reset();
  loadWishes();
}

function loadWishes() {
  const wishesList = document.getElementById("wishesList");
  if (!wishesList) return;

  let wishes = JSON.parse(localStorage.getItem("weddingWishes")) || [];
  if (wishes.length === 0) {
    wishes = defaultWishes;
    localStorage.setItem("weddingWishes", JSON.stringify(wishes));
  }

  wishesList.innerHTML = wishes
    .slice(0, 10)
    .map((wish) => {
      const attendanceClass = wish.attendance.toLowerCase().replace(/ /g, "-");
      const initials = wish.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
      const timeAgo = getTimeAgo(wish.timestamp);

      return `
      <div class="wish-item">
        <div class="wish-header">
          <div class="wish-avatar">
            <div class="wish-avatar-icon">${initials}</div>
            <div>
              <span class="wish-name">${escapeHtml(wish.name)}</span>
              <span class="wish-time">${timeAgo}</span>
            </div>
          </div>
          <span class="wish-attendance ${attendanceClass}">${wish.attendance}</span>
        </div>
        <p class="wish-message">${escapeHtml(wish.message)}</p>
      </div>
    `;
    })
    .join("");
}

function getTimeAgo(timestamp) {
  if (!timestamp) return "";
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "Baru saja";
  if (minutes < 60) return `${minutes} menit lalu`;
  if (hours < 24) return `${hours} jam lalu`;
  if (days < 7) return `${days} hari lalu`;
  return new Date(timestamp).toLocaleDateString("id-ID");
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

/* ========================================
   MUSIC PLAYER
======================================== */
function initMusicPlayer() {
  const musicToggle = document.getElementById("musicToggle");
  const bgMusic = document.getElementById("bgMusic");
  const musicIcon = document.getElementById("musicIcon");

  if (!musicToggle || !bgMusic || !musicIcon) return;

  let isPlaying = false;
  let userInteracted = false;

  const startOnInteraction = () => {
    if (!userInteracted) {
      userInteracted = true;
      bgMusic
        .play()
        .then(() => {
          isPlaying = true;
          musicIcon.className = "fa-solid fa-pause music-icon";
          musicToggle.classList.add("playing");
        })
        .catch(() => {});
    }
    document.removeEventListener("click", startOnInteraction);
  };

  document.addEventListener("click", startOnInteraction);

  musicToggle.addEventListener("click", () => {
    if (isPlaying) {
      bgMusic.pause();
      musicIcon.className = "fa-solid fa-music music-icon";
      musicToggle.classList.remove("playing");
    } else {
      bgMusic.play().catch(() => {});
      musicIcon.className = "fa-solid fa-pause music-icon";
      musicToggle.classList.add("playing");
    }
    isPlaying = !isPlaying;
  });

  bgMusic.addEventListener("ended", () => {
    bgMusic.currentTime = 0;
    bgMusic.play().catch(() => {});
  });
}

/* ========================================
   SCROLL REVEAL & NAVIGATION
======================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");
  const contentPanel = document.getElementById("contentPanel");

  const revealOnScroll = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    {
      root: contentPanel,
      threshold: 0.15,
      rootMargin: "0px 0px -30px 0px",
    },
  );

  reveals.forEach((reveal) => revealOnScroll.observe(reveal));
}

function initBottomNav() {
  const navItems = document.querySelectorAll(".nav-item");
  const sections = document.querySelectorAll(".section");
  const contentPanel = document.getElementById("contentPanel");

  if (!contentPanel) return;

  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = item.getAttribute("data-target");
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        contentPanel.scrollTo({
          top: targetSection.offsetTop - 20,
          behavior: "smooth",
        });
      }
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navItems.forEach((navItem) => {
            navItem.classList.remove("active");
            if (navItem.getAttribute("data-target") === id) {
              navItem.classList.add("active");
            }
          });
        }
      });
    },
    {
      root: contentPanel,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    },
  );

  sections.forEach((section) => observer.observe(section));
}

function updateMapsLink() {
  const mapsLink = document.getElementById("mapsLink");
  if (mapsLink && WEDDING_CONFIG.mapsLink) {
    mapsLink.href = WEDDING_CONFIG.mapsLink;
  }
}

/* ========================================
   FLOAT ANIMATION FOR FLOWERS
======================================== */
const floatStyle = document.createElement("style");
floatStyle.textContent = `
  @keyframes floatFlower {
    0%, 100% { transform: rotate(-15deg) translateY(0); }
    50% { transform: rotate(-15deg) translateY(-10px); }
  }
  @keyframes floatFlower {
    0%, 100% { transform: rotate(165deg) translateY(0); }
    50% { transform: rotate(165deg) translateY(-10px); }
  }
`;
document.head.appendChild(floatStyle);
