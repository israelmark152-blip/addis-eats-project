import { dishes } from "./data";
import Menu from "./Menu";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Addis Eats</h1>
        <p className="subtitle">Ethiopian Cuisine Menu</p>
      </header>

      <main className="app-main">
        <section className="menu-section">
          <h2>All Dishes</h2>
          <Menu dishes={dishes} />
        </section>
      </main>
    </div>
  );
}

export default App;