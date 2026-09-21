/* ============================================================
   EDIT THIS FILE — nothing else.

   Moments run oldest first. Twelve are dated; the last four aren't
   yet — give one a `date` and move it up into place, and that's it.

   Within June 2026, "Red curtain" is the 7th and "Front of house"
   the 19th, so they're ordered that way even though both chips just
   read June 2026.

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
    { photo: "photos/2024-07-mylar.jpg",         date: "July 2024",      title: "Three burritos" },
    { photo: "photos/2024-09-capybara.jpg",      date: "September 2024", title: "Best in show" },
    { photo: "photos/2025-04-fries.jpg",         date: "April 2025",     title: "Caught" },
    { photo: "photos/2025-04-concert-group.jpg", date: "April 2025",     title: "The whole crew" },
    { photo: "photos/2025-10-wednesday.jpg",     date: "October 2025",   title: "Committing to the bit" },
    { photo: "photos/2025-10-birthday-cake.jpg", date: "October 2025",   title: "Last year's cake" },
    { photo: "photos/2026-06-bar.jpg",           date: "June 2026",      title: "Red curtain, small glasses" },
    { photo: "photos/2026-06-venue.jpg",         date: "June 2026",      title: "Front of house" },
    { photo: "photos/2026-07-coffee.jpg",        date: "July 2026",      title: "Coffee, outdoors, no agenda" },
    { photo: "photos/2026-08-concert.jpg",       date: "August 2026",    title: "Second row, ears ringing" },
    { photo: "photos/2026-09-rocks.jpg",         date: "September 2026", title: "Peak performance" },

    /* ── Still undated. Add a `date` and move the entry up into place. ── */

    { photo: "photos/undated-library.jpg",         date: "", title: "Scholars, allegedly" },
    { photo: "photos/undated-bubble-soccer.jpg",   date: "", title: "Bubble soccer" },
    { photo: "photos/undated-badminton.jpg",       date: "", title: "Court side" },
    { photo: "photos/undated-costume-rooftop.jpg", date: "", title: "Reporting for duty" }
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
