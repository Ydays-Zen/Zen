import { useEffect, useState } from "react";
import NavBarDesktop from "../components/NarBarDesktop.jsx";
import NavBar from "../components/NavBar.jsx";

const HeaderAll = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return <>{isMobile ? <NavBar /> : <NavBarDesktop />}</>;
};

export default HeaderAll;
