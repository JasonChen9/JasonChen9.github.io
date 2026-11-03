#!/bin/sh
# Compile the editable English and Chinese TeX sources into the public PDFs.
set -eu

cv_repo=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
cv_engine=${CV_TEX_ENGINE:-}
if [ -z "$cv_engine" ]; then
  if command -v xelatex >/dev/null 2>&1; then
    cv_engine=xelatex
  elif command -v tectonic >/dev/null 2>&1; then
    cv_engine=tectonic
  else
    echo 'Install XeLaTeX (TeX Live/MacTeX) or Tectonic, then rerun this script.' >&2
    exit 1
  fi
fi

cv_build=$(mktemp -d "${TMPDIR:-/tmp}/academic-cv.XXXXXX")
trap 'rm -rf "$cv_build"' EXIT HUP INT TERM
cd "$cv_repo/cv"

for cv_lang in en zh; do
  case "$(basename "$cv_engine")" in
    tectonic*)
      "$cv_engine" --keep-logs --outdir "$cv_build" "cv-$cv_lang.tex"
      ;;
    *)
      "$cv_engine" -halt-on-error -interaction=nonstopmode -output-directory="$cv_build" "cv-$cv_lang.tex"
      "$cv_engine" -halt-on-error -interaction=nonstopmode -output-directory="$cv_build" "cv-$cv_lang.tex"
      ;;
  esac
  if grep -E 'Missing character:|Overfull \\[hv]box' "$cv_build/cv-$cv_lang.log"; then
    echo "Fix missing glyphs or overflowing content in cv-$cv_lang.tex before publishing." >&2
    exit 1
  fi
done

# Only replace the published files after both languages build successfully.
mkdir -p "$cv_repo/assets/pdf"
cp "$cv_build/cv-en.pdf" "$cv_repo/assets/pdf/guangyu-xiang-cv.pdf"
cp "$cv_build/cv-zh.pdf" "$cv_repo/assets/pdf/guangyu-xiang-cv-zh.pdf"
echo 'Built assets/pdf/guangyu-xiang-cv.pdf and assets/pdf/guangyu-xiang-cv-zh.pdf'
