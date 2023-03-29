import { AiOutlineCheck } from "react-icons/ai";

const Advert = () => {
  return (
    <div className="advert">
      <div data-aos="fade-right" className="advert_Left">
        <img
          src="https://superio-next.vercel.app/images/resource/image-2.jpg"
          alt=""
        />
      </div>
      <div data-aos="fade-left" className="advert_right">
        <h1>Millions of Jobs. Find the one that suits you.</h1>
        <p>
          Search all the open positions on the web. Get your own personalized
          salary estimate. Read reviews on over 600,000 companies worldwide.
        </p>
        <ul>
          <li>Bring to the table win-win survival</li>
          <li>Capitalize on low hanging fruit to identify</li>
          <li>But I must explain to you how all this</li>
        </ul>
      </div>

      <span data-aos="flip-right" className="employerCount">
        <span className="icon">
          <AiOutlineCheck />
        </span>
        <h4> 300+ Employers</h4>
      </span>
    </div>
  );
};

export default Advert;
