import { assets } from "../assets/assets.js";

const Footer = () => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-4 mt-24">

      <div className="flex flex-wrap items-center gap-4">
        <img src={assets.logo} width={150} alt="logo" className="w-20 sm:w-32 lg:w-40 cursor-pointer" />

        <p className="text-gray-500 font-medium text-xs sm:text-base pl-0 sm:pl-4 border-l-0 sm:border-l-2 border-gray-400">
          All right reserved. Copyright @imagify - Arijit Mondal
        </p>
      </div>

      <div className="flex items-center gap-2.5">
        <img src={assets.facebook_icon} alt="facebook_icon" className="w-8 sm:w-10 hover:scale-110 transition-all duration-300 cursor-pointer" />
        <img src={assets.twitter_icon} alt="twitter_icon" className="w-8 sm:w-10 hover:scale-110 transition-all duration-300 cursor-pointer" />
        <img src={assets.instagram_icon} alt="instagram_icon" className="w-8 sm:w-10 hover:scale-110 transition-all duration-300 cursor-pointer" />
      </div>

    </div>
  );
};

export default Footer;
