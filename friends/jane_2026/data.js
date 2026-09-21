/* ============================================================
   EDIT THIS FILE — nothing else.

   1. Put your photos in the  photos/  folder next to this file.
   2. Replace the sample moments below with real ones, oldest first.
   3. git add . && git commit -m "photos" && git push
      The live page updates about a minute later.

   Every field is optional except `photo`. A moment with no photo
   renders as a quiet italic interlude between pictures — good for
   an inside joke or a one-line beat.

   The `sample: true` lines are what keep the setup panel showing at
   the bottom of the page. Delete them along with the sample moments
   and the panel disappears on its own.
   ============================================================ */

window.BIRTHDAY = {

  /* ── Hero ─────────────────────────────────────────────── */

  name: "Jane",                        // the big name on the cover

  eyebrow: "Happy Birthday",           // small text above the name

  subtitle: "Some people you meet and it's like you've always known them. " +
            "Here are a few of the moments that got us here.",

  note: "Best viewed with the sound of us arguing about where to eat.",

  /* ── The timeline ─────────────────────────────────────── */
  /* Oldest at the top. They alternate left/right automatically. */

  moments: [
    {
      sample: true,
      // photo:   "photos/01.jpg",
      date:    "Sample — replace me",
      title:   "The day we met",
      caption: "This is what a moment looks like. Add a photo by dropping the " +
               "file into photos/ and uncommenting the photo line above."
    },
    {
      sample: true,
      // photo:   "photos/02.jpg",
      date:    "Sample — replace me",
      title:   "That trip",
      caption: "Keep captions to a sentence or two. The photo does the heavy " +
               "lifting; the words just point at what made it funny."
    },
    {
      sample: true,
      // A moment with no photo reads as a quiet interlude.
      caption: "and roughly four hundred smaller days in between."
    },
    {
      sample: true,
      // photo:   "photos/03.jpg",
      date:    "Sample — replace me",
      title:   "Last year",
      caption: "Delete these four samples once you've added your own."
    }
  ],

  /* ── The closing note ─────────────────────────────────── */

  closing: {
    title:   "Happy Birthday, Jane",
    body:    "Write the real message here.\n\n" +
             "Blank lines work — this block keeps your line breaks, so you " +
             "can let it breathe.",
    signoff: "— Sanchit"
  },

  /* Shown after she clicks the cake. */
  wishMade: "wish granted"
};
