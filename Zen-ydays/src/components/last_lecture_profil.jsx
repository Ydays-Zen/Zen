import '../pages/Profil/profil.css'
import exemple_minia from "../assets/exemple_pp.jpeg";


export function Last_lecture_profil(){
    return(
        <div>
            <div className="container_lecture">
                <h3>LECTURE EN COURS</h3>
                <div className="all_lecture">
                    <div className="exemple_lecture">
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

export default Last_lecture_profil;