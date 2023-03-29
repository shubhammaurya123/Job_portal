import "./styles.css";
import { IoIosArrowForward } from "react-icons/io";

const defaultImgLink =
  "https://img.freepik.com/free-photo/guy-shows-document-girl-group-young-freelancers-office-have-conversation-working_146671-13569.jpg?w=996&t=st=1679342232~exp=1679342832~hmac=019613b9b2636b600242cc06e38460db7016664ea1aa5d5137c02aae16534e90";

const index = ({ link, title, date }) => {
  return (
    <div className="newsCard">
      <div className="imageContainer">
        <img src={defaultImgLink} alt="" />
      </div>
      <div className="newsCardContainer">
        <p>{date}</p>
        <a href={link}>{title}</a>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic aliquam,
          odit...
        </p>
        <button onClick={(e) => (window.location.href = link)}>
          Read More <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

export default index;
