import { Button, Input, Logo } from "Components";
import "../../Assets/Styles/Pages/LogIn/index.scss";
import { BsEyeFill } from "react-icons/bs";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { AuthService } from "API";

export const LogIn = () => {
  /// use hook useNavigate for redirect user to valid page
  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    /// authentication process
    AuthService(data)
      .then((res) => {
        localStorage.setItem("access_token", res.data.accessToken);
        localStorage.setItem("refresh_token", res.data.refreshToken);
        navigation("/managementPanle");
       
      })
      .catch(() => {
        navigation("/home");
      });
  };

  return (
    <div className="flex j-c a-c col full-h">
      <form onSubmit={handleSubmit(onSubmit)} className=" flex col a-c  login">
        <div className="login__header">
          <Logo />
        </div>

        <div className="login__body flex col a-c gap-3  ">
          <Input
            inpType="login"
            type="text"
            holder="نام کاربری خود را وارد نمایید "
            validate={{
              ...register("username", {
                required: true,
                // minLength: 4,
                // pattern:
                //   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              }),
            }}
          />
          {errors.username && (
            <p className="error-form">وارد کردن نام کاربری الزامی ست</p>
          )}
          <div className="login__input">
            <Input
              inpType="login"
              type="password"
              holder="رمز عبور خود را وارد نمایید"
              validate={{
                ...register("password", {
                  required: true,
                  // minLength: 8,
                  // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                }),
              }}
            />
            <BsEyeFill className="login-icon" />
          </div>
          {errors.password && (
            <p className="error-form">وارد کردن رمزعبور الزامی ست</p>
          )}

          <div className="login__lable flex j-sb a-c">
            <div className="flex a-c">
              <Input type="checkbox" />
              <p className="fs-1 pointer">مرا به خاطر بسپار</p>
            </div>
            <Link to="" className="login-link">
              رمزم را فراموش کرده ام
            </Link>
          </div>
        </div>

        <div className="login__footer flex col a-c gap-2">
          <Button type="login">
            <span>ورود به پنل</span>
            <BiLeftArrowAlt className="btn-icon" />
          </Button>
          <Link to="" className="login-link">
            ثبت نام نکرده ام
          </Link>
        </div>
      </form>
    </div>
  );
};
