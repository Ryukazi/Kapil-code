/* ============================================================
   config.js — Denish's Profile Website
   Video and music hosted on GitHub
   ============================================================ */

window.SITE = {
  // Profile video poster
  profilePoster:
    "https://i.ibb.co/ymkRDQHj/Screenshot-20260307-165522-1.jpg",

  // Profile video hosted on GitHub
  profileVideo:
    "https://raw.githubusercontent.com/Ryukazi/Kapil-code/main/assets/2026-10-07-075338241.mp4",

  // Background music hosted on GitHub
  backgroundMusic:
    "https://raw.githubusercontent.com/Ryukazi/Kapil-code/main/assets/pixy-legacy-slowed-down-128-ytshorts.savetube.me.mp3",

  // Gallery photos
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
  const video = document.getElementById("heroVideo");

  if (video) {
    if (SITE.profilePoster) {
      video.poster = SITE.profilePoster;
    }

    video.src = SITE.profileVideo;
    video.load();
  }

  // Set up background music if an audio element exists
  const music = document.getElementById("backgroundMusic");

  if (music) {
    music.src = SITE.backgroundMusic;
    music.loop = true;
    music.load();
  }

  // Render gallery
  const grid = document.getElementById("galleryGrid");
  const section = document.getElementById("gallery");

  if (!grid) return;

  if (!SITE.gallery.length) {
    if (section) section.style.display = "none";

    const link = document.querySelector(
      '.nav-links a[href="#gallery"]'
    );

    if (link && link.parentElement) {
      link.parentElement.style.display = "none";
    }

    return;
  }

  grid.innerHTML = SITE.gallery
    .map(
      (src, index) => `
        <div class="gallery-item">
          <img
            src="${src}"
            alt="Gallery photo ${index + 1}"
            loading="lazy"
          >
        </div>
      `
    )
    .join("");
})();
