# Addis Eats Rendering Strategy

| Route | Strategy | Justification |
| :--- | :--- | :--- |
| `/` | Static | Landing info and address rarely change between builds. |
| `/menu` | ISR (3600s) | Dishes change occasionally; hourly regeneration balances freshness and speed. |
| `/menu/[id]` | Static (via params) | Pre-generated at build time for known dish IDs. |
| `/checkout` | Dynamic | Reads session cookies and live cart pricing per request. |