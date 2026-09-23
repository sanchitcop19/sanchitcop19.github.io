#!/usr/bin/env bash
#
# Resize photos into photos/ and print ready-to-paste data.js entries.
#
#   ./add-photos.sh ~/Desktop/her-photos
#
# Dates come from EXIF capture time, a Google Takeout .json sidecar, or a
# date in the filename — whichever is available, in that order.
#
# Uses sips and date, both built into macOS. Nothing is installed,
# nothing is deleted, and your originals are never modified.

set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEST="$HERE/photos"
MAX_EDGE=1800

SRC="${1:-}"
if [ -z "$SRC" ]; then
  echo "usage: ./add-photos.sh <folder-of-photos>" >&2
  exit 1
fi
if [ ! -d "$SRC" ]; then
  echo "error: '$SRC' is not a folder" >&2
  exit 1
fi

mkdir -p "$DEST"

added=0
skipped=0
undated=0
entries=""

while IFS= read -r file; do
  base="$(basename "$file")"
  stem="${base%.*}"
  ext="${base##*.}"

  # Lowercase, strip anything that would need URL-encoding.
  clean="$(printf '%s' "$stem" \
    | tr '[:upper:]' '[:lower:]' \
    | sed -e 's/[^a-z0-9]\{1,\}/-/g' -e 's/^-//' -e 's/-$//')"
  [ -z "$clean" ] && clean="photo"

  lower_ext="$(printf '%s' "$ext" | tr '[:upper:]' '[:lower:]')"
  # HEIC and HEIF both have to become JPEG — no browser renders them reliably.
  case "$lower_ext" in heic|heif) lower_ext="jpg" ;; esac

  out="$DEST/$clean.$lower_ext"
  if [ -e "$out" ]; then
    n=2
    while [ -e "$DEST/$clean-$n.$lower_ext" ]; do n=$((n + 1)); done
    out="$DEST/$clean-$n.$lower_ext"
  fi

  if [ "$lower_ext" = "jpg" ]; then
    sips -s format jpeg -s formatOptions 82 \
         --resampleHeightWidthMax "$MAX_EDGE" \
         "$file" --out "$out" >/dev/null 2>&1 || { skipped=$((skipped + 1)); continue; }
  else
    sips --resampleHeightWidthMax "$MAX_EDGE" \
         "$file" --out "$out" >/dev/null 2>&1 || { skipped=$((skipped + 1)); continue; }
  fi

  # Month + year, tried in descending order of trustworthiness.
  when=""

  # 1. EXIF capture time, in the camera's own local time. This is the one
  #    that's actually right: mdls reports UTC, which silently rolls a
  #    late-evening photo into the next day (and sometimes the next month).
  exif="$(sips -g creation "$file" 2>/dev/null | awk '/creation:/{print $2}')"
  if [ -n "$exif" ]; then
    when="$(date -j -f "%Y:%m:%d" "$exif" "+%B %Y" 2>/dev/null || true)"
  fi

  # 2. Google Takeout sidecar. A Takeout export strips EXIF from the image
  #    and puts the real capture time in a neighbouring .json as an epoch.
  if [ -z "$when" ]; then
    for sidecar in "$file.json" "$file.supplemental-metadata.json" "${file%.*}.json"; do
      [ -f "$sidecar" ] || continue
      epoch="$(sed -n 's/.*"photoTakenTime"[^}]*"timestamp"[[:space:]]*:[[:space:]]*"\([0-9]*\)".*/\1/p' "$sidecar" | head -1)"
      [ -n "$epoch" ] && when="$(date -r "$epoch" "+%B %Y" 2>/dev/null || true)"
      [ -n "$when" ] && break
    done
  fi

  # 3. A date baked into the filename, which is how Pixel, Android and many
  #    export tools name things: PXL_20250629_..., IMG_20240629_..., 20250809_...
  if [ -z "$when" ]; then
    digits="$(printf '%s' "$base" | sed -n 's/.*\([12][0-9]\{3\}[01][0-9][0-3][0-9]\).*/\1/p' | head -1)"
    [ -n "$digits" ] && when="$(date -j -f "%Y%m%d" "$digits" "+%B %Y" 2>/dev/null || true)"
  fi

  # 4. Nothing readable. Leave it blank rather than inventing one — the page
  #    renders an undated moment cleanly.
  if [ -z "$when" ]; then
    undated=$((undated + 1))
  fi

  entries="${entries}    {
      photo:   \"photos/$(basename "$out")\",
      date:    \"${when}\",
      title:   \"\",
      caption: \"\"
    },
"
  added=$((added + 1))
done < <(find "$SRC" -maxdepth 1 -type f \
           \( -iname '*.jpg'  -o -iname '*.jpeg' -o -iname '*.png'  \
              -o -iname '*.heic' -o -iname '*.heif' -o -iname '*.webp' \
              -o -iname '*.tif'  -o -iname '*.tiff' \) \
         | sort)

if [ "$added" -eq 0 ]; then
  echo "No images found in '$SRC'." >&2
  exit 1
fi

echo ""
echo "Resized $added photo(s) into photos/ (long edge capped at ${MAX_EDGE}px)."
[ "$skipped" -gt 0 ] && echo "Skipped $skipped file(s) that couldn't be read."
[ "$undated" -gt 0 ] && echo "$undated had no readable date — fill those in by hand."
echo ""
echo "Paste this into the moments list in data.js, then fill in the blanks:"
echo ""
printf '%s' "$entries"
echo ""
