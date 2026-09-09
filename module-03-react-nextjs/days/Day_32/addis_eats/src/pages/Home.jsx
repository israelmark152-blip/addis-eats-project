import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h2>Welcome to Addis Eats</h2>
      <p>Discover authentic flavors delivered to your door.</p>
      <Link to="/menu">View Menu</Link>
    </div>
  );
}

export default Home;