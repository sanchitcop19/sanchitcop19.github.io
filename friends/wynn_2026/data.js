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

    name: "Ms. Wynn Pho",

    eyebrow: "Happy Birthday",

    subtitle: "",

    /* ── The timeline ─────────────────────────────────────── */
    /* Oldest first. They alternate left/right automatically. */

    moments: [
        { photo: "photos/waterfall-hike.jpg" },
        { photo: "photos/lake-hike-group.jpg" },
        { photo: "photos/rooftop-group.jpg" },
        { photo: "photos/campsite-selfie.jpg" },
        { photo: "photos/kitchen-party.jpg" },
        { photo: "photos/car-window-sunset.jpg" },
        { photo: "photos/beyond-wonderland.jpg" },
        { photo: "photos/plane-nap.jpg" },
        { photo: "photos/blue-bar.jpg" },
        { photo: "photos/bereal-schnitzel.jpg" },
        { photo: "photos/plane-nap-cutout.png" },
        { photo: "photos/concert-selfie.jpg" },
        { photo: "photos/crepes-brunch.jpg" },
        { photo: "photos/birthday-cake.jpg" },
        { photo: "photos/skeleton-bar.jpg" },
        { photo: "photos/half-marathon-portraits.jpg" },
    ],

    /* ── The closing note ─────────────────────────────────── */

    closing: {
        title: "Happy Birthday",
        signoff: "— Sanchit",
    },
};
