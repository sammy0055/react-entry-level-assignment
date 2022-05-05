import { Component } from "react";
import { queryHoc } from "../component/queryHoc";
import "../styles/productpreview.css";
import { gql } from "@apollo/client";
import { client } from "../App";

class Productpreview extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    const { id } = this.props.search;
    const _id = JSON.stringify(id);
    client
      .query({
        query: gql`
          query {
            product(id:${_id}) {
              id,
              name
              inStock
              gallery
              description
              category
              attributes {
                name
                items {
                  displayValue
                  value
                }
              }
              prices {
                currency {
                  symbol
                  label
                }
                amount
              }
              brand
            }
          }
        `,
      })
      .then(({ data }) => {
        const _data = JSON.parse(JSON.stringify(data));
        _data.product.imgIndex = 0;
        _data.product.prices.forEach((_element) => {
          _element.initialAmount = _element.amount;
        });
        this.setState(_data.product);
      })
      .catch((err) => console.log("eeeeeeee", err));
  }

  updateImg = (index) => {
    const data = JSON.parse(JSON.stringify(this.state));
    data.imgIndex = index;
    this.setState(data);
  };

  addToCart = () => {
    const [currency, ,] = this.props.useRecoilDefaultCurrency;
    const [cart, setCart] = this.props.useRecoilCart;
    const _cart = JSON.parse(JSON.stringify(cart));

    const { id, name, gallery, prices, attributes } = this.state;
    const newAttribute = attributes[0].items.slice(0, 2);
    const [price] = prices.filter((data) => data.currency.symbol === currency);
    const product = {
      id: id,
      name: name,
      amount: price.amount,
      initialAmount: price.initialAmount,
      currency: price.currency.label,
      symbol: price.currency.symbol,
      gallery: gallery[0],
      quantity: 1,
      attributes: newAttribute,
    };
    const indexItem = cart.find((item) => item.id === id);
    if (!indexItem) {
      _cart.push(product);
      setCart(_cart);
    } else {
      alert("item all ready in cart");
    }
  };
  render() {
    const { name, description, gallery, imgIndex, prices, attributes } =
      this.state;
    const [currency, ,] = this.props.useRecoilDefaultCurrency;
    return (
      <div className="Ppreview">
        <div className="Pbody">
          <div className="Contentcontainer">
            <div>
              {gallery?.map((data, index) => {
                return (
                  <Img
                    key={data}
                    index={index}
                    toggleImg={this.updateImg}
                    galary={data}
                  />
                );
              })}
            </div>
            <div className="BimgContainer">
              <img
                src={this.state?.gallery ? gallery[imgIndex] : ""}
                alt="not found"
              />
            </div>
            <div>
              <h3>{name}</h3>
              <p dangerouslySetInnerHTML={{ __html: description }} />
              <h4>SIZE:</h4>
              <div className="Btcont">
                <Attributes attributes={attributes} />
              </div>
              <h3>PRICE:</h3>
              {prices?.map((data) => {
                if (data.currency.symbol === currency) {
                  return (
                    <h3 key={data.currency.symbol}>
                      {data.currency.symbol} {data.amount}
                    </h3>
                  );
                } else return null;
              })}
              <button onClick={this.addToCart} className="Prbtn">
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default queryHoc(Productpreview);

export class Attributes extends Component {
  render() {
    const { attributes } = this.props;
    return (
      <>
        {attributes?.map(({ items }) => {
          return items.map(({ value }) => {
            return (
              <button
                key={value}
                tabIndex="0"
                type="button"
                style={{ backgroundColor: value }}
              >
                {value.startsWith("#") || value.startsWith("rgb") ? "" : value}
              </button>
            );
          });
        })}
      </>
    );
  }
}

class Img extends Component {
  imageToggle = () => {
    const { toggleImg, index } = this.props;
    toggleImg(index);
  };
  render() {
    const { galary } = this.props;
    return (
      <div onClick={this.imageToggle} className="Pimgcont">
        <img src={galary} alt="not found" />
      </div>
    );
  }
}
