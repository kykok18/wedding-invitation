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
  createParticles();
}

function createParticles() {
  const container = document.getElementById("particles");
  if (!container) return;

  const count = 28;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    const size = 2 + Math.random() * 4;
    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 6 + "s";
    particle.style.animationDuration = 5 + Math.random() * 4 + "s";

    container.appendChild(particle);
  }
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
  const container = document.getElementById("slideshow");
  const dotsContainer = document.getElementById("slideDots");
  const counter = document.getElementById("slideCounter");

  if (!container || !dotsContainer || !counter) return;

  slides.forEach((slide, index) => {
    const slideEl = document.createElement("div");
    slideEl.className = `slide ${index === 0 ? "active" : ""}`;
    slideEl.innerHTML = `<img src="${slide.src}" alt="${slide.alt}" loading="lazy">`;
    container.appendChild(slideEl);

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

  container.addEventListener("mouseenter", stopSlideShow);
  container.addEventListener("mouseleave", startSlideShow);
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
   GALLERY (MASONRY)
======================================== */
const galleryImages = [
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=480&fit=crop", alt: "Portrait 1" },
  { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=280&fit=crop", alt: "Landscape 1" },
  { src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&h=340&fit=crop", alt: "Square 1" },
  { src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=500&fit=crop", alt: "Portrait 2" },
  { src: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=400&h=280&fit=crop", alt: "Landscape 2" },
  { src: "https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=400&h=310&fit=crop", alt: "Landscape 3" },
  { src: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=400&h=520&fit=crop", alt: "Portrait 3" },
  { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=280&fit=crop", alt: "Landscape 4" },
  { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=360&fit=crop", alt: "Square 2" },
];

function initGallery() {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;

  galleryImages.forEach((img, index) => {
    const item = document.createElement("div");
    item.className = "gallery-item";
    item.innerHTML = `<img src="${img.src}" alt="${img.alt}" loading="lazy">`;
    item.addEventListener("click", () => {
      currentLightboxIndex = index;
      openLightbox(slides[index % slides.length].src);
    });
    grid.appendChild(item);
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
  const img = document.getElementById("lightboxImg");
  if (!lightbox || !img) return;

  img.src = src;
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function updateLightboxImage() {
  const img = document.getElementById("lightboxImg");
  if (img) {
    img.src = slides[currentLightboxIndex % slides.length].src;
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

  function update() {
    const container = document.getElementById("countdown");
    if (!container) return;

    const now = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
      container.innerHTML = `
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

    const d = document.getElementById("countDays");
    const h = document.getElementById("countHours");
    const m = document.getElementById("countMinutes");
    const s = document.getElementById("countSeconds");

    if (d) d.textContent = String(days).padStart(2, "0");
    if (h) h.textContent = String(hours).padStart(2, "0");
    if (m) m.textContent = String(minutes).padStart(2, "0");
    if (s) s.textContent = String(seconds).padStart(2, "0");
  }

  update();
  setInterval(update, 1000);
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
  form.addEventListener("submit", handleSubmit);
}

function handleSubmit(e) {
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

  const waNumber = WEDDING_CONFIG.whatsappNumber;
  const text = `*Konfirmasi Kehadiran Pernikahan*\n\nNama: ${name}\nKehadiran: ${attendance}\n\nUcapan:\n${message}`;
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;

  window.open(waUrl, "_blank");

  e.target.reset();
  loadWishes();
}

function loadWishes() {
  const list = document.getElementById("wishesList");
  if (!list) return;

  let wishes = JSON.parse(localStorage.getItem("weddingWishes")) || [];
  if (wishes.length === 0) {
    wishes = defaultWishes;
    localStorage.setItem("weddingWishes", JSON.stringify(wishes));
  }

  list.innerHTML = wishes
    .slice(0, 10)
    .map((w) => {
      const cls = w.attendance.toLowerCase().replace(/ /g, "-");
      const initials = w.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
      const time = getTimeAgo(w.timestamp);

      return `
      <div class="wish-item">
        <div class="wish-header">
          <div class="wish-avatar">
            <div class="wish-avatar-icon">${initials}</div>
            <div>
              <span class="wish-name">${escapeHtml(w.name)}</span>
              <span class="wish-time">${time}</span>
            </div>
          </div>
          <span class="wish-attendance ${cls}">${w.attendance}</span>
        </div>
        <p class="wish-message">${escapeHtml(w.message)}</p>
      </div>
    `;
    })
    .join("");
}

function getTimeAgo(ts) {
  if (!ts) return "";
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (mins < 1) return "Baru saja";
  if (mins < 60) return `${mins} menit lalu`;
  if (hrs < 24) return `${hrs} jam lalu`;
  if (days < 7) return `${days} hari lalu`;
  return new Date(ts).toLocaleDateString("id-ID");
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
  const toggle = document.getElementById("musicToggle");
  const audio = document.getElementById("bgMusic");
  const icon = document.getElementById("musicIcon");

  if (!toggle || !audio || !icon) return;

  let isPlaying = false;
  let interacted = false;

  const startOnInteraction = () => {
    if (!interacted) {
      interacted = true;
      audio
        .play()
        .then(() => {
          isPlaying = true;
          icon.className = "fa-solid fa-pause music-icon";
          toggle.classList.add("playing");
        })
        .catch(() => {});
    }
    document.removeEventListener("click", startOnInteraction);
  };

  document.addEventListener("click", startOnInteraction);

  toggle.addEventListener("click", () => {
    if (isPlaying) {
      audio.pause();
      icon.className = "fa-solid fa-music music-icon";
      toggle.classList.remove("playing");
    } else {
      audio.play().catch(() => {});
      icon.className = "fa-solid fa-pause music-icon";
      toggle.classList.add("playing");
    }
    isPlaying = !isPlaying;
  });

  audio.addEventListener("ended", () => {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  });
}

/* ========================================
   SCROLL REVEAL & NAVIGATION
======================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");
  const panel = document.getElementById("contentPanel");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    {
      root: panel,
      threshold: 0.15,
      rootMargin: "0px 0px -20px 0px",
    },
  );

  reveals.forEach((r) => observer.observe(r));
}

function initBottomNav() {
  const items = document.querySelectorAll(".nav-item");
  const sections = document.querySelectorAll(".section");
  const panel = document.getElementById("contentPanel");

  if (!panel) return;

  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = item.getAttribute("data-target");
      const target = document.getElementById(targetId);

      if (target) {
        panel.scrollTo({
          top: target.offsetTop - 15,
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
          items.forEach((item) => {
            item.classList.remove("active");
            if (item.getAttribute("data-target") === id) {
              item.classList.add("active");
            }
          });
        }
      });
    },
    {
      root: panel,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    },
  );

  sections.forEach((s) => observer.observe(s));
}

function updateMapsLink() {
  const link = document.getElementById("mapsLink");
  if (link && WEDDING_CONFIG.mapsLink) {
    link.href = WEDDING_CONFIG.mapsLink;
  }
}
