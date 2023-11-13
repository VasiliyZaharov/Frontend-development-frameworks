import React from 'react';
import { useDispatch } from "react-redux";
import '../../styles/Header.scss';

const LogoutButton: React.FC = () => {
    const dispatch = useDispatch();

    const handleLogout = (): void => {
        dispatch({ type: "LOGOUT" });
    };

    return <button className="logout-btn_style" onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;
