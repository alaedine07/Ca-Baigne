import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import jwt_decode from 'jwt-decode';
import axios from "axios";
import FormData from 'form-data';

import avatarMen from '../../Assets/Images/avatar_men.png'
import './Profile.css'


import Header from "../Header/Header";

export function Profile(props) {

    const [userData, setUserData] = useState({username: '', email: '', password: undefined, imgFullPath: ''});
   
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const decoded = jwt_decode(token);
            const userId = decoded['id'];
            axios.get('http://localhost:3001/api/v1/user/' + userId, {
                headers: {
                    'Authorization': 'bearer ' + token
                }
            }).then( res => {
                setUserData({username: res.data.userName, email: res.data.email, imgFullPath: res.data.imagePath})
            }).catch(err => {
                console.error(err);
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
            ).then(() => {
                localStorage.removeItem('accessToken');
                const Domain = window.location.origin;
                const URL = Domain + '/login';
                window.location.replace(URL);
            }).catch((err) => {
                console.error(err);
            })
        }

    function saveFile(e) {
        const file = e.target.files[0];
        const fileName = e.target.files[0].name;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        const token = localStorage.getItem('accessToken');
        console.log(token)
        const decoded = jwt_decode(token);
        console.log(decoded)
        const userId = decoded['id'];
        console.log(userId)
        formData.append("userid", userId);
        axios.post('http://localhost:3001/api/v1/uploads/userUploads', formData, {
            headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(() => {
            const Domain = window.location.origin;
            const URL = Domain + '/profile';
            window.location.replace(URL);
        }).catch(err => {
            console.error(err);
        })
    }

    return (
        <> 
        <Header token={props.token}/>
        <div className="Container">
        <div className="image-upload">
            <label htmlFor="file-input">
            { userData.imgFullPath ? 
                <img id="avatar-img" src={'http://localhost:3001/' + userData.imgFullPath.split('/').slice(-3).join('/')}/> : 
                <img id="avatar-img" src={avatarMen}/>
                }
            </label>
            <input id="file-input" type="file" onChange={saveFile}/>
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
