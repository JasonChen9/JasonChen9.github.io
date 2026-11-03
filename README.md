# Guangyu Xiang — Academic Website

Personal academic website for Guangyu Xiang, built with the [al-folio](https://github.com/alshedivat/al-folio) v1.1 starter and published with GitHub Pages.

## Content

- About and research interests: `_pages/about.md`
- Publications: `_bibliography/papers.bib`
- Bilingual four-sentence explanations and full abstracts: `_data/publication_details.json`, keyed by the BibTeX citation key
- Homepage education and experience: `_data/cv.yml`
- Editable PDF CVs: `cv/cv-en.tex` (English), `cv/cv-zh.tex` (Chinese), and their shared style `cv/cv-style.sty`
- Public contact links: `_data/socials.yml`

The website source is maintained on `master`. The generated site is published automatically to `gh-pages`; that generated branch should not be edited manually.

## PDF CVs

The English **CV** navigation link opens `/assets/pdf/guangyu-xiang-cv.pdf` directly, and the Chinese **简历** link opens
`/assets/pdf/guangyu-xiang-cv-zh.pdf`. Existing `/cv/` and `/zh/cv/` URLs immediately redirect to the corresponding PDF, with a clickable fallback link.

Edit `cv/cv-en.tex` and `cv/cv-zh.tex` together; both use `cv/cv-style.sty` for layout and typography. The website's publication metadata remains in
`_bibliography/papers.bib`, so publication changes must also be reflected in both TeX sources. `_data/cv.yml` continues to supply the homepage's education
and experience sections; it does not generate the PDF CVs.

Both CVs use `cv/assets/photo.jpg` in the upper-right corner of the first page. Replace this file to update the portrait; the shared style preserves its
aspect ratio within a 22 mm by 27 mm box.

With XeLaTeX or Tectonic installed, regenerate both PDFs from the repository root:

```sh
sh scripts/build-cv.sh
```

The script automatically selects `xelatex`, falling back to `tectonic`. Set `CV_TEX_ENGINE` to an executable path to select a specific installation:

```sh
CV_TEX_ENGINE=/path/to/tectonic sh scripts/build-cv.sh
```

The shared style uses TeX Gyre Heros and FandolHei fonts distributed with TeX; no macOS fonts are required. Tectonic downloads the required packages and
fonts on its first build. After both languages compile successfully, the script replaces the two tracked PDFs in `assets/pdf/`. Commit the editable TeX
sources and regenerated PDFs together.

The previous HTML CV content remains available in Git history. `_pages/cv.md` and `_pages/zh_cv.md` now hold the language-specific navigation and redirect
settings; `_layouts/pdf-redirect.liquid` provides the redirects without JavaScript.

## Publication pages

The English and Chinese homepages and publication pages share the same paper content. Each paper shows one sentence each for background, challenge, method, and results. The `Abstract` / `摘要` button sits beside the source and citation links and opens the full English abstract or its explicitly labeled AI Chinese translation, with a link to the source. Native `Abs` disclosures remain available without JavaScript. Citation metadata and BibTeX remain in `papers.bib`.

On desktop, hovering over the abstract button previews the abstract; moving into the text keeps it open, and leaving both areas closes the preview after a short delay. Clicking pins it open; clicking again or pressing Escape closes it. Touch and keyboard users can use the same button.

`_layouts/bib.liquid` overrides the bibliography template from the pinned `al_folio_core` 1.0.12 theme; review that override when upgrading the theme.
