import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./pages/Home";
import BuyCredit from "./pages/BuyCredit";
import Result from "./pages/Result";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { useAppContext } from "./context/AppContext.js";

const App = () => {
  const { showLogin } = useAppContext();

  return (
    <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50">
      <Navbar />
      {showLogin && <Login />}

      {/* All routes of the app */}
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/result"} element={<Result />} />
        <Route path={"/buy-credit"} element={<BuyCredit />} />
        <Route path={"*"} element={<div>404 - Page Not Found</div>} />
      </Routes>

      <ToastContainer />
      <Footer />
    </div>
  );
};

export default App;
