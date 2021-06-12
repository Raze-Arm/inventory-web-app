import React, {useState, useEffect}  from 'react';
import {Image} from "semantic-ui-react";
import placeholder from "../../images/placeholder.png";
import './ProductImageInput.css'
import {BACKEND_API} from "../../apis/address";

const ProductImageInput = ({input, photoUrl, imageAvailable, id}) => {
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

    const src=BACKEND_API + `/v1/download/product/${id}`
        console.log('id###', src, photo ,imageAvailable);
    if(!photo && imageAvailable) return  <Image id={'product-image'}   style={{ marginLeft: '50vh', margin: 'auto', width: '250px', height: '200px' }} fluid bordered
                                                      label={{ as: 'a', color: 'red', corner: 'right', icon: 'edit' , onClick:  event => onProfileEditClick(event) }}
                                                      src={src}  />;
    else
    return (
        <Image id={'product-image'}   style={{ marginLeft: '50vh', margin: 'auto', width: '250px', height: '200px' }} fluid bordered
                 label={{ as: 'a', color: 'red', corner: 'right', icon: 'edit' , onClick:  event => onProfileEditClick(event) }}
                 src={photo !== null && photo?.size > 100 ? window.URL.createObjectURL( photo) : placeholder}  />
    );
}


export default ProductImageInput;