import { Outlet, useNavigate } from 'react-router-dom';
import './dashboardlayout.css';
import Chatlist from '../../components/Chatlist/Chatlist';
import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

const Dashboardlayout = () => {
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const { data, isError, isLoading } = useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            const res = await fetch('/api/auth/me', {
                method: 'GET',
                credentials: 'include',
            });

            if (!res.ok) {
                throw new Error('Unauthorized');
            }

            return res.json();
        },
        retry: 1,
    });

    useEffect(() => {
        if (isError) {
            navigate('/');
        }
    }, [isError, navigate]);

    if (isLoading) {
        return <div>Đang tải...</div>;
    }

    return (
        <div className="dashboardlayout">
            <button className="toggle-button" onClick={toggleMenu}>
                <Menu size={24} />
            </button>

            <div className={`menu ${showMenu ? 'show' : 'hide'}`}>
                <Chatlist isPremium={data.is_premium}/>
            </div>

            <div className="content">
                <Outlet context={{ isPremium: data.is_premium }} />
            </div>
        </div>
    );
};

export default Dashboardlayout;
