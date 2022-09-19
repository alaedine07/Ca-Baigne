import React, { useEffect, useState} from "react";
import jwt_decode from 'jwt-decode';
import axios from "axios";
const { BlobServiceClient } = require('@azure/storage-blob');

import avatarMen from '../../Assets/Images/avatar_men.png'

import './Profile.css'


import Header from "../Header/Header";


export function Profile(props) {

    const [userData, setUserData] = useState({username: '', email: '', password: undefined, imgFullPath: ''});
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const decoded = jwt_decode(token);
            const userId = decoded['id'];
            axios.get(process.env.API_BASE_URL + 'api/v1/user/' + userId, {
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
        axios.put(process.env.API_BASE_URL + 'api/v1/user/updateuser/' + userId, {
            data: {
                userName: userData.username,
                email: userData.email,
                hashedPassword: userData.password,
                imagePath: userData.imgFullPath
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
                setErrorMsg(err.response.data);
            })
        }

    // save user image to azure container
    async function saveFile(e) {
        // access the storage container
        const blobServiceClient  = new BlobServiceClient(process.env.STORAGESASTOKEN);
        const containerClient  = blobServiceClient.getContainerClient(process.env.container_name)
        const file = e.target.files[0];
        const fileName = e.target.files[0].name;
        const blobName = fileName;
        // necessary to retrieve image via url when rendering
        // add verification that the type is could only be an image
        const blobOptions = {
            blobHTTPHeaders: { 'blobContentType': file.type },
        };
        // upload image to container
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const token = localStorage.getItem('accessToken');
        const userData = {filename: fileName}
        blockBlobClient.uploadData(file, blobOptions).then(res => {
            // save the image url to database
            axios.post(process.env.API_BASE_URL + 'api/v1/uploads/azureblopuploaduser', userData, {
                headers: {
                    'Authorization': 'bearer ' + token,
                }
            }).then(res => {
                // refresh the page to see changes if the upload was succesfull
                localStorage.removeItem('accessToken');
                localStorage.setItem("accessToken", res.data.token);
                const Domain = window.location.origin;
                const URL = Domain + '/profile';
                window.location.replace(URL);
            }).catch(err => {
                // replace this with an error message to tell user the upload has failed
                console.error(err)
            })
        }).then(err => {
            // replace this with an error message to tell user the upload has failed
            console.error(err);
        });
    }

    return (
        <> 
        <Header token={props.token}/>
        <div className="profile-page">
            <div className="update-container">
                <div className="image-upload">
                    <label htmlFor="file-input">
                    { userData.imgFullPath ? 
                        <img id="avatar-img" src={userData.imgFullPath}/>: 
                        <img id="avatar-img" src={avatarMen}/>
                        }
                    </label>
                    <input id="file-input" type="file" onChange={saveFile}/>
                </div>
                <div className="form">
                    <form className="profile-form" action="">
                        <label className="myLabel" htmlFor="Username"> Username : </label>
                            <input className="label-input"  type="text" value={userData.username} onChange={e => setUserData({...userData, username: e.target.value})}/>
                        <label className="myLabel" htmlFor="email"> Email Address : </label>
                            <input className="label-input" type="email" value={userData.email} onChange={e => setUserData({...userData, email: e.target.value})}/>
                        <label className="myLabel" htmlFor="email"> New Password : </label>
                            <input className="label-input" type="password" value={userData.password} onChange={e => setUserData({...userData, password: e.target.value})}/>
                        <button type="submit" className=" myButton btn btn-success"  onClick={ModifyProfile}>
                            Modify   
                        </button>
                    </form>
                    { errorMsg !== '' && <div className="errorMsg"><p>{errorMsg}</p></div> }
                </div>
            </div>
        </div>
        </>
    )
}

export default Profile
