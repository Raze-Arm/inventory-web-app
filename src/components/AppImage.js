import React, {useEffect, useState} from 'react'
import {Image} from "semantic-ui-react";

import placeholder from '../images/placeholder.png';

export const AppImage = ({src, ...props}) => {
    const [imageSrc , setImgSrc] = useState(src);

    useEffect(() => {
        setImgSrc(src);
    }, [src])

    return (
        <Image src={imageSrc}  onError={(e) => setImgSrc(placeholder)}  {...props}    />

    );
}