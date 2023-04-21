import { Link } from "react-router-dom";

export const BannerSmall = ({ img, txt, link  , className}) => {
  return (
    <div className="BannerSmall">
      <img className="BannerSmall__img" src={img} alt={link} />
      <Link className={`BannerSmall__link BannerSmall__link--${className}`}>{link}</Link>

      <span className= {`BannerSmall__txt `}>{txt}</span>
    </div>
  );
};
