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
        <div className="Container">
            <div className="form-container">
                <h1>New beach</h1>
                <form action="">
                    <input className="myInput" type="text" placeholder="beach name" value={beachName} onChange={e => setBeachName(e.target.value)}/>
                    <input className="myInput" type="text" placeholder="governorate" value={beachGovernorate} onChange={e => setbeachGovernorate(e.target.value)}/>
                    <input className="myInput" type="number" placeholder="longitude" value={longititude} onChange={e => setLongititude(e.target.value)}/>
                    <input className="myInput" type="number" placeholder="lattitude" value={lattitude} onChange={e => setlattitude(e.target.value)}/>
                    {/* check boxes */}
                    <legend>Add amenities</legend>
                        <br />
                        {amenities.map((item, id) => {
                            return <>
                            <div className="checkBox-options" key={id}>
                                <input type="checkbox" className="MyCheckBox" onClick={() => addOrRemove(item)}/>
                                <label htmlFor="checkBoxDescription" className="checkBoxDescription" > {item} </label>
                            </div>
                            <br />
                            </>
                        })}
                    <br />
                    <br />
                    <legend>Image</legend>
                    <input type="file" onChange={saveFile}/>
                    <br />
                    <button onClick={uploadData}>Upload</button>
                </form>
            </div>
        </div>
        </>
    )
}

export default NewBeachForm
