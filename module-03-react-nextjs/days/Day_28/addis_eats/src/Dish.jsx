import PropTypes from "prop-types";

function Dish({ dish }) {
  return (
    <div className="dish">
      <h3>
        {dish.name} {dish.spicy && <span>• Spicy</span>}
      </h3>
      <p>
        {dish.price} ETB
      </p>
    </div>
  );
}

Dish.propTypes = {
  dish: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    spicy: PropTypes.bool,
    category: PropTypes.string,
  }).isRequired,
};

export default Dish;