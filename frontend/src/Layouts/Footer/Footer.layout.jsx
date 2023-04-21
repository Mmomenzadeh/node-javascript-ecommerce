import { Logo, SocialMedia } from "Components";
import { Link } from "react-router-dom";
import "../../Assets/Styles/Layout/Footer/index.scss"
export const Footer = () => {
    return (
      <>
        <footer className="footer">
        <div className="line-footer"></div>
          <div className="footer__link">
            <Link to="" className="footer__link__item">
              <span>درباره ما</span>
            </Link>
  
            <Link to="" className="footer__link__item">
              <span>قوانین و مقررات</span>
            </Link>
  
            <Link to="" className="footer__link__item">
              <span>سوالات متدوال</span>
            </Link>
  
            <div style={{ margin: "0 2rem" }}>
              <Logo/>
            </div>
  
            <Link to="" className="footer__link__item">
              <span>وبلاگ</span>
            </Link>
  
            <Link to="" className="footer__link__item">
              <span>دعودت به همکاری </span>
            </Link>
  
            <Link to="" className="footer__link__item">
              <span>تماس با ما </span>
            </Link>
          </div>
  
          <div className="footer__icons">
           <SocialMedia/>
             
          <span style={{fontSize:"1.1rem" , marginTop:"3rem"}}> مارول دیجست در شبکه های اجتماعی و پیام رسان ها</span>
          </div>
          <div className="footer__copyRight">
          <p style={{display:"block"}}>  کلیه حقوق برای <span style={{color:"#ef3a4f"}}>مارول دیجیست</span> محفوظ می باشد.</p>
          <p style={{display:"block"}}>
            Copyright © 2023 <span style={{color:"#ef3a4f"}}>Marvel Digist</span> Cloud Computing Technology ® , All Rights Reserved.
          </p>
          </div>
        </footer>
      </>
    );
  };
  