import { Link } from "react-router-dom";
import "../../Assets/Styles/Components/CategoryLogo/index.scss";
export const CategoryLogo = ({ img , txt , categoryId }) => {
  return (
    <Link to={`/category/${categoryId}`} className="categoryLogo">
      <div className="categoryLogo__border">
        <img
          className="categoryLogo__img"
          src={`${img}`}
          alt={txt}
        />
      </div>
        <span className="fs-15 gray-400">{txt}</span>
    </Link>
  );
};
