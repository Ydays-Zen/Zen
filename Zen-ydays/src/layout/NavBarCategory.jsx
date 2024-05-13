import Plume from "../assets/plume.svg";
import Category from "../components/Category";
import "./style.css";

const NavBarCategory = () => {
  return (
    <>
      <div className="desktop-nav-category">
        <Category />
        <div className="plume">
          <a href="/check/post">
            <img className="post" src={Plume} alt="write" />
          </a>
        </div>
      </div>
    </>
  );
};

export default NavBarCategory;
