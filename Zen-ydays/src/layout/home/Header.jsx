import Nav from "../../components/Nav";
import Menu from "../../components/Menu";
import NavBar from "../../components/NavBar";
import Category from "../../components/Category";

import "./style.css";

export function Header() {
  return (
    <>
      <header>
        <Nav />
        <Menu />

        <Category />
        <NavBar />
      </header>
    </>
  );
}

export default Header;
