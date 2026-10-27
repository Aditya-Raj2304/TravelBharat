# Image guide

Every photo the site expects, the exact file name, and where it appears. **62 photos in total.**

## Rules (so nothing breaks on GitHub Pages or Vercel)

- **Extension: `.jpg` for every photo** (lowercase, not `.jpeg`, `.JPG` or `.png`). Both hosts run on Linux, where `Jaipur.JPG` and `jaipur.jpg` are different files.
- **File names: lowercase, hyphens, no spaces**, exactly as listed below.
- **Orientation: landscape**, with the main subject near the centre. The same photo is cropped to a wide banner, a 4:3 card and a tall tile, so keep important detail away from the edges.
- **Size:** 2000 px wide for banners/hero, 1600 px wide for everything else. Aim for **under 300 KB each** (use [squoosh.app](https://squoosh.app), JPEG quality 75-80). Page speed depends on this.
- **Rights:** use your own photos or ones you have permission to use (for example Unsplash, Pexels, or Wikimedia Commons with the required credit). Add credits to the About page if a licence needs it.
- A missing photo never breaks a page: a plain neutral colour shows in its place.
- To use `.webp` instead, change `ext` in `js/data.js` **and** find-and-replace `.jpg` with `.webp` in `index.html`. Staying with `.jpg` is simpler.

## Folder layout

```
images/
  home/          1 file
  categories/    5 files
  states/        8 files
  destinations/  48 files (3 per destination)
```

## 1. `images/home/` (1 photo)

| File | Where it shows | Size | What to use |
| --- | --- | --- | --- |
| `hero.jpg` | Home page hero (full width, behind the heading) | 2400 x 1400 | A wide, calm India landscape. Keep the lower-left area quiet because the heading sits there. |

## 2. `images/categories/` (5 photos)

Home page, "Five kinds of trip" cards (tall crop, text over the bottom).

| File | What to use |
| --- | --- |
| `heritage.jpg` | Fort, palace or monument |
| `nature.jpg` | Lake, hills or waterfall |
| `spiritual.jpg` | Temple, ghat or monastery |
| `adventure.jpg` | Mountain road, snow or trek |
| `beach.jpg` | Quiet beach, shoreline |

## 3. `images/states/` (8 photos)

Used for the state tiles (home, States page, "Keep exploring") and as the banner on each state page.

| File | State | What to use |
| --- | --- | --- |
| `rajasthan.jpg` | Rajasthan | Amber Fort on its hill, or Jaisalmer dunes at golden hour |
| `kerala.jpg` | Kerala | Houseboat on calm backwaters at dawn |
| `himachal-pradesh.jpg` | Himachal Pradesh | Snow-capped Dhauladhar range over a pine valley |
| `goa.jpg` | Goa | Palm-lined beach at sunset |
| `uttar-pradesh.jpg` | Uttar Pradesh | Taj Mahal from across the Yamuna / Mehtab Bagh |
| `tamil-nadu.jpg` | Tamil Nadu | Painted gopuram of a Dravidian temple |
| `ladakh.jpg` | Ladakh | Monastery on a ridge with bare mountains behind |
| `meghalaya.jpg` | Meghalaya | Living root bridge in misty forest |

## 4. `images/destinations/` (48 photos)

Three photos per destination:

- `<slug>.jpg`: the **main photo**. Shown on destination cards, as the banner on the destination page, and as the first gallery image.
- `<slug>-2.jpg` and `<slug>-3.jpg`: the other two gallery images.

| Destination | `<slug>.jpg` (main) | `<slug>-2.jpg` | `<slug>-3.jpg` |
| --- | --- | --- | --- |
| **Jaipur** (`jaipur`) | Hawa Mahal facade, front-on | Amber Fort ramparts or courtyard | Johari Bazaar street or Jantar Mantar instruments |
| **Udaipur** (`udaipur`) | City Palace above Lake Pichola | Jag Mandir island palace at dusk | Lakeside ghat with boats |
| **Alleppey (Alappuzha)** (`alleppey`) | Houseboat on the backwaters | Village canal lined with coconut palms | Kuttanad paddy fields |
| **Munnar** (`munnar`) | Tea plantations rolling over hills | Eravikulam hills / grassland viewpoint | Mattupetty Dam lake |
| **Manali** (`manali`) | Solang Valley, snow or green meadow | Hadimba Temple among deodar trees | Beas river at Old Manali |
| **Shimla** (`shimla`) | The Ridge with Christ Church | Kalka-Shimla toy train on its track | Mall Road, evening |
| **Palolem Beach** (`palolem`) | Crescent bay seen from the headland | Kayaks or boats on calm water | Beach huts at sunset |
| **Old Goa** (`old-goa`) | Basilica of Bom Jesus facade | Se Cathedral exterior | Church of St. Francis of Assisi |
| **Agra** (`agra`) | Taj Mahal, front with reflection | Agra Fort red sandstone walls | Itmad-ud-Daulah's Tomb |
| **Varanasi** (`varanasi`) | Ganga ghats at sunrise (also used as home spotlight) | Evening aarti at Dashashwamedh Ghat | Boats on the Ganga |
| **Madurai** (`madurai`) | Meenakshi Amman Temple gopuram | Thirumalai Nayak Palace pillared hall | Temple-town flower market |
| **Mahabalipuram** (`mahabalipuram`) | Shore Temple by the sea | Pancha Rathas monoliths | Arjuna's Penance rock relief |
| **Leh** (`leh`) | Leh Palace with mountains behind | Shanti Stupa | Thiksey Monastery |
| **Pangong Tso** (`pangong-tso`) | Wide view of the lake and mountains | Shoreline detail with clear water | Sunrise or night sky over the lake |
| **Shillong** (`shillong`) | Umiam Lake | Elephant Falls | Hill-city view or Police Bazaar |
| **Cherrapunji (Sohra)** (`cherrapunji`) | Nohkalikai Falls | Living root bridge near Sohra | Misty valley or Mawsmai Cave entrance |

## Reused photos (no extra files needed)

- Home spotlight banner uses `destinations/varanasi.jpg`.
- Home "Ideas to start with" cards use `destinations/alleppey.jpg`, `destinations/varanasi-2.jpg` and `destinations/cherrapunji.jpg`.

## Full checklist (copy file names)

- [ ] `images/home/hero.jpg`
- [ ] `images/categories/heritage.jpg`
- [ ] `images/categories/nature.jpg`
- [ ] `images/categories/spiritual.jpg`
- [ ] `images/categories/adventure.jpg`
- [ ] `images/categories/beach.jpg`
- [ ] `images/states/rajasthan.jpg`
- [ ] `images/states/kerala.jpg`
- [ ] `images/states/himachal-pradesh.jpg`
- [ ] `images/states/goa.jpg`
- [ ] `images/states/uttar-pradesh.jpg`
- [ ] `images/states/tamil-nadu.jpg`
- [ ] `images/states/ladakh.jpg`
- [ ] `images/states/meghalaya.jpg`
- [ ] `images/destinations/jaipur.jpg`
- [ ] `images/destinations/jaipur-2.jpg`
- [ ] `images/destinations/jaipur-3.jpg`
- [ ] `images/destinations/udaipur.jpg`
- [ ] `images/destinations/udaipur-2.jpg`
- [ ] `images/destinations/udaipur-3.jpg`
- [ ] `images/destinations/alleppey.jpg`
- [ ] `images/destinations/alleppey-2.jpg`
- [ ] `images/destinations/alleppey-3.jpg`
- [ ] `images/destinations/munnar.jpg`
- [ ] `images/destinations/munnar-2.jpg`
- [ ] `images/destinations/munnar-3.jpg`
- [ ] `images/destinations/manali.jpg`
- [ ] `images/destinations/manali-2.jpg`
- [ ] `images/destinations/manali-3.jpg`
- [ ] `images/destinations/shimla.jpg`
- [ ] `images/destinations/shimla-2.jpg`
- [ ] `images/destinations/shimla-3.jpg`
- [ ] `images/destinations/palolem.jpg`
- [ ] `images/destinations/palolem-2.jpg`
- [ ] `images/destinations/palolem-3.jpg`
- [ ] `images/destinations/old-goa.jpg`
- [ ] `images/destinations/old-goa-2.jpg`
- [ ] `images/destinations/old-goa-3.jpg`
- [ ] `images/destinations/agra.jpg`
- [ ] `images/destinations/agra-2.jpg`
- [ ] `images/destinations/agra-3.jpg`
- [ ] `images/destinations/varanasi.jpg`
- [ ] `images/destinations/varanasi-2.jpg`
- [ ] `images/destinations/varanasi-3.jpg`
- [ ] `images/destinations/madurai.jpg`
- [ ] `images/destinations/madurai-2.jpg`
- [ ] `images/destinations/madurai-3.jpg`
- [ ] `images/destinations/mahabalipuram.jpg`
- [ ] `images/destinations/mahabalipuram-2.jpg`
- [ ] `images/destinations/mahabalipuram-3.jpg`
- [ ] `images/destinations/leh.jpg`
- [ ] `images/destinations/leh-2.jpg`
- [ ] `images/destinations/leh-3.jpg`
- [ ] `images/destinations/pangong-tso.jpg`
- [ ] `images/destinations/pangong-tso-2.jpg`
- [ ] `images/destinations/pangong-tso-3.jpg`
- [ ] `images/destinations/shillong.jpg`
- [ ] `images/destinations/shillong-2.jpg`
- [ ] `images/destinations/shillong-3.jpg`
- [ ] `images/destinations/cherrapunji.jpg`
- [ ] `images/destinations/cherrapunji-2.jpg`
- [ ] `images/destinations/cherrapunji-3.jpg`

## Adding a new destination or state later

Add the record to `js/data.js`, then add `images/destinations/<slug>.jpg`, `<slug>-2.jpg`, `<slug>-3.jpg` (or `images/states/<slug>.jpg`). Nothing else needs editing.
