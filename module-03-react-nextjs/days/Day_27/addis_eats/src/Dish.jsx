import PropTypes from "prop-types";

function Dish({ name, price, spicy = false, currency = "ETB" }) {
  return (
    <div className="dish">
      <h3>
        {name} {spicy && <span>• Spicy</span>}
      </h3>
      <p>
        {price} {currency}
      </p>
    </div>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
};

Dish.defaultProps = {
  spicy: false,
  currency: "ETB",
};

export default Dish;