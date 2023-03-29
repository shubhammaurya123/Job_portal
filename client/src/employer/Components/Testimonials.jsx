import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import TestmonialCard from "./TestmonialCard";
import { useEffect, useState } from "react";



const Testimonials = () => {

    const [feedbackdetail, setfeedbackdetail] = useState([]);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:9002/admin/feedbackDetail");
            const feedbackDetail = await response.json();
            setfeedbackdetail(feedbackDetail.feedbackDetail);
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
        <div>
            <Carousel dynamicHeight={false} infiniteLoop={true} showThumbs={false} showIndicators={false}>
                {
                    feedbackdetail.map((review, ind) => {
                        const { feedback, name, img } = review
                        var base64Flag = "data:image/png;base64,";
                        var imageStr = arrayBufferToBase64(img.data.data);
                        const imgSrc = base64Flag + imageStr;
                        return (
                            <TestmonialCard
                                key={ind}
                                name={name}
                                review={feedback}
                                picture={imgSrc}
                            />
                        )
                    })
                }
            </Carousel>
        </div>
    )
}

export default Testimonials