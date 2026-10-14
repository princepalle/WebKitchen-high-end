# WebKitchen — high-end websites for restaurants & kitchens

Static site: plain HTML, CSS and JavaScript. No build step and no dependencies.

## Pages
- `/` — WebKitchen studio site (`index.html`, `studio.css`, `studio.js`). Add your contact email or phone at the top of `studio.js` to turn on the "Start a project" buttons.
- `/demo/nocturne/` — **The Nocturne**, a fine-dining concept: cinematic hero, story, three rooms, tonight's special and tasting menu, chef profile, and a reservation form. Restaurant details, opening days, seating times and where bookings are sent (`bookingEndpoint`, e.g. a Formspree URL) are at the top of `nocturne.js`.
- `/demo/african-caribbean/` — **Ember** style for African Caribbean Cuisine (Palestine, TX). Phone and address at the top of `demo.js`. The guest quote is a sample; replace it with a real review before launch.
- `/demo/bright/` — **Bright** style with an order cart. Set `PHONE` in `bright.js` to send orders by text.
- `/demo/bold/` — **Bold** style. Set `PHONE` at the bottom of its `index.html`.
- `/demo/classic/` — **Classic** style: the original African Caribbean Cuisine site.

Ember, Bright and Bold share the menu in `demo/african-caribbean/menu.js`. All menu prices are samples.

## Photos
Sample photos are loaded from Wikimedia Commons and credited in each page's footer. If a photo can't load, the page shows a styled placeholder instead of a broken image.

For African Caribbean Cuisine, drop real photos into `demo/african-caribbean/images/` with these names and they replace the samples:
`hero.jpg`, `dish-poisson.jpg`, `dish-ndole.jpg`, `dish-eru.jpg`, `dish-jollof.jpg`, `dish-egusi.jpg`, `dish-soya.jpg`, `catering.jpg`, `owner.jpg`.

For The Nocturne, replace the image URLs in `demo/nocturne/index.html` with your own files.

## Run locally
`python3 -m http.server 8000` in this folder, then open http://localhost:8000.

## Deploy
On Vercel: Add New → Project → import this repo → Framework "Other" → Deploy. Every push to `main` then goes live automatically.
