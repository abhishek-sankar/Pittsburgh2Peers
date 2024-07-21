import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RegistrationContext } from "../middleware/RegistrationContext";
import axios from "axios";
import { ENDPOINTS, baseApiUrl } from "../lib/constants";

const TopBar = () => {
  const navigate = useNavigate();
  const handleAboutClick = () => {
    navigate("/about");
  };
  const handleHomeClick = () => {
    navigate("/home");
  };
  const handleProfileClick = () => {
    navigate("/profile");
  };

  const registrationContext = useContext(RegistrationContext);
  const { setUserToken, email } = registrationContext;

  useEffect(() => {
    const generateTokenForEmail = async () => {
      const userData = {
        email: email,
      };
      try {
        const response = await axios.post(
          baseApiUrl + ENDPOINTS.POST_GenerateToken,
          userData
        );
        const { token } = response.data;
        setUserToken(token);
      } catch (error) {
        console.error("Error during token generation:", error);
      }
    };

    const interval = setInterval(() => {
      if (email) {
        generateTokenForEmail();
      }
    }, 30 * 60 * 1000); // 30 minutes

    return () => clearInterval(interval);
  }, [email, setUserToken]);

  return (
    <div className="sticky flex flex-row items-center justify-between w-full px-8 py-4 bg-white border-b border-gray-200 max-w-screen-lg">
      <h1 className="text-2xl text-cmu-red font-bold logo-text">P2P</h1>
      <div className="flex flex-row items-center justify-end gap-4">
        <p
          className="cursor-pointer hover:text-cmu-red"
          onClick={handleHomeClick}
        >
          Home
        </p>
        <p
          className="cursor-pointer hover:text-cmu-red"
          onClick={handleProfileClick}
        >
          Profile
        </p>
        <p
          className="cursor-pointer hover:text-cmu-red"
          onClick={handleAboutClick}
        >
          About
        </p>
      </div>
    </div>
  );
};

export default TopBar;
