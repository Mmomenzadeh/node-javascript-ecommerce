import "../../Assets/Styles/Components/Input/index.scss";
export const Input = ({
  type,
  holder,
  value,
  defaultValue,
  onChange , 
  inpType,
  accept,
  className,
  validate ,
  onkeydown,
  onBlur,
  checked,
  name,
  onClick,
  ...rest
}) => {
  return (
    <input
      className={`input input--${inpType} input--${className}`}
      multiple
      onClick={onClick}
      type={type}
      placeholder={holder}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      accept={accept}
      onBlur={onBlur}
      onKeyDown={onkeydown}
      name ={name}
      checked={checked}
      {...validate}
      {...rest}
    />
  );
};
