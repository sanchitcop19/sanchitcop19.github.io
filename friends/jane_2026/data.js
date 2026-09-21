/* ============================================================
   EDIT THIS FILE — nothing else.

   The first seven moments are dated from each photo's own EXIF
   capture time (local, not UTC). The nine after them came through
   as pasted images with their metadata stripped, so they have no
   date yet — add one to each `date` field and move the entry into
   place, and the timeline reorders itself.

   Fields: photo, date, title. A `caption` is still supported if
   you ever want one on a particular moment, but none are used.

   Adding more:  ./add-photos.sh ~/some/folder
   Publishing:   git add . && git commit -m "photos" && git push
   ============================================================ */

window.BIRTHDAY = {

  /* ── Hero ─────────────────────────────────────────────── */

  name: "Jane",

  eyebrow: "Happy Birthday",

  subtitle: "Some people you meet and it's like you've always known them. " +
            "Here are a few of the moments that got us here.",

  note: "Best viewed with the sound of us arguing about where to eat.",

  /* ── The timeline ─────────────────────────────────────── */
  /* Oldest first. They alternate left/right automatically. */

  moments: [
    { photo: "photos/2024-06-tp-dress.jpg",      date: "June 2024",      title: "Haute couture, one ply" },
    { photo: "photos/2025-10-wednesday.jpg",     date: "October 2025",   title: "Committing to the bit" },
    { photo: "photos/2025-10-birthday-cake.jpg", date: "October 2025",   title: "Last year's cake" },
    { photo: "photos/2026-06-venue.jpg",         date: "June 2026",      title: "Front of house" },
    { photo: "photos/2026-07-coffee.jpg",        date: "July 2026",      title: "Coffee, outdoors, no agenda" },
    { photo: "photos/2026-08-concert.jpg",       date: "August 2026",    title: "Second row, ears ringing" },
    { photo: "photos/2026-09-rocks.jpg",         date: "September 2026", title: "Peak performance" },

    /* ── Undated — EXIF was stripped when these were pasted.
          Add a `date` to each and move it up into place.   ── */

    { photo: "photos/undated-library.jpg",         date: "", title: "Scholars, allegedly" },
    { photo: "photos/undated-bubble-soccer.jpg",   date: "", title: "Bubble soccer" },
    { photo: "photos/undated-badminton.jpg",       date: "", title: "Court side" },
    { photo: "photos/undated-costume-rooftop.jpg", date: "", title: "Reporting for duty" },
    { photo: "photos/undated-mylar.jpg",           date: "", title: "Three burritos" },
    { photo: "photos/undated-fries.jpg",           date: "", title: "Caught" },
    { photo: "photos/undated-bar.jpg",             date: "", title: "Red curtain, small glasses" },
    { photo: "photos/undated-concert-group.jpg",   date: "", title: "The whole crew" },
    { photo: "photos/undated-capybara.jpg",        date: "", title: "Best in show" }
  ],

  /* ── The closing note ─────────────────────────────────── */

  closing: {
    title:   "Happy Birthday, Jane",
    body:    "Replace this with the real message.\n\n" +
             "Blank lines work — this block keeps your line breaks, so you " +
             "can let it breathe.",
    signoff: "— Sanchit"
  },

  wishMade: "wish granted"
};
