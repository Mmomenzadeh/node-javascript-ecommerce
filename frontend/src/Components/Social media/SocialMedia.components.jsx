import { AiOutlineTwitter } from "react-icons/ai";
import { BsInstagram } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { TbBrandTelegram } from "react-icons/tb";
import { Link } from "react-router-dom";
import "../../Assets/Styles/Components/social media/index.scss"
export const SocialMedia = () => {
  return (
    <div className="socialMedia">
      <Link className="socialMedia__link" to="">
        <BsInstagram className="hover" />
      </Link>
      <Link className="socialMedia__link" to="">
        <AiOutlineTwitter className="hover" />
      </Link>
      <Link className="socialMedia__link" to="">
        <FaLinkedinIn className="hover" />
      </Link>
      <Link className="socialMedia__link" to="">
        <TbBrandTelegram className="hover"  size="2.7rem" />
      </Link>
    </div>
  );
};
