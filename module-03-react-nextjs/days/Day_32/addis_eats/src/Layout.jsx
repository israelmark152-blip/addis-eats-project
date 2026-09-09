import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

function Layout() {
  return (
    <div className="app-container">
      <Header />
      <Nav />
      
      <main className="content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;