Route (app)           Revalidate  Expire
┌ ○ /
├ ○ /_not-found
├ ƒ /checkout
├ ○ /menu                     1h      1y
└   /menu/[id]
  ├ ● /menu/kitfo
  ├ ● /menu/shiro
  └ ● /menu/doro-wat


○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand