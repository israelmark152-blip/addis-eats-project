import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const specials = [
    {
      id: 1,
      name: "Special Tibs",
      description:
        "Tender beef sautéed with onion, tomato, rosemary and Ethiopian spices.",
      price: 450,
      category: "Ethiopian",
      image:
        "https://media-cdn.grubhub.com/image/upload/d_search%3Abrowse-images%3Adefault.jpg/w_1200%2Cq_auto%2Cfl_lossy%2Cdpr_auto%2Cc_fill%2Cf_auto%2Ch_800%2Cg_center/ppioos9bpweir3miyylh",
    },
    {
      id: 3,
      name: "Doro Wot",
      description:
        "Classic Ethiopian spicy chicken stew with egg and berbere sauce.",
      price: 420,
      category: "Ethiopian",
      image:
        "https://ztecmdkhtsgzcpxirixk.supabase.co/storage/v1/object/public/entity-images/recipes/doro-wot.webp",
    },
    {
      id: 11,
      name: "Chicken Burger",
      description:
        "Crispy chicken, fresh lettuce, tomato and house sauce.",
      price: 280,
      category: "Burgers",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    },
  ];

  return (
    <section className="home-page">

      {/* HERO */}
      <div className="home-hero">
        <div className="home-content">

          <p className="home-label">
            WELCOME TO ADDIS EATS
          </p>

          <h1>
            Delicious Food,
            <br />
            Delivered Across Addis Ababa
          </h1>

          <p className="home-description">
            Discover Ethiopian favorites, pizza, burgers,
            and refreshing drinks. Choose your favorite
            dishes and order them easily.
          </p>

          <div className="home-buttons">
            <Link
              to="/menu"
              className="home-primary-button"
            >
              Browse Menu
            </Link>

            <Link
              to="/cart"
              className="home-secondary-button"
            >
              View Cart
            </Link>
          </div>

        </div>
      </div>


      {/* TODAY'S SPECIALS */}
      <div className="specials-section">

        <div className="section-heading">

          <div>
            <p className="section-label">
              WHAT'S POPULAR
            </p>

            <h2>Today's Specials</h2>
          </div>

          <Link
            to="/menu"
            className="view-menu-link"
          >
            View Full Menu →
          </Link>

        </div>


        <div className="specials-grid">

          {specials.map((dish) => (
            <article
              className="special-card"
              key={dish.id}
            >

              <Link to={`/menu/${dish.id}`}>
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="special-image"
                />
              </Link>

              <div className="special-card-content">

                <span className="special-category">
                  {dish.category}
                </span>

                <h3>{dish.name}</h3>

                <p>{dish.description}</p>

                <div className="special-bottom">

                  <strong>
                    {dish.price} ETB
                  </strong>

                  <Link to={`/menu/${dish.id}`}>
                    View Dish →
                  </Link>

                </div>

              </div>

            </article>
          ))}

        </div>

      </div>


      {/* BENEFITS */}
      <div className="home-info">

        <div className="home-info-card">
          <div className="info-number">01</div>

          <h2>Fresh Food</h2>

          <p>
            Enjoy a variety of delicious dishes
            prepared for you.
          </p>
        </div>


        <div className="home-info-card">
          <div className="info-number">02</div>

          <h2>Easy Ordering</h2>

          <p>
            Choose your favorite dishes and
            add them to your cart.
          </p>
        </div>


        <div className="home-info-card">
          <div className="info-number">03</div>

          <h2>Addis Delivery</h2>

          <p>
            Enter your delivery area and
            complete your order easily.
          </p>
        </div>

      </div>

    </section>
  );
}

export default Home;