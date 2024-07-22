import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RegistrationContext } from "../middleware/RegistrationContext";
import axios from "axios";
import { ENDPOINTS, baseApiUrl } from "../lib/constants";
import { Dropdown, Menu } from "antd";
import { Toaster, toast } from "sonner";
import { jwtDecode } from "jwt-decode";
// import mixpanel from "mixpanel-browser";
// import { MixpanelEvents } from "../lib/mixpanel";

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

  const logoutFromP2P = () => {
    localStorage.removeItem("pittsburgh2peer");
    localStorage.removeItem("p2puserToken");
    navigate("/landing");
    toast("Logged out successfully");
  };

  const checkLocalStorage = () => {
    const pittsburgh2peer = JSON.parse(localStorage.getItem("pittsburgh2peer"));
    if (pittsburgh2peer) {
      const decoded = jwtDecode(pittsburgh2peer.credential);
      const { exp } = decoded;
      return Date.now() < exp * 1000;
    }
  };

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
        localStorage.setItem("p2puserToken", token);
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
        {checkLocalStorage() ? (
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="viewProfile" onClick={handleProfileClick}>
                  View Profile
                </Menu.Item>
                <Menu.Item key="logout" onClick={logoutFromP2P}>
                  Logout
                </Menu.Item>
              </Menu>
            }
          >
            <p className="cursor-pointer hover:text-cmu-red">Profile</p>
          </Dropdown>
        ) : null}
        <p
          className="cursor-pointer hover:text-cmu-red"
          onClick={handleAboutClick}
        >
          About
        </p>
      </div>
      <Toaster />
    </div>
  );
};

export default TopBar;
