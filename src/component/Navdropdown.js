import { Component } from "react";
import "../styles/navdropdown.css";
import { queryHoc } from "../component/queryHoc";

class Navdropdown extends Component {
  constructor() {
    super();
    this.state = {
      nonVisible: false,
      me: "samuel",
    };
  }

  toggleNavtext = () => {
    this.setState({
      nonVisible: this.state.nonVisible ? false : true,
      me: "ronick",
    });
  };

  render() {
    const [currency, ,] = this.props.useRecoilCurrency;
    const [defaultCurrency, setDefaultCurrency] =
      this.props.useRecoilDefaultCurrency;
    return (
      <>
        <span onClick={this.toggleNavtext} className="Navtest">
          {defaultCurrency}
        </span>
        <div
          className={
            !this.state.nonVisible ? "Dropdown nonVisible " : "Dropdown"
          }
        >
          {currency?.map(({ label, symbol }) => {
            return (
              <Dropdown
                key={symbol}
                symbol={symbol}
                label={label}
                toggleNavtext={this.toggleNavtext}
                setDefaultCurrency={setDefaultCurrency}
              />
            );
          })}
        </div>
      </>
    );
  }
}

class Dropdown extends Component {
  toggleCurrency = () => {
    const { toggleNavtext, setDefaultCurrency, symbol } = this.props;
    setDefaultCurrency(symbol);
    toggleNavtext();
    //console.log("tttttttt", setTest);
  };

  render() {
    const { symbol, label } = this.props;
    return (
      <p className="DropdownP" onClick={this.toggleCurrency}>
        {symbol} {label}
      </p>
    );
  }
}

export default queryHoc(Navdropdown);
