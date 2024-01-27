import Menu from "../../components/Menu";
import Nav from "../../components/Nav";

import "./style.css";

export function Header() {
  return (
    <>
      <header>
        <Nav />
        <Menu />
      </header>
    </>
  );
}

export default Header;
