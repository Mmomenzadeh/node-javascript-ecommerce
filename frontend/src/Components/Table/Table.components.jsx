import "../../Assets/Styles/Components/Table/index.scss";

export const Table = ({ children ,  className }) => {
  return <>{<table className={`${className}`}>{children}</table>}</>;
};
