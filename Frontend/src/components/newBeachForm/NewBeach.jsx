import React from "react";
import { useState, useEffect } from "react";

import axios from "axios";
import FormData from 'form-data';
import jwt_decode from 'jwt-decode';

import './NewBeach.css'
import not_allowed_image from '../../Assets/Images/NOT_ALLOWED.png'

export function NewBeachForm() {

    const [beachName, setBeachName] = useState('');
    const [beachGovernorate, setbeachGovernorate] = useState('');
    const [longititude, setLongititude] = useState('');
    const [lattitude, setlattitude] = useState('');
    const [amenitie, setAmenities] = useState([]);
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");
    const [isAllowed, setAllowed] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            const decoded = jwt_decode(token);
            const isAdmin = decoded['is_admin'];
            if(isAdmin) {
                setAllowed(true);
            }
        }
    }, []);
    
    const amenities = ['Parking', 'Hiking Spot', 'Volleyball field'];

    function addOrRemove(item) {
        const newAmenities = [...amenitie];
        const index = newAmenities.indexOf(item);
        if (index === -1) {
            newAmenities.push(item)
        } else {
            newAmenities.splice(index, 1);
        }
        setAmenities(newAmenities);
    }

    function saveFile(e)  {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }

    function uploadData(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        const beachData = {
            name: beachName,
            governorate: beachGovernorate,
            longitude: longititude,
            latitude: lattitude,
            caracteristiques: amenitie
        }
        for (let key in beachData) {
            formData.append(key, beachData[key]);
        }
        axios.post(process.env.API_BASE_URL + 'api/v1/uploads/beachesUploads', formData, {
            headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(resp => {
            const Domain = window.location.origin;
            const URL = Domain + '/newbeach';
            window.location.replace(URL);
        }).catch(err => {
            console.error(err);
        })
    }
    if (isAllowed) {
        return (
            <>
            <div className="newbeach-page">
                <div className="newbeach-container">
                    <div className="newbeach-card">
                        <h1 className="form-header">New beach</h1>
                    <div>
                        <form className="newbeach-form" action="">
                                <div>
                                    <label className="newbeach-label">Beach name</label>
                                    <input className="newbeach-input" type="text" placeholder="Beach name" value={beachName} onChange={e => setBeachName(e.target.value)}/>
                                    
                                    <label className="newbeach-label">Governorate</label>
                                    <input className="newbeach-input" type="text" placeholder="Governorate" value={beachGovernorate} onChange={e => setbeachGovernorate(e.target.value)}/>
                                    
                                    <label className="newbeach-label">Latitude</label>
                                    <input className="newbeach-input" type="number" placeholder="e.g 30.8749" value={lattitude} onChange={e => setlattitude(e.target.value)}/>

                                    <label className="newbeach-label">Longitude</label>
                                    <input className="newbeach-input" type="number" placeholder="e.g 10.6542" value={longititude} onChange={e => setLongititude(e.target.value)}/>
                                </div>
                                <div>
                                    <label className="newbeach-label">Select amenities</label>
                                        {amenities.map((item, id) => {
                                            return <>
                                            <div className="checkBox-options" key={id}>
                                                <input type="checkbox" className="MyCheckBox" onClick={() => addOrRemove(item)}/>
                                                <label htmlFor="checkBoxDescription" className="checkBoxDescription" > {item} </label>
                                            </div>
                                            </>
                                        })}
                                    <label className="newbeach-label">Add image</label>
                                    <input type="file" onChange={saveFile}/>
                                </div>
                                
                                
                            </form>
                        
                    </div>
                    <button className="newbeach-button" onClick={uploadData}>Upload</button>
                    </div>
                    
                </div>
            </div>
            </>
        )
    }
    else {
        return (
            <>
            <p>Hmm are you looking for our treasure ??!!</p>
            <div className="backgroundImage">
                <img src={not_allowed_image} alt="" />
            </div>
            </>
        )
    }
}

export default NewBeachForm
