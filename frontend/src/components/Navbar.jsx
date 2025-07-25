import { useState } from "react";
import { assets } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext.js";

const Navbar = () => {
  const { user, navigate, setShowLogin, credit, logoutMethod } = useAppContext();
  const [openLogout, setOpenLogout] = useState(false);

  return (
    <div className="flex items-center justify-between py-4">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        className="w-20 sm:w-32 lg:w-40 cursor-pointer"
        alt="logo"
      />

      <div>
        {user ? (
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Credit left section */}
            <button 
              onClick={() => navigate("/buy-credit")}
              className="flex items-center gap-1 sm:gap-2 bg-blue-100 px-2 py-1 sm:px-6 sm:py-2.5 rounded-full hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <img src={assets.credit_star} alt="credit_star" className="w-5" />
              <p className="text-xs sm:text-sm font-medium text-gray-600">Credit Left: {credit}</p>
            </button>
            
            {/* User profile section */}
            <div className="flex items-center gap-1 sm:gap-2">
              <p className="text-xs sm:text-sm font-medium text-gray-600 capitalize">Hii! {user.name.split(" ")[0]}</p>

              <div 
                className="relative group cursor-pointer" 
                onClick={() => setOpenLogout(!openLogout)}
              >
                <img
                  src={assets.profile_icon}
                  alt="profile_icon"
                  className="w-8 sm:w-10 drop-shadow rounded-full"
                />

                {openLogout && <div className={`absolute top-0 right-0 z-10 text-black rounded pt-12`}>
                  <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm font-medium">
                    <li onClick={logoutMethod} className="py-1 px-2 cursor-pointer pr-10">
                      Logout
                    </li>
                  </ul>
                </div>}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-5">
            <p
              className="text-gray-600 font-medium cursor-pointer hover:text-gray-900 transition-all"
              onClick={() => navigate("/buy-credit")}
            >
              Pricing
            </p>

            <button 
              className="bg-black text-white rounded-full px-4 py-1 sm:py-2 sm:px-8 md:px-12 hover:bg-white hover:text-black transition-all duration-300 border cursor-pointer"
              onClick={() => (setShowLogin(true))}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
