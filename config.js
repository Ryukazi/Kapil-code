/* ============================================================
   config.js — edit your image LINKS here (no image files needed)
   Only two local files are used: assets/music.mp3 and assets/profile.mp4
   ============================================================ */
window.SITE = {
  // Shown while the profile video loads (optional, leave "" to skip)
  profilePoster: "https://i.ibb.co/ymkRDQHj/Screenshot-20260307-165522-1.jpg",

  // Gallery photos: paste your image links (ibb.co, imgur, etc.)
  gallery: [
    "https://i.ibb.co/KzQyD3yt/IMG-20250623-223450-664.jpg",
    "https://i.ibb.co/VYCrDZ00/IMG-20250630-113451-117.jpg",
    "https://i.ibb.co/k2r0Xcqw/IMG-20250703-160911-136.jpg",
    "https://i.ibb.co/dJpZsWkL/IMG-20250711-075308-659.jpg",
    "https://i.ibb.co/yFQVb6Sr/IMG-20251115-121421-003.jpg",
    "https://i.ibb.co/7wGGFfQ/IMG-20260304-082906-498.jpg",
    "https://i.ibb.co/5XMZXjKV/IMG-20260304-091642-450.jpg",
    "https://i.ibb.co/5hXh67kb/IMG-20260427-202510-407.jpg",
    "https://i.ibb.co/4ZnX2MZ9/IMG-20260725-161742-850.jpg"
  ]
};

(() => {
  const v = document.getElementById('heroVideo');
  if (v && SITE.profilePoster) v.poster = SITE.profilePoster;

  const grid = document.getElementById('galleryGrid');
  const section = document.getElementById('gallery');
  if (!grid) return;
  if (!SITE.gallery.length) {            // no photos yet: hide section + nav link
    section.style.display = 'none';
    const a = document.querySelector('.nav-links a[href="#gallery"]');
    if (a) a.parentElement.style.display = 'none';
    return;
  }
  grid.innerHTML = SITE.gallery.map((src, i) =>
    `<div class="gallery-item"><img src="${src}" alt="Gallery photo ${i + 1}" loading="lazy"></div>`).join('');
})();
