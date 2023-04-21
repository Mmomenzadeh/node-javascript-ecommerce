import { CategorasMenu } from "Components";
import "../../Assets/Styles/Components/MegaMenu/index.scss";

export const MegaMenu = ({ showMegaMenu, setShowMegaMenu }) => {
  const trackMouse = (e) => {
    // console.log(e.target.dataset.id);
    // console.log(e.target.getAttribute("data-id"));
    if (e.target.dataset.id === "background") {
      document.body.style.overflow = "unset";
      setShowMegaMenu(false);
    } else {
      console.log("true");
    }
  };

  return (
    <div className="MegaMenu">
      <div
        className="MegaMenu__background"
        data-id="background"
        onMouseEnter={(e) => trackMouse(e)}
      ></div>
      <div className="MegaMenu__MegaMenuContainer" data-id="MegaMenuContainer">
        <CategorasMenu />
      </div>
    </div>
  );
};
