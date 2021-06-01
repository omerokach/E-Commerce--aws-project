import React from 'react';
import { useAuth } from "../context/AuthContext";
function Shop(props) {
    const { currentUser, logout } = useAuth();
    
    return (
        <div>
            <h2>shop</h2>
            <h1>{currentUser.email}</h1>
        </div>
    );
}

export default Shop;