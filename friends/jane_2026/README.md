# Jane's birthday timeline

Live at **https://sanchitcop19.github.io/friends/jane_2026/**

## Adding photos

The fast way, from this folder:

```bash
./add-photos.sh ~/Desktop/jane-photos
```

It resizes everything into `photos/` (long edge capped at 1800px, so the repo
stays small and the page stays fast) and prints `moments` entries with the date
already filled in from each photo's metadata. Paste those into `data.js`, write
the titles and captions, then:

```bash
git add . && git commit -m "add photos" && git push
```

The live page updates about a minute later.

## Doing it by hand

Drop files into `photos/`, then add an entry to `moments` in `data.js`:

```js
{
  photo:   "photos/venice.jpg",
  date:    "August 2023",
  title:   "The night we missed the last train",
  caption: "Walked two hours back to the hotel and agreed it was worth it."
}
```

Oldest first — they alternate left and right down the page automatically.
Every field except `photo` is optional. A moment with **no** `photo` renders as
a short italic interlude, which is a nice beat between pictures.

## Notes

- `data.js` is the only file you need to touch.
- The setup panel at the bottom of the page vanishes on its own once the last
  `sample: true` moment is gone. Nobody else will see it before then.
- Captions are inserted as plain text, so apostrophes, emoji and quotes are all
  safe — nothing in a caption can break the layout.
- Clicking a photo opens it full screen; arrow keys and swipe move between them.
- Honours `prefers-reduced-motion`: animation is dropped for anyone who's asked
  their system for less of it.
