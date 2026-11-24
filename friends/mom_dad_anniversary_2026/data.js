/* ============================================================
   EDIT THIS FILE — nothing else.

   The global is still called BIRTHDAY so the caption editor at
   /tools/captions.html can read and update this page like the
   others. It's just a name.

   weddingDate drives the live "together for" counter and the
   "Happy Nth Anniversary" line. Use YYYY-MM-DD.

   Moments run oldest first. To add another, drop it into the
   list in the right spot — the left/right alternation sorts
   itself out. Fields: photo, date, title, and an optional
   caption. A moment with no photo renders as a quiet italic
   interlude.

   The setup panel at the bottom shows until weddingDate is set
   and there's at least one moment.

   Adding more:  ./add-photos.sh ~/some/folder
   Publishing:   git add . && git commit -m "photos" && git push
   ============================================================ */

window.BIRTHDAY = {
    /* ── Hero ─────────────────────────────────────────────── */

    name: "Mom & Dad",

    /* YYYY-MM-DD. Leave blank to hide the counter. */
    weddingDate: "",

    /* Leave blank and it becomes "Happy 30th Anniversary ♥"
       (or whichever number it is) once weddingDate is set. */
    eyebrow: "",

    /* Leave blank and it becomes "Married 8 December 1996". */
    subtitle: "",

    /* ── A poem before the timeline ───────────────────────── */
    /* A starter. Make it yours — the inside jokes are what land. */

    poem: [
        "Two people said yes on an ordinary day,",
        "And somehow it's still the best thing they say.",
        "Through cities and chaos, through money and none,",
        "Through raising a kid who thinks he's the fun one.",
        "You argue like pros and you make up like pros,",
        "You still split the last bite, and everyone knows.",
        "Whatever I've got that is gentle or wise,",
        "I learnt it from you two, right in front of my eyes.",
    ],

    /* ── The timeline ─────────────────────────────────────── */
    /* Oldest first. They alternate left/right automatically. */

    /* Each one looks like this:

       { photo: "photos/wedding.jpg", date: "December 1996", title: "The day you said yes" },

       The caption editor (/tools/captions.html) can upload photos
       and fill this list in for you. */

    moments: [],

    /* ── The closing note ─────────────────────────────────── */

    closing: {
        title: "Happy Anniversary ♥",
        body: "",
        signoff: "— Sanchit",
    },
};
