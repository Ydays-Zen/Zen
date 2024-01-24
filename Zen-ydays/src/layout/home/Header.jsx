import Category from "../../components/Category";
import Menu from "../../components/Menu";
import Nav from "../../components/Nav";
import NavBar from "../../components/NavBar";

import "./style.css";

export function Header() {
  return (
    <>
      <header>
        <Nav />
        <Menu />
        <NavBar />

        <Category />
      </header>
    </>
  );
}

export default Header;
