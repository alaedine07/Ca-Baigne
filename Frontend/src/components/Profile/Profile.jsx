import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import jwt_decode from 'jwt-decode';
import axios from "axios";

import avatarMen from '../../Assets/Images/avatar_men.png'
import avatarWomen from '../../Assets/Images/avatar_women.png'
import './Profile.css'


import Header from "../Header/Header";

export function Profile(props) {

    const [token, setToken] = useState('');
    const [userData, setUserData] = useState({username: '', email: '', password: undefined});
   
useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setToken(token)
            const decoded = jwt_decode(token);
            const userId = decoded['id'];
            axios.get('http://localhost:3001/api/v1/user/' + userId, {
                headers: {
                    'Authorization': 'bearer ' + token
                }
            }).then( res => {
                setUserData({username: res.data.userName, email: res.data.email})
            })
        }
    }, []);
    
    function ModifyProfile(event) {
        event.preventDefault();
        const token = localStorage.getItem('accessToken');
        const decoded = jwt_decode(token);
        const userId = decoded['id'];
        axios.put('http://localhost:3001/api/v1/user/updateuser/' + userId, {
            data: {
                userName: userData.username,
                email: userData.email,
                hashedPassword: userData.password
            }
            }, 
            {
                headers: {
                'Authorization': 'bearer ' + token,
                'content-type': 'application/json'
                }
            }
            ).catch(err => {
            console.log(err);
        })
    }

    return (
        <> 
        <Header token={props.token}/>
        <div className="Container">
            <div className="Avatar-image">
            <img id="avatar-img" src={avatarMen} alt="avatar-image-here" />
            </div>
            <div className="form">
                <form action="">
                    <label htmlFor="Username"> Username: </label>
                        <input className="myInput" type="text" value={userData.username} onChange={e => setUserData({...userData, username: e.target.value})}/>
                    <label htmlFor="email"> email address </label>
                        <input className="myInput" type="email" value={userData.email} onChange={e => setUserData({...userData, email: e.target.value})}/>
                    <label htmlFor="email"> new password </label>
                        <input className="myInput" type="password" value={userData.password} onChange={e => setUserData({...userData, password: e.target.value})}/>
                    <button type="submit" className="myButton" onClick={ModifyProfile}>
                        Modify   
                    </button>
                </form>
            </div>
        </div>
        </>
    )
}

export default Profile