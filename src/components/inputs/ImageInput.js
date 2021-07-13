import React, {useState, useEffect}  from 'react';
import {Image} from "semantic-ui-react";
import placeholder from "../../images/placeholder.png";
import {BACKEND_API} from "../../apis/address";


const ImageInput = ({input, imageAvailable, username }) => {
    const [photo, setPhoto] = useState(null);
    const onProfileEditClick =() => {
        const fileInput = document.createElement("input");
        fileInput.setAttribute("type", "file");
        fileInput.setAttribute("accept", "image/*");
        fileInput.click(); // opening dialog
        fileInput.addEventListener('change', (event) => {
            console.log(fileInput.files)
            const file = fileInput.files[0]
            setPhoto(file);
            input.onChange(file);
            return false;
        });
    }
     useEffect(() => {
        if(input?.value) setPhoto(input.value);
    } ,[input]);

    const src= !photo && imageAvailable ? BACKEND_API + `/v1/download/user/${username}` :  photo?.size > 100 ? window.URL.createObjectURL( photo) : placeholder;

    return (
        <Image   style={{marginLeft: '50vh', margin: 'auto', width: '250px', height: '200px'}} fluid
                label={{ as: 'a', color: 'red', corner: 'right', icon: 'edit' , onClick:  event => onProfileEditClick(event) }}
                src={src}  />
    );
}


export default ImageInput;