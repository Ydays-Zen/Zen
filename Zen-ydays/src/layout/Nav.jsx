import React, { useState } from 'react';
import './Nav.css';
import New_story from '../assets/plume.svg';
import home from '../assets/home.svg';
import search from '../assets/search.svg';
import favoris from '../assets/bookmark.svg';
import user from '../assets/user.svg';

function Nav() {
    const [selectedIcon, setSelectedIcon] = useState(null);

    const handleSelect = (iconName) => {
        setSelectedIcon(iconName);
    };

    return (
        <div className="Menu">
            <nav>
                <img
                    src={home}
                    onClick={() => handleSelect('home')}
                    className={selectedIcon === 'home' ? 'selected' : ''}
                    alt=""
                />
                <img
                    src={search}
                    onClick={() => handleSelect('search')}
                    className={selectedIcon === 'search' ? 'selected' : ''}
                    alt=""
                />
                <div className="New_story" onClick={() => handleSelect('inutile')}>
                    <img src={New_story} alt="" />
                </div>
                <img
                    src={favoris}
                    onClick={() => handleSelect('fav')}
                    className={selectedIcon === 'fav' ? 'selected' : ''}
                    alt=""
                />
                <img
                    src={user}
                    onClick={() => handleSelect('user')}
                    className={selectedIcon === 'user' ? 'selected' : ''}
                    alt=""
                />
            </nav>
            <div className="select_icon_container">
                <div className={`select_home ${selectedIcon === 'home' ? 'selected' : ''}`}></div>
                <div className={`select_search ${selectedIcon === 'search' ? 'selected' : ''}`}></div>
                <div className="inutile"></div>
                <div className={`select_fav ${selectedIcon === 'fav' ? 'selected' : ''}`}></div>
                <div className={`select_user ${selectedIcon === 'user' ? 'selected' : ''}`}></div>
            </div>
        </div>
    );
}

export default Nav;
