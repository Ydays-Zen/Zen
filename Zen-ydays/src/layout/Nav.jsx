import './Nav.css'
import New_story from '../assets/plume.svg'
import home from '../assets/home.svg'
import search from '../assets/search.svg'
import favoris from '../assets/bookmark.svg'
import user from '../assets/user.svg'

function Nav(){
    return(
        <div className="Menu">
            <nav>
                <img src={home} className="selected" alt=""/>
                <img src={search} alt=""/>
                <div className="New_story">
                    <img src={New_story} alt=""/>
                </div>
                <img src={favoris} alt=""/>
                <img src={user} alt=""/>
            </nav>
        </div>
    )
}


export default Nav