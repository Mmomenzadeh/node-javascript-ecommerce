import "../../Assets/Styles/Components/Button/index.scss"
export const Button = ({children , color , size , type ,outline , className ,  onClick , disabled , onMouseDown , onSubmit}) => {
  return (
    <button className={`btn btn--${type} btn--${size} btn--${outline} btn--${color}  btn--${className}`} onClick={onClick} disabled={disabled} onMouseDown={onMouseDown} onSubmit={onSubmit}>{children}</button>
  )
}
