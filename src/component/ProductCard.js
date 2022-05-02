import { Component } from "react";
import "../styles/productCard.css";
import carts from "../assets/icons8-buying-100.png";
//import { Link } from "react-router-dom";

class ProductCard extends Component {
  handleCart = () => {
    const {
      id,
      name,
      prices,
      initialAmount,
      label,
      symbol,
      gallery,
      recoilCart,
      attributes,
    } = this.props;
    const newAttribute = attributes[0].items.slice(0, 2);
    const [cart, setCart] = recoilCart;
    const _cart = JSON.parse(JSON.stringify(cart));
    const product = {
      id: id,
      name: name,
      amount: prices,
      initialAmount: initialAmount,
      currency: label,
      symbol: symbol,
      gallery,
      quantity: 1,
      attributes: newAttribute,
    };

    const indexItem = cart.find((item) => item.id === id);
    if (!indexItem) {
      _cart.push(product);
      setCart(_cart);
    } else {
      alert("item already in cart");
    }
  };

  Preview = () => {
    const history = this.props.history;
    const id = this.props.id;
    history(`/Productpreview/${id}`);
  };
  render() {
    const { name, prices, symbol, gallery } = this.props;
    return (
      <div className="Card0">
        <div className="CardImg">
          <img onClick={this.Preview} src={gallery} alt="not found" />
          <span onClick={this.handleCart} className="CartT">
            <img src={carts} alt="not found" />
          </span>
        </div>
        <div className="Cardtext">
          <h3>{name}</h3>
          <h4>
            {symbol} {prices}
          </h4>
        </div>
      </div>
    );
  }
}

export default ProductCard;
