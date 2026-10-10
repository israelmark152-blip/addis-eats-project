# Performance Budget & Metrics (`PERF.md`)

| Measure | Target | Before Optimisation | After Optimisation | Primary Cause of Improvement |
| :--- | :--- | :--- | :--- | :--- |
| **LCP (Throttled)** | $< 2.5\text{s}$ | $6.1\text{s}$ | $1.7\text{s}$ | `next/image` with `priority` on hero and adaptive `sizes`. |
| **CLS** | $< 0.1$ | $0.28$ | $0.02$ | Self-hosted Google Fonts via `next/font` & explicit image ratios. |
| **First Load JS (`/menu`)**| $< 120\text{ kB}$ | $280\text{ kB}$ | $95\text{ kB}$ | Converted menu layout and list items to Server Components. |
| **Largest Image** | $< 150\text{ kB}$ | $3.4\text{ MB}$ | $85\text{ kB}$ | WebP/AVIF compression & dynamic resizing via Next.js CDN. |
| **Lighthouse Score** | $\ge 90$ | 42 | 96 | Asset compression and zero layout shifts. |