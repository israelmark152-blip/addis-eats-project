# Auth & Security Strategy (`AUTH.md`)

## Route Protection Matrix
| Route / Action | Protected By | Security Guarantee |
| :--- | :--- | :--- |
| `/menu` | None | Public route; fully accessible to guests and search engine crawlers. |
| `/orders` | Middleware + Page Guard + Scoped Query | Requires active session; orders are strictly filtered by `session.userId`. |
| `/checkout` | Middleware + Page Guard | Unauthenticated users are redirected to `/signin`. |
| `/kitchen` | Page Guard + Role Check | Restricted to staff users (`session.user.role === 'staff'`). |
| `cancelOrder()` Action | Server Action Guard + Ownership Check | Verifies active session and ensures `order.userId === session.userId`. |

## Vulnerability Mitigation
1. **IDOR Attacks:** Always scope database queries using `session.userId` from server session, never trusting client parameters.
2. **Open Redirects:** Forced relative paths on login redirect queries in Middleware.