import '../pages/Profil/profil.css';
import profil_image from '../assets/exemple_pp.jpeg';



export function Info_profil(){
    return(
        <div>
            <div className="container_info">
                <div className="image_profil">
                    <img src={profil_image} alt=""/>
                </div>
                <div className="info_profil">
                    <div className="name"></div>
                    <div className="info_follow">
                        <div className="followers"></div>
                        <div className="following"></div>
                    </div>
                </div>
                <div className="edit_profil"></div>
            </div>
        </div>
    )
}


export default Info_profil;