import React from 'react';
import Nav from '../components/Nav';
import Menu from '../components/Menu';
import NavBar from '../components/NavBar';

const HeaderAll = () => {
    return (
        <div>
            <Nav />
            <Menu />
            <NavBar />
        </div>
    );
};

export default HeaderAll;