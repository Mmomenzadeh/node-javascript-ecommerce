import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import "../../Assets/Styles/Components/HeadingTitle/index.scss"

export const HeadingTitle = ({ titleFa, titleEn , size  , categoeyId}) => {
  return (
    <Link to={`/category/${categoeyId}`} className="headingTitle">
      <div className="headingTitle__title-fa">{titleFa}</div>
      <div className="headingTitle__title-en">{titleEn}</div>
      <div className="line" style={{width :`${size}`}}></div>
      <div className="headingTitle__link">
        <p style={{ fontSize: "1.2rem" }}>مشاهده ی همه </p>
        <IoIosArrowBack size="1.7rem" />
      </div>
    </Link>
  );
};
