import React from "react";
import { useState } from "react";
import axios from "axios";
import FormData from 'form-data';

import './NewBeach.css'

export function NewBeachForm() {
    
    const [beachName, setBeachName] = useState('');
    const [beachGovernorate, setbeachGovernorate] = useState('');
    const [longititude, setLongititude] = useState('');
    const [lattitude, setlattitude] = useState('');
    const [amenitie, setAmenities] = useState([]);
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");

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
        axios.post('http://localhost:3001/api/v1/uploads/beachesUploads', formData, {
            headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).catch(err => {
            console.error(err);
        })
    }
    
    return (
        <>
        <div className="newbeach-page">
            <div className="newbeach-container">
                <div className="newbeach-card">
                    <p>*Admin access only</p>
                    <h1 className="form-header">Fill new beach info</h1>
                    <div className="newbeach-form">
                            <div className="newbeach-section-one">
                                <label className="newbeach-label">Beach name</label>
                                <input className="newbeach-input" type="text" placeholder="Beach name" value={beachName} onChange={e => setBeachName(e.target.value)}/>
                                
                                <label className="newbeach-label">Governorate</label>
                                <select value={beachGovernorate} onChange={e => setbeachGovernorate(e.target.value)}>
                                    <option hidden>--Select Governorate--</option>
                                    <option>Tunis</option>
                                    <option>Bizerte</option>
                                    <option>Nabeul</option>
                                    <option>Sousse</option>
                                </select>
                                
                                
                                <label className="newbeach-label">Latitude</label>
                                <input className="newbeach-input" type="number" placeholder="e.g 30.8749" value={lattitude} onChange={e => setlattitude(e.target.value)}/>

                                <label className="newbeach-label">Longitude</label>
                                <input className="newbeach-input" type="number" placeholder="e.g 10.6542" value={longititude} onChange={e => setLongititude(e.target.value)}/>
                            </div>
                            <div className="newbeach-section-two">
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
                                <button className="newbeach-button" onClick={uploadData}>Upload</button>
                            </div>
                            
                            
                    </div>
                
                </div>
                
            </div>
        </div>
        </>
    )
}

export default NewBeachForm
