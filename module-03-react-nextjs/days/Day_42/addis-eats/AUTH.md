# Security & Authentication - Addis Eats

## Protected Routes & Protection Layers

| Route | Layer 1: Middleware | Layer 2: Page Verification | Layer 3: Action Check |
| :--- | :--- | :--- | :--- |
| `/orders` | Cheap session cookie check redirect | Page verifies session and scopes query by `user.id` | N/A |
|`/checkout` | Cheap session cookie check redirect | Page verifies active session | Order creation verifies `user.id` |
|`/kitchen` | Cheap session cookie check redirect | Page verifies `user.role === 'staff' | Actions check `user.role === 'staff' |

---

## Attack Vector Testing

### Attack 1: Calling Server Action while signed out
- **Action Taken**: Injected JavaScript in console targeting `cancelOrderAction('ord_101')` without a session cookie.
- **Result**: Operation threw `401: Unauthenticated request`.
- **Mitigation Line**: `app/actions/orders.ts` line 12: if (!user) throw new Error('401: Unauthenticated request');

### Attack 2: Modifying another user's order
- **Action Taken**: Signed in as `usr_31` and invoked `cancelOrderAction('ord_102')` (owned by `usr_99`).
- **Result**: Operation threw `403: Unauthorized to access or modify this order`.
- **Mitigation Line**: `app/actions/orders.ts` line 20: if (order.userId !== user.id) throw new Error(...)

### Attack 3: External Open Redirect
- **Action Taken**: Crafted link `/signin?next=https://malicious-website.com`.
- **Result**: Application validated `next` parameter, stripped the external domain, and rediricted safely to `/`.
- **Mitigation Line**: `app/actions/auth.ts` line 11: if (!next.startsWith('/') || next.startsWith('//')) next = '/';
