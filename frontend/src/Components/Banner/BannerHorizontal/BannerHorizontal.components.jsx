import "../../../Assets/Styles/Components/Banner/index.scss"

export const BannerHorizontal = ({ size, txt, img , className }) => {
  return (
    <div className={`bannerHorizontal  `}>
      <img className={`bannerHorizontal__img  bannerHorizontal__img--${size} bannerHorizontal__img--${className}  `} src={img} alt="pic" />
      {txt ? <span className="bannerHorizontal__txt">{txt}</span> : null}
    </div>
  );
};
