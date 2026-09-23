/* ============================================================
   EDIT THIS FILE — nothing else.

   Moments run oldest first and every one is dated. To add another,
   drop it into the list in the right spot — the left/right alternation
   sorts itself out.

   Fields: photo, date, title, and an optional caption.

   Adding more:  ./add-photos.sh ~/some/folder
   Publishing:   git add . && git commit -m "photos" && git push
   ============================================================ */

window.BIRTHDAY = {
    /* ── Hero ─────────────────────────────────────────────── */

    name: "Wynn",

    eyebrow: "Happy Birthday",

    subtitle: "",

    /* ── The timeline ─────────────────────────────────────── */
    /* Oldest first. They alternate left/right automatically. */

    moments: [],

    /* ── The closing note ─────────────────────────────────── */

    closing: {
        title: "Happy Birthday",
        signoff: "— Sanchit",
    },
};
