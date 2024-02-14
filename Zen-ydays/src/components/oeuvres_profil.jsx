import '../pages/Profil/Profil.css'
import Couverture1 from "../assets/couverture 1.jpg";
import Couverture2 from "../assets/couverture 2.webp";
import Couverture3 from "../assets/couverture 3.jpg";
import Couverture4 from "../assets/couverture 4.jpg";


export function Oeuvres_profil(){
    return (
      <div>
        <div className="container_oeuvres">
          <h3>VOS OEUVRES</h3>
          <div className="all_oeuvres">
            <div className="exemple_oeuvres">
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

export default Oeuvres_profil;