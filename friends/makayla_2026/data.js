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

    name: "Ms. Makayla Chen",

    eyebrow: "Happy Birthday",

    subtitle: "",

    /* ── The timeline ─────────────────────────────────────── */
    /* Oldest first. They alternate left/right automatically. */

    moments: [
        { photo: "photos/dsc01638-enhanced-nr-copy.jpg", date: "June 2024" },
        { photo: "photos/pxl-20240818-052119013-mp.jpg", date: "August 2024" },
        { photo: "photos/img-4747.jpg", date: "February 2025" },
        { photo: "photos/img-5362.jpg", date: "June 2025" },
        { photo: "photos/img-3941.jpg", date: "June 2026" },
        { photo: "photos/img-2615.png" },
        { photo: "photos/img-4144.jpg" },
    ],

    /* ── The closing note ─────────────────────────────────── */

    closing: {
        title: "Happy Birthday",
        signoff: "— Sanchit",
    },
};
