import { Link } from "react-router-dom";
import "../../Assets/Styles/Components/Logo/index.scss";
export const Logo = () => {
  return (
    <Link to="/">
      <img
        className="logo "
        src="https://www.uplooder.net/img/image/72/2723a14a11faf9e70500906ffb1cad55/logo.png"
      />
    </Link>
  );
};
