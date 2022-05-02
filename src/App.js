import { Component } from "react";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Nav from "./component/Header";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { queryHoc } from "./component/queryHoc";
import { Routes, Route } from "react-router-dom";
import Productpreview from "./pages/Productpreview";
import { StyledDark } from "./styledComponents/Navbar";

export const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

class Welcome extends Component {
  render() {
    const [{ cartToggle }, ,] = this.props.useRecoilUtility;

    return (
      <div>
        <Nav />
        {cartToggle && <StyledDark />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/Productpreview/:id" element={<Productpreview />} />
        </Routes>
      </div>
    );
  }
}

export default queryHoc(Welcome);
