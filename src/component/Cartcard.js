import { Component } from "react";
import "../styles/cartcard.css";
import { ReactComponent as Addsvg } from "../assets/addsvg.svg";
import { ReactComponent as Minussvg } from "../assets/minussvg.svg";

class Cartcard extends Component {
  calcSubtotal = (newCart) => {
    const [utility, setUtility] = this.props.useRecoilUtility;
    const _utility = JSON.parse(JSON.stringify(utility));
    const subTotal = newCart.reduce((amount, item) => amount + item.amount, 0);
    _utility.subtotal = subTotal;
    setUtility(_utility);
  };

  handleAdd = () => {
    const { id, useRecoilCart } = this.props;
    const [cart, setCart] = useRecoilCart;
    const newCart = JSON.parse(JSON.stringify(cart));
    const cartIndex = newCart.findIndex((item) => item.id === id);
    newCart.forEach((element, index) => {
      if (index === cartIndex) {
        element.amount = element.amount + element.initialAmount;
        element.quantity = element.quantity + 1;
      }
    });
    setCart(newCart);
    this.calcSubtotal(newCart);
  };

  handleRemove = () => {
    const { id, useRecoilCart } = this.props;
    const [cart, setCart] = useRecoilCart;
    const newCart = JSON.parse(JSON.stringify(cart));
    const cartIndex = newCart.findIndex((item) => item.id === id);
    newCart.forEach((element, index) => {
      if (index === cartIndex && element.amount > element.initialAmount) {
        element.amount = element.amount - element.initialAmount;
        element.quantity = element.quantity - 1;
      }
    });
    setCart(newCart);
    this.calcSubtotal(newCart);
  };

  RemoveFromCart = () => {
    const { id, useRecoilCart } = this.props;
    const [cart, setCart] = useRecoilCart;
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
    this.calcSubtotal(newCart);
  };
  render() {
    const { name, amount, symbol, gallery, quantity, attributes } = this.props;
    return (
      <div>
        <hr className="Horizontal_rule" />
        <div className="Cartcontainer">
          <div className="Carttext">
            <div>
              <h3>{name} </h3>
              <h4>
                {symbol} {amount.toFixed(2)}
              </h4>
            </div>
            <div className="Attribute">
              <Attributes attributes={attributes} />
            </div>
          </div>

          <div className="ImgContainer">
            <div className="Info_bodytext">
              <Addsvg onClick={this.handleAdd} className="info_icon1" />
              <span className="Icon3">{quantity}</span>
              <Minussvg onClick={this.handleRemove} className="info_icon1" />
            </div>
            <img src={gallery} alt="not found" />
          </div>
        </div>
        <div>
          <button
            onClick={this.RemoveFromCart}
            className="Rbutton"
            type="button"
          >
            Remove
          </button>
        </div>
      </div>
    );
  }
}

export default Cartcard;

class Attributes extends Component {
  render() {
    const { attributes } = this.props;
    return (
      <div>
        {attributes?.map(({ value }) => {
          return (
            <button
              key={value}
              style={{ backgroundColor: value }}
              tabIndex="0"
              type="button"
              className="AttBtn"
            >
              {value.startsWith("#") || value.startsWith("rgb") ? "" : value}
            </button>
          );
        })}
      </div>
    );
  }
}
