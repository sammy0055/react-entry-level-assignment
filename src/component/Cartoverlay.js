import { Component } from "react";
import "../styles/cartoverley.css";
import Cart from "../assets/Cart.jpg";
import Cartcard from "./Cartcard";
import { queryHoc } from "../component/queryHoc";

class Cartoverlay extends Component {
  calcSubtotal = () => {
    const [cart, ,] = this.props.useRecoilCart;
    const [utility, setUtility] = this.props.useRecoilUtility;
    const _utility = JSON.parse(JSON.stringify(utility));
    const subTotal = cart.reduce((amount, item) => amount + item.amount, 0);
    _utility.subtotal = subTotal;
    if (utility.cartToggle) {
      _utility.cartToggle = false;
      document.body.style.overflow = "visible"
    } else {
      _utility.cartToggle = true;
      document.body.style.overflow = "hidden"
    }
    setUtility(_utility);
  };

  viewBage = () => {
    const [utility, setUtility] = this.props.useRecoilUtility;
    const _utility = JSON.parse(JSON.stringify(utility));
    const history = this.props.history;
    if (utility.cartToggle) {
      _utility.cartToggle = false;
      document.body.style.overflow = "visible"
    } else {
      _utility.cartToggle = true;
      document.body.style.overflow = "hidden"
    }
    setUtility(_utility);
    history("/cart");
  };

  render() {
    const [cart, ,] = this.props.useRecoilCart;
    const [{ subtotal, cartToggle }, ,] = this.props.useRecoilUtility;
    return (
      <>
        <section className="Navimg">
          <div onClick={this.calcSubtotal} className="NavImgContainer">
            <img src={Cart} alt="cart not found" />
            <span className="Bag">{cart.length}</span>
          </div>
          {cartToggle && (
            <div className="DropdownContainer">
              {cart?.map((data) => {
                return (
                  <Cartcard
                    key={data.id}
                    id={data.id}
                    name={data.name}
                    amount={data.amount}
                    initialAmount={data.initialAmount}
                    symbol={data.symbol}
                    gallery={data.gallery}
                    quantity={data.quantity}
                    attributes={data.attributes}
                    useRecoilCart={this.props.useRecoilCart}
                    useRecoilUtility={this.props.useRecoilUtility}
                  />
                );
              })}
              <div>
                <div className="Total">
                  <h3>Total</h3>
                  <h4>
                    {cart[0]?.symbol}
                    {subtotal?.toFixed(2)}
                  </h4>
                </div>
                <div className="BtnContainer">
                  <button
                    onClick={this.viewBage}
                    className="TotalBtn"
                    type="button"
                  >
                    VIEW BAGE
                  </button>

                  <button className="TotalBtn1" type="button">
                    CHECKOUT
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </>
    );
  }
}

export default queryHoc(Cartoverlay);
