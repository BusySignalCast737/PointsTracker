MY POINTS TRACKER — HOSTED WEB APP PACKAGE

IMPORTANT
This package is ready to publish as a static website. It is not yet hosted at a public URL. ChatGPT's built-in file preview may not run the JavaScript that powers the tracker; use the hosted site in Safari instead.

EASIEST PATH: GITHUB PAGES (free)
1. On your iPhone or computer, sign in to GitHub or create an account at github.com.
2. Create a new repository. You can name it my-points-tracker. If offered a visibility choice, choose Public for the simplest GitHub Pages setup. Do not upload personal tracking data; this repository contains only the app code.
3. Use Add file > Upload files and upload ALL FOUR files from this folder: index.html, manifest.json, icon.svg, and sw.js. Commit the upload.
4. In the repository, open Settings > Pages.
5. Under Build and deployment, choose Deploy from a branch. Select the main branch and /(root), then Save.
6. Wait for GitHub Pages to publish. The site URL will appear in Settings > Pages and usually looks like https://YOUR-USERNAME.github.io/my-points-tracker/ . Use the exact URL GitHub provides.
7. Open that URL in Safari on your iPhone. Test adding a food and refreshing the page to confirm it stays saved.
8. To add it to the Home Screen in Safari: tap Share > Add to Home Screen > Add.

DATA AND PRIVACY
- Food logs, saved foods, settings, and weigh-ins are stored in browser local storage on the device/browser where you use the app. They are not synced between devices.
- Export a JSON backup regularly from Settings & backup. Keep backups private because they contain your personal tracking data.
- Clearing Safari website data can erase the locally stored tracker data.
- The service worker caches app files for offline use after the first successful visit. Internet is needed for the first load and for future app updates.

CURRENT FEATURES
- Built-in common-food starter library with estimated nutrition and classic-Points calculations.
- Search the built-in library, log foods, and save foods to your personal list.
- Manual point logging and a nutrition-based estimate calculator.
- Daily 38-point allowance, weight history, chart, JSON backup/restore, and CSV export.

POINTS DISCLAIMER
Point values use an approximate classic-Points formula and typical food nutrition values, not an official WeightWatchers database or certified calculator. Confirm values against your own historical program materials and package labels.
