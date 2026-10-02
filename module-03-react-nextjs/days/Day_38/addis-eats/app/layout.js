import "./globals.css";
import { Providers } from "./providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <header style={{ padding: "10px", background: "#eee" }}>
            <h1>Addis Eats</h1>
          </header>
          {children}
          <footer style={{ padding: "10px", background: "#eee" }}>
            <p>© Addis Eats</p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
