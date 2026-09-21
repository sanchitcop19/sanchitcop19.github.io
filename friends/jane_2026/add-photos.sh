#!/usr/bin/env bash
#
# Resize photos into photos/ and print ready-to-paste data.js entries.
#
#   ./add-photos.sh ~/Desktop/her-photos
#
# Uses sips and mdls, both built into macOS. Nothing is installed,
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
  [ "$lower_ext" = "heic" ] && lower_ext="jpg"

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

  # Human month + year from the photo's own metadata, when it has any.
  raw="$(mdls -raw -name kMDItemContentCreationDate "$file" 2>/dev/null || true)"
  when=""
  if [ -n "$raw" ] && [ "$raw" != "(null)" ]; then
    when="$(date -j -f "%Y-%m-%d %H:%M:%S %z" "$raw" "+%B %Y" 2>/dev/null || true)"
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
           \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.heic' \) \
         | sort)

if [ "$added" -eq 0 ]; then
  echo "No images found in '$SRC'." >&2
  exit 1
fi

echo ""
echo "Resized $added photo(s) into photos/ (long edge capped at ${MAX_EDGE}px)."
[ "$skipped" -gt 0 ] && echo "Skipped $skipped file(s) that couldn't be read."
echo ""
echo "Paste this into the moments list in data.js, then fill in the blanks:"
echo ""
printf '%s' "$entries"
echo ""
