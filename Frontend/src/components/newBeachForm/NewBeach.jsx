import React from "react";
import { useState } from "react";

import axios from "axios";
import FormData from 'form-data';
const { BlobServiceClient } = require('@azure/storage-blob');

import './NewBeach.css'

export function NewBeachForm() {
    
    const [beachName, setBeachName] = useState('');
    const [beachGovernorate, setbeachGovernorate] = useState('');
    const [longititude, setLongititude] = useState('');
    const [lattitude, setlattitude] = useState('');
    const [amenitie, setAmenities] = useState([]);
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");

    const amenities = ['Parking', 'Hiking Spot', 'Volleyball field',
    'Easy access', 'Free entrance', 'Very crowded',
    'Crowded in season', 'Soccer field', 'Restaurants & Cafes'];

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


    // save beach image to azure container
    async function uploadData(event) {
        event.preventDefault();
        // access the storage container
        const blobServiceClient  = new BlobServiceClient(process.env.STORAGESASTOKEN);
        const containerClient  = blobServiceClient.getContainerClient(process.env.container_name)
        const blobName = fileName;
        // necessary to retrieve image via url when rendering
        // add verification that the type is could only be an image
        const blobOptions = {
            blobHTTPHeaders: { 'blobContentType': file.type },
        };
        // upload image to container
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const token = localStorage.getItem('accessToken');
        const beachData = 
        {
            name: beachName,
            governorate: beachGovernorate,
            longitude: longititude,
            latitude: lattitude,
            caracteristiques: amenitie,
            imagepath: "https://cabaignestorage.blob.core.windows.net/images/" + fileName
        }
        blockBlobClient.uploadData(file, blobOptions).then(res => {
            // save the image url to database
            axios.post(process.env.API_BASE_URL + 'api/v1/uploads/azureblopuploadbeach', beachData, {
                headers: {
                    'Authorization': 'bearer ' + token,
                }
            }).then(res => {
                // refresh the page
                const Domain = window.location.origin;
                const URL = Domain + '/newbeach';
                window.location.replace(URL);
            }).catch(err => {
                console.error(err)
            })
        }).then(err => {
            console.error(err);
        });
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
                                    <div className="amenities-section">
                                        {amenities.map((item, id) => {
                                            return <>
                                            <div className="checkBox-options" key={id}>
                                                <input type="checkbox" className="MyCheckBox" onClick={() => addOrRemove(item)}/>
                                                <label htmlFor="checkBoxDescription" className="checkBoxDescription" > {item} </label>
                                            </div>
                                            </>
                                        })}
                                    </div>
                                    
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