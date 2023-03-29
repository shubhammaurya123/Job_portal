import React, { Component, useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import RecuiterCard from './RecuiterCard';

const TopHiring = () => {


    const [companyDetail, setCompanyDetail] = useState([]);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:9002/admin/companyDetail");
            const companyDetail = await response.json();
            setCompanyDetail(companyDetail.companyDetail);
            setIsError(false)
        } catch (e) {
            setIsError(true);
        }
    };

    const arrayBufferToBase64 = (buffer) => {
        var binary = "";
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => (binary += String.fromCharCode(b)));
        return window.btoa(binary);
    };


    return (
        <Carousel showThumbs={false} showIndicators={false} >
            {
                companyDetail.map((item, ind) => {
                    const { companyName, img } = item;
                    var base64Flag = "data:image/png;base64,";
                    var imageStr = arrayBufferToBase64(img.data.data);
                    const imgSrc = base64Flag + imageStr;
                    return (
                        <RecuiterCard key={ind} logo={imgSrc} name={companyName} hired={5} />
                    )
                })
            }
        </Carousel>
    );
}

export default TopHiring;