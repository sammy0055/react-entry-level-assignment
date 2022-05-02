import { Component } from "react";
import Cartcard from "../component/Cartcard";
import { queryHoc } from "../component/queryHoc";
import "../styles/cart.css";

class Cart extends Component {
  render() {
    const [cart, ,] = this.props.useRecoilCart;
    console.log("cart", cart);
    return (
      <div className="Cart">
        <div className="Carttitle">
          <h1>Cart</h1>
        </div>
        <div>
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
        </div>
      </div>
    );
  }
}

export default queryHoc(Cart);
