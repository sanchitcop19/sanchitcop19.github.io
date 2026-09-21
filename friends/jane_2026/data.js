/* ============================================================
   EDIT THIS FILE — nothing else.

   The first seven moments are dated from each photo's own EXIF
   capture time (local time, not UTC). The nine after them came
   through as pasted images with their metadata stripped, so they
   have no date yet — add one to each `date` field and move the
   entry into place, and the timeline reorders itself.

   Captions are a first pass. Replace them with your words.

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
    {
      photo:   "photos/2024-06-tp-dress.jpg",
      date:    "June 2024",
      title:   "Haute couture, one ply",
      caption: "Whatever the occasion was, the dress code was clearly toilet paper."
    },
    {
      photo:   "photos/2025-10-wednesday.jpg",
      date:    "October 2025",
      title:   "Committing to the bit",
      caption: "Halloween prep. Two people taking a costume far too seriously, " +
               "which is the only correct way to take one."
    },
    {
      photo:   "photos/2025-10-birthday-cake.jpg",
      date:    "October 2025",
      title:   "Last year's cake",
      caption: "A birthday that happens to land on the best night of the year."
    },
    {
      photo:   "photos/2026-06-venue.jpg",
      date:    "June 2026",
      title:   "Front of house",
      caption: "Somewhere loud, somewhere dark, everyone grinning anyway."
    },
    {
      photo:   "photos/2026-07-coffee.jpg",
      date:    "July 2026",
      title:   "Coffee, outdoors, no agenda",
      caption: "The kind of afternoon that doesn't need a reason."
    },
    {
      photo:   "photos/2026-08-concert.jpg",
      date:    "August 2026",
      title:   "Second row, ears ringing",
      caption: "Worth every decibel."
    },
    {
      photo:   "photos/2026-09-rocks.jpg",
      date:    "September 2026",
      title:   "Peak performance",
      caption: "Conquered the mountain. Immediately lay down on it."
    },

    /* ── Undated — EXIF was stripped when these were pasted.
          Add a `date` to each and drag it up into place.  ── */

    {
      photo:   "photos/undated-library.jpg",
      title:   "Scholars, allegedly",
      caption: "Fourteen people holding books. Approximately one person reading."
    },
    {
      photo:   "photos/undated-bubble-soccer.jpg",
      title:   "Bubble soccer",
      caption: "Nobody remembers the score. Everybody remembers the bruises."
    },
    {
      photo:   "photos/undated-badminton.jpg",
      title:   "Court side",
      caption: "A perfectly good team photo, ruined beautifully from below."
    },
    {
      photo:   "photos/undated-costume-rooftop.jpg",
      title:   "Reporting for duty",
      caption: "Rooftop, golden hour, full commitment to the costume."
    },
    {
      photo:   "photos/undated-mylar.jpg",
      title:   "Three burritos",
      caption: "Whatever the weather was doing, we out-engineered it."
    },
    {
      photo:   "photos/undated-fries.jpg",
      title:   "Caught",
      caption: "Mid-fry, direct eye contact, zero shame."
    },
    {
      photo:   "photos/undated-bar.jpg",
      title:   "Red curtain, small glasses",
      caption: "The round where the conversation got good."
    },
    {
      photo:   "photos/undated-concert-group.jpg",
      title:   "The whole crew",
      caption: "Everyone in one frame for once."
    },
    {
      photo:   "photos/undated-capybara.jpg",
      title:   "Best in show",
      caption: "I don't know where the capybara came from and I've stopped asking."
    }
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
