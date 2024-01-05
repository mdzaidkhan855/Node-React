import React, { useEffect } from 'react';
import {Link,useNavigate} from 'react-router-dom';

const Nav = ()=>{
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    
    console.log("Now AUTH is :", auth);
    const logout = ()=>{
        localStorage.removeItem("user");
        navigate("/");
    }
    return (
        <div>
            {
                auth? <ul className='nav-ul'>
                            <>
                                <li><Link to="/">Products</Link></li>
                                <li><Link to="/add">Add Product</Link></li>
                                <li><Link to="/update">Update Product</Link></li>
                                <li><Link to="/profile">Profile</Link></li>
                                <li><Link to="/signup" onClick={logout} >Logout ({JSON.parse(auth).name})</Link></li>
                            </>
                            
                        </ul>:
                        <ul className='nav-ul nav-right'>
                            <>
                                <li><Link to="/login">Login</Link></li>   
                                <li><Link to="/signup">SignUp</Link></li>

                            </>

                        </ul>
            }
            
        </div>
    )
}

export default Nav;