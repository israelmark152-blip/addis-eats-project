## Production Build Output

```text
Route (app)                              Size     First Load JS
┌ ○ /                                    180 B          85.2 kB
├ ○ /_not-found                          870 B          85.9 kB
├ ƒ /api/dishes                          0 B                0 B
├ ƒ /api/orders                          0 B                0 B
├ ○ /cart                                310 B          85.3 kB
├ ƒ /checkout                            420 B          85.4 kB
├ ○ /menu                                250 B          85.3 kB
└ ƒ /menu/[id]                           290 B          85.3 kB

○ (Static)  prerendered as static content
ƒ (Dynamic) server-rendered on demand
### Step 2: Ensure Markdown Docs Exist in Root
Make sure you have saved both files in your `addis-eats-next` root folder[cite: 25]:

1. **`STRATEGY.md`**
```markdown
# Rendering Strategy Matrix

| Route | Rendering Strategy | Justification |
| :--- | :--- | :--- |
| `/` | **Static (SSG)** | Landing page with static promotional hero banner[cite: 19, 31]. |
| `/menu` | **ISR (`revalidate = 3600`)** | Dish catalog updates infrequently[cite: 19, 31, 37]. |
| `/menu/[id]` | **Static (`generateStaticParams`)** | Pre-rendered dish detail pages[cite: 19, 31, 37]. |
| `/cart` | **CSR** | Live total calculations managed in browser state[cite: 19, 31, 37]. |
| `/checkout` | **Dynamic** | Server Action form submission[cite: 19, 31]. |