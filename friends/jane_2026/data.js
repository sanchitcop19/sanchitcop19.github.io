/* ============================================================
   EDIT THIS FILE — nothing else.

   Moments run oldest first and every one is dated. To add another,
   drop it into the list in the right spot — the left/right alternation
   sorts itself out.

   Within June 2026, "Red curtain" is the 7th and "Front of house" the
   19th, so they sit in that order even though both chips read June 2026.

   Fields: photo, date, title. A `caption` is still supported if
   you ever want one on a particular moment, but none are used.

   Adding more:  ./add-photos.sh ~/some/folder
   Publishing:   git add . && git commit -m "photos" && git push
   ============================================================ */

window.BIRTHDAY = {
    /* ── Hero ─────────────────────────────────────────────── */

    name: "Ms. Jane Han",

    eyebrow: "Happy Birthday",

    subtitle: "Every now and again I meet someone and it's like I've known them forever <3",

    /* ── A poem before the timeline ───────────────────────── */

    poem: [
        "One of our first pictures is literally you helping put me in a dress, so this friendship was never gonna be normal.",
        "Then you turned 18 or smth, made me watch The Great, and somehow made eating fries look like a whole event.",
        "I got you into Leprous, you taught me to color, and we kept choosing cute over comfortable for no good reason.",
        "We got launched around in bubble suits, got way too drunk in costumes, and nearly made badminton a contact sport.",
        "I still can't believe we drove 40 minutes for coffee, but yeah I'd obviously do it again.",
        "Thanks for being down for anything, even when the plan is pretending to read in a library or stopping every five minutes on some rocks.",
        "Somewhere between Luna's apartment getting shot up, you falling in love with Faith, and me keeping you unmoshed, we became really close frens.",
        "Happy birthday Jane, love you lots, and pls never become normal <3",
    ],

    /* ── The timeline ─────────────────────────────────────── */
    /* Oldest first. They alternate left/right automatically. */

    moments: [
        { photo: "photos/2024-06-tp-dress.jpg", date: "June 2024", title: "The first time you laid hands on me" },
        { photo: "photos/2024-07-mylar.jpg", date: "July 2024", title: "Everybody should watch The Great" },
        { photo: "photos/2024-09-capybara.jpg", date: "September 2024", title: "The first time you turned 18 or smth" },
        { photo: "photos/2025-04-fries.jpg", date: "April 2025", title: "When you showed up like you always do" },
        { photo: "photos/2025-04-concert-group.jpg", date: "April 2025", title: "The day Leprous gained a new fan" },
        {
            photo: "photos/2025-06-costume-rooftop.jpg",
            date: "June 2025",
            title: "Choosing cute over comfort as usual",
        },
        {
            photo: "photos/2025-08-bubble-soccer.jpg",
            date: "August 2025",
            title: "The day we sent everyone flying",
        },
        { photo: "photos/2025-10-wednesday.jpg", date: "October 2025", title: "The day you taught me to color" },
        { photo: "photos/2025-10-birthday-cake.jpg", date: "October 2025", title: "The day we got really drunk" },
        {
            photo: "photos/2025-12-badminton.jpg",
            date: "December 2025",
            title: "The day I slammed shuttles in your face",
        },
        { photo: "photos/2026-05-library.jpg", date: "May 2026", title: "The day I learnt we were close frens" },
        { photo: "photos/2026-06-bar.jpg", date: "June 2026", title: "The day Luna's apartment was shot up" },
        { photo: "photos/2026-06-venue.jpg", date: "June 2026", title: "The day you fell in love with Faith" },
        {
            photo: "photos/2026-07-coffee.jpg",
            date: "July 2026",
            title: "Because driving 40 min to get coffee is what sane people do",
        },
        { photo: "photos/2026-08-concert.jpg", date: "August 2026", title: "The day I saved you from getting moshed" },
        { photo: "photos/2026-09-rocks.jpg", date: "September 2026", title: "The day you took way too many breaks" },
    ],

    /* ── The closing note ─────────────────────────────────── */

    closing: {
        title: "Love you 🫶",
        signoff: "— Sanchit",
    },
};
