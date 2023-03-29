
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Marquee from "react-fast-marquee";
import "./CompanyMarquee.css";

const CompanyMarquee = () => {
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
  const marqueeStyle = {
    overflowY:'hidden',
    height: "170px"
  }
  return (
    <>
      <h2>Top Hiring Companies</h2>
      {isError?<h2>Cannot load data</h2>:
      <Marquee className="marquee" style={marqueeStyle} speed={20}>
        {companyDetail.map((item) => {
          const { companyName, img, _id } = item;
          var base64Flag = "data:image/png;base64,";
          var imageStr = arrayBufferToBase64(img.data.data);
          const imgSrc = base64Flag + imageStr;
          return (
            <div className="marquee-item-cn" key={_id}>
              <div className="marquee-item">
                <div className="logo-cn">
                  <img src={imgSrc} alt="" className="company-logo"></img>
                </div>
                <p>{companyName}</p>
              </div>
            </div>
          );
        })}
      </Marquee>
}
    </>
  );
};

export default CompanyMarquee;
