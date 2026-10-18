# Spin Doctor website

A self-contained Bootstrap 5.3.8 showcase for the native macOS game. The site is in English, uses relative asset paths, and needs no Node.js build, account, CDN, or third-party font service.

## Preview locally

Run from the repository root:

```sh
python3 -m http.server 8000 --directory docs
```

Open <http://localhost:8000>. The page can also be opened directly from `index.html`; browser clipboard restrictions then use a text-selection fallback.

## Publish with GitHub Pages

1. Commit and push the `docs` folder to `main`.
2. In the GitHub repository, open **Settings → Pages**.
3. Set **Source** to **Deploy from a branch**.
4. Select **main**, choose **/docs**, and save.

The default project URL is <https://profdrluigi.github.io/SpinDoctorGame/>. This folder prepares the website; it does not change repository settings or publish anything itself. See [GitHub’s publishing-source documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Update the page

- `index.html`: content, gallery, controls, project links, and metadata.
- `assets/site.css`: responsive layout, color palette, and image size limits.
- `assets/site.js`: tempo preview, motion preference handling, image modal, mobile navigation, and copy button.
- `assets/images/`: four optimized screenshots from the Swift port. Each is at most 1,100 pixels wide; original game assets and research captures are unchanged. Images are displayed at smaller sizes and enlarge only on request.
- `assets/vendor/bootstrap/`: locally bundled CSS and JavaScript, with Bootstrap’s MIT license. Source-map comments are omitted because the optional source maps are not shipped.
- `.nojekyll`: serve the folder as plain static files.

Gallery captures represent actual native renders. The main-menu image uses the English interface. The wand in the tempo panel is an illustrative preview of the four speed ratios, not a browser version of the game. Reduced-motion preferences stop it by default; the visitor may explicitly start or pause it.

Bootstrap source: [official download documentation](https://getbootstrap.com/docs/5.3/getting-started/download/) and [v5.3.8 license](https://github.com/twbs/bootstrap/blob/v5.3.8/LICENSE). Original game artwork is credited to Callisto Corporation; bundling Bootstrap does not assign a license to the game or its artwork.
