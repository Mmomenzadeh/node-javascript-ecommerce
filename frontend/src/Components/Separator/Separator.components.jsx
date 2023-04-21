import "../../Assets/Styles/Components/Separator/index.scss"
export const Separator = ({titleFa , titleEn, img , icon}) => {
  return (
    <div className="separator flex col a-c gap-2">
        <div className="flex j-c">
            <img className="separator__img" src={img} alt={titleEn} />
        </div>
        <div className="flex col gap-1 j-c a-c">
        <div className="flex a-c gap-1">
        {icon}
        <p className="separator__title--fa">{titleFa}</p>
        </div>
        <p className="separator__title--en">{titleEn}</p>

        </div>
    </div>
  )
}
