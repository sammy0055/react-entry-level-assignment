import { Component } from "react";
import "../styles/productContainer.css";
import ProductCard from "./ProductCard";
import { queryHoc } from "../component/queryHoc";

class ProductContainer extends Component {
  render() {
    const [store, ,] = this.props.useRecoilStore;
    const [currency, ,] = this.props.useRecoilDefaultCurrency;
   // console.log("store", store);
    return (
      <div className="ProContainer">
        <h1>Category {store?.name}</h1>
        <section className="ListProduct">
          {store?.products?.map((data) => {
            return data?.prices?.map((_data) => {
              if (_data.currency.symbol === currency)
                return (
                  <ProductCard
                    key={data.id}
                    id={data.id}
                    name={data.name}
                    attributes={data.attributes}
                    prices={_data.amount}
                    initialAmount={_data.initialAmount}
                    symbol={_data.currency.symbol}
                    label={_data.currency.label}
                    recoilCart={this.props.useRecoilCart}
                    gallery={data.gallery[0]}
                    useRecoilCart={this.props.useRecoilCart}
                    history={this.props.history}
                  />
                );
            });
          })}
        </section>
      </div>
    );
  }
}

export default queryHoc(ProductContainer);
