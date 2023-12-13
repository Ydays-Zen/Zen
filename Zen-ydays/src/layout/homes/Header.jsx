import Nav from "../../components/Nav";
import Menu from "../../components/Menu";
import NavBar from "../../components/NavBar";

import "./style.css";

export function Header() {
  return (
    <>
      <header>
        <Nav />
        <Menu />

        <NavBar />
      </header>
    </>
  );
}

export default Header;
