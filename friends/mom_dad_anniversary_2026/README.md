# Mom & Dad's anniversary timeline

Live at **https://sanchitcop19.github.io/friends/mom_dad_anniversary_2026/**

Same idea as the birthday pages (poem, then a photo timeline, then a closing
note), in gold and rose instead of teal, with two anniversary-only bits:

- **Drawn rings** above the title.
- **A live "together for" counter**: years, days, hours, and a seconds count
  that ticks with a little heartbeat. It also works out the
  "Happy 30th Anniversary" line and the "Married 8 December 1996" line.

Both come from one field in `data.js`:

```js
weddingDate: "1996-12-08",
```

Leave it blank and the counter hides itself.

## Adding photos

The easy way is the caption editor at `/tools/captions.html`: pick
`mom_dad_anniversary_2026`, upload photos, write titles, publish.

Or from this folder:

```bash
./add-photos.sh ~/Desktop/mom-dad-photos
```

It resizes everything into `photos/` and prints `moments` entries with the
dates filled in. Paste them into `data.js`. See `../makayla_2026/README.md`
for how the dates are worked out.

## Notes

- `data.js` is the only file you need to touch. The global is still called
  `BIRTHDAY` so the caption editor can read it.
- The poem in `data.js` is a starter. Swap in your own lines.
- The setup panel at the bottom shows until `weddingDate` is set and there's at
  least one moment.
- Honours `prefers-reduced-motion`: no count-up, no drifting hearts.
