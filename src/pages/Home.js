import { Component } from "react";
import "../styles/home.css";
import ProductContainer from "../component/ProductContainer";
import { queryHoc } from "../component/queryHoc";

class Home extends Component {
  Datachange = () => {
    const { data } = this.props?.useQuery;
    const [, setCurrency] = this.props.useRecoilCurrency;
    const [, setCategories] = this.props.useRecoilCategories;
    setCurrency(data?.currencies);
    setCategories(data?.categories);
  };

  shouldComponentUpdate(nextProps) {
    const { data } = this.props?.useQuery;
    const { _data } = nextProps.useQuery;
    if (data === _data) {
      return false;
    } else {
      return true;
    }
  }

  componentDidUpdate() {
    this.Datachange();
  }
  render() {
    const { error, loading } = this.props.useQuery;

    if (loading) {
      return <h1>loading</h1>;
    }

    if (error) {
      return <p>error occured</p>;
    }
    return (
      <>
        <div className="Home">
          <ProductContainer />
        </div>
      </>
    );
  }
}

export default queryHoc(Home);
