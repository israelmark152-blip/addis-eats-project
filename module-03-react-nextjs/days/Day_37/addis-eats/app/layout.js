import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: "10px", background: "#eee" }}>
          <h1>Addis Eats</h1>
        </header>
        {children}
        <footer style={{ padding: "10px", background: "#eee" }}>
          <p>© Addis Eats</p>
        </footer>
      </body>
    </html>
  );
}