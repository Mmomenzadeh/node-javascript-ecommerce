import { BannerVertical } from "./BannerVertical/BannerVertical.components";
import DualSense from "../../Assets/Images/Banner/DualSense.jpg";
import gamingLaptop from "../../Assets/Images/Banner/BannerLaptop.jpg";
import headphone2 from "../../Assets/Images/Banner/headphone2.jpg";
import headphone5 from "../../Assets/Images/Banner/headphone5.png";

import "../../Assets/Styles/Components/Banner/index.scss";
import { BannerSmall } from "./BannerSmall/BannerSmall.components";
import { Slider } from "Components";

export const Banner = () => {
  return (
    <div className="Banner">
      <Slider />

      <div className="flex col gap-1">
        <BannerSmall
          img={`https://www.globalvillagespace.com/wp-content/uploads/2022/06/Samsung-about-to-launch-Galaxy-Z-Flip-4-1068x561.jpg`}
          txt="با 30 درصد تخفیف خریداری کنید !"
          link="سبک جدید گوشی های ساموسنگ "
        />

        <BannerSmall
          img={`http://sahebkhabar.ir/hermes/zoomit/zoomit-381585.jpg?ts=1651246648000`}
          txt="با 20 درصد تخفیف خریداری کنید !"
          link="تجربه ی متفاوت بازی با سبک جدید دسته های سونی  "
          className="fs"
        />
      </div>
      <BannerVertical
        name="       لپ تاپ های گیمینگ 2023"
        img ={gamingLaptop}
        heading="خرید با 30 درصد تخفیف "
        btnTxt="الان بخرید "
      />
    </div>
  );
};

// img={`https://cdn.vox-cdn.com/thumbor/j-OPrWT7vl1Kqj_QZW8JW__nOtQ=/0x0:2040x1360/1400x1400/filters:focal(1020x680:1021x681)/cdn.vox-cdn.com/uploads/chorus_asset/file/23231676/cfaulkner_141231_5006_0012.jpg`}

// https://cdn.vox-cdn.com/thumbor/U2noiNWQzde7-swhdB4oDMGFlkE=/0x0:2040x1360/1400x1400/filters:focal(1020x680:1021x681)/cdn.vox-cdn.com/uploads/chorus_asset/file/13674363/vpavic_190102_3148_0136.jpg
