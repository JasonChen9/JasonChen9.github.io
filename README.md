# Guangyu Xiang — Academic Website

Personal academic website for Guangyu Xiang, built with the [al-folio](https://github.com/alshedivat/al-folio) v1.1 starter and published with GitHub Pages.

## Content

- About and research interests: `_pages/about.md`
- Publications: `_bibliography/papers.bib`
- Bilingual four-sentence explanations and full abstracts: `_data/publication_details.json`, keyed by the BibTeX citation key
- Education and experience: `_data/cv.yml`
- Public contact links: `_data/socials.yml`

The website source is maintained on `master`. The generated site is published automatically to `gh-pages`; that generated branch should not be edited manually.

The English and Chinese homepages and publication pages share the same paper content. Each paper shows one sentence each for background, challenge, method, and results. The `Abstract` / `摘要` button sits beside the source and citation links and opens the full English abstract or its explicitly labeled AI Chinese translation, with a link to the source. Native `Abs` disclosures remain available without JavaScript. Citation metadata and BibTeX remain in `papers.bib`.

On desktop, hovering over the abstract button previews the abstract; moving into the text keeps it open, and leaving both areas closes the preview after a short delay. Clicking pins it open; clicking again or pressing Escape closes it. Touch and keyboard users can use the same button.

`_layouts/bib.liquid` overrides the bibliography template from the pinned `al_folio_core` 1.0.12 theme; review that override when upgrading the theme.
