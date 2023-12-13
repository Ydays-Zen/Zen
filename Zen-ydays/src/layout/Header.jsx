import './header.css';
import Message from '../../../../../../Bureau/ZEN/Zen/Zen-ydays/src/assets/Message.svg'
import Library from '../../../../../../Bureau/ZEN/Zen/Zen-ydays/src/assets/library.svg'
import Logo from '../../../../../../Bureau/ZEN/Zen/Zen-ydays/src/assets/logo_zen.png'

export function Header (){
    return(
        <div>
            <div className="Header">
                <div className="left_header">
                    <img src={Logo} alt=""/>
                </div>
                <div className="right_header">
                    <img src={Library} alt=""/>
                    <img src={Message} alt=""/>
                </div>
            </div>
        </div>
    )
}

export default Header;