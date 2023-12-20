import '../pages/Profil/profil.css'
import exemple_minia from '../assets/exemple_pp.jpeg'


export function Oeuvres_profil(){
    return(
        <div>
            <div className="container_oeuvres">
                <h3>VOS OEUVRES</h3>
                <div className="all_oeuvres">
                    <div className="exemple_oeuvres">
                        <img src={exemple_minia} alt=""/>
                        <img src={exemple_minia} alt=""/>
                        <img src={exemple_minia} alt=""/>
                        <img src={exemple_minia} alt=""/>
                        <img src={exemple_minia} alt=""/>
                        <img src={exemple_minia} alt=""/>
                        <img src={exemple_minia} alt=""/>
                        <img src={exemple_minia} alt=""/>
                        <img src={exemple_minia} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Oeuvres_profil;