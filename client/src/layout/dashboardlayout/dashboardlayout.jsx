import { Outlet } from 'react-router-dom';
import './dashboardlayout.css';
import Chatlist from '../../components/Chatlist/Chatlist';
import { useState } from 'react';
import { Menu } from 'lucide-react';

const Dashboardlayout = () => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div className="dashboardlayout">
            <button className="toggle-button" onClick={toggleMenu}>
                <Menu size={24} />
            </button>

            <div className={`menu ${showMenu ? 'show' : 'hide'}`}>
                <Chatlist />
            </div>

            <div className="content">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboardlayout;
