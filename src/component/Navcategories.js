import { Component } from "react";
import "../styles/nav.css";
import { queryHoc } from "../component/queryHoc";
import { client } from "../App";
import { gql } from "@apollo/client";

class Navcategories extends Component {
  getProductCategory = (name) => {
    const [, setStore] = this.props.useRecoilStore;
    const _name = JSON.stringify(name);
    client
      .query({
        query: gql`
        query {
          categories {
            name
          }
          category(input: { title: ${_name} }) {
            name
            products {
              id
              name
              gallery
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
            }
          }
          currencies {
            label
            symbol
          }
        }
      `,
      })
      .then(({ data }) => {
        const _data = JSON.parse(JSON.stringify(data));
        _data?.category?.products.forEach((element) => {
          element.prices.forEach((_element) => {
            _element.initialAmount = _element.amount;
          });
        });
        setStore(_data?.category);
      })
      .catch((err) => console.log("eeeeeeee", err));
  };
  render() {
    const [categories, ,] = this.props.useRecoilCategories;
    return (
      <div>
        {categories?.map(({ name }) => {
          return (
            <Navitem
              key={name}
              name={name}
              utilitys={this.props.useRecoilUtility}
              getProductCategory={this.getProductCategory}
            />
          );
        })}
      </div>
    );
  }
}

class Navitem extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleChangle = () => {
    const { name, utilitys, getProductCategory } = this.props;
    const [utility, setUtility] = utilitys;
    const _utility = JSON.parse(JSON.stringify(utility));
    _utility.category = name;
    setUtility(_utility);
    getProductCategory(name);
  };
  render() {
    const { name } = this.props;
    return (
      <span onClick={this.handleChangle} tabIndex="0" className="Navtest">
        {name}
      </span>
    );
  }
}

export default queryHoc(Navcategories);
