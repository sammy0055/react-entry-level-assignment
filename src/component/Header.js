import { Component } from "react";
import { StyledBar } from "../styledComponents/Navbar";

import "../styles/nav.css";
import Navdropdown from "./Navdropdown";
import Navcategories from "./Navcategories";
import Cartoverlay from "./Cartoverlay";
class Nav extends Component {
  render() {
    return (
      <div>
        <StyledBar>
          <div className="Head">
            <Navcategories />
            <div className="Subhead">
              <Navdropdown />
              <Cartoverlay />
            </div>
          </div>
        </StyledBar>
      </div>
    );
  }
}

export default Nav;
