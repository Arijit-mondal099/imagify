import { useEffect, useState } from "react";
import { AppContext } from "./AppContext.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

const AppContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [credit, setCredit] = useState(null);
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const loadCreditData = async () => {
    try {
      const { data } = await axios.get("/api/v1/users/credits", {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      });

      if (data?.success) {
        setCredit(data?.credits);
        setUser(data?.user);
      }
    } catch (error) {
      console.log("Error :: While loadCreditData", error);
      toast.error(error.message);
    }
  };

  const logoutMethod = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    toast.success("Logout successfully.");
  };

  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        "/api/v1/images/generate-image",
        { prompt },
        { headers: { Authorization: `${token}` } }
      );

      if (data?.success) {
        await loadCreditData();
        return data?.image;
      } else {
        await loadCreditData();
        if (credit <= 0) {
          toast.error("Plase buy credit for generate more images");
          navigate("/buy-credit");
        }
      }
    } catch (error) {
      console.log("Error :: While generatedImage", error);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    if (token) loadCreditData();
  }, []);

  const VALUE = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    navigate,
    token,
    setToken,
    credit,
    setCredit,
    axios,
    loadCreditData,
    logoutMethod,
    generateImage,
  };

  return <AppContext.Provider value={VALUE}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
