import '../pages/Profil/Profil.css'
import Couverture1 from "../assets/couverture 1.jpg";
import Couverture2 from "../assets/couverture 2.webp";
import Couverture3 from "../assets/couverture 3.jpg";
import Couverture4 from "../assets/couverture 4.jpg";

export function Last_lecture_profil() {
  return (
    <div>
      <div className="container_lecture">
        <h3>LECTURE EN COURS</h3>
        <div className="all_lecture">
          <div className="exemple_lecture">
            <img src={Couverture1} alt="" />
            <img src={Couverture2} alt="" />
            <img src={Couverture3} alt="" />
            <img src={Couverture4} alt="" />
            <img src={Couverture1} alt="" />
            <img src={Couverture2} alt="" />
            <img src={Couverture3} alt="" />
            <img src={Couverture4} alt="" />
            <img src={Couverture1} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Last_lecture_profil;