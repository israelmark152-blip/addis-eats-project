import PropTypes from "prop-types";
import Dish from "./Dish";
import Card from "./Card";

function Menu({ dishes, category }) {
  // 1. Filter dishes by category if a category prop is passed
  const shownDishes = category
    ? dishes.filter((dish) => dish.category === category)
    : dishes;

  // 2. Early return for empty state
  if (shownDishes.length === 0) {
    return <p>No {category} dishes found.</p>;
  }

  // 3. Render filtered list mapped with stable key and Card wrapper
  return (
    <div className="menu-list">
      {shownDishes.map((dish) => (
        <Card key={dish.id}>
          <Dish {...dish} />
        </Card>
      ))}
    </div>
  );
}

Menu.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      spicy: PropTypes.bool,
    })
  ).isRequired,
  category: PropTypes.string,
};

export default Menu;