export function MenuUnavailable() {
  return (
    <div className="error-fallback">
      <h3>Menu Unavailable</h3>
      <p>Could not load food items right now.</p>
      <button onClick={() => window.location.reload()}>Retry</button>
    </div>
  );
}

export function CartUnavailable() {
  return (
    <div className="error-fallback">
      <h3>Cart Unavailable</h3>
      <p>Unable to display cart details.</p>
    </div>
  );
}