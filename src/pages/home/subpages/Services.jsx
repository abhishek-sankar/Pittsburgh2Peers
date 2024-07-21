import {
  CarOutlined,
  TruckOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { ENDPOINTS, P2PServices, baseApiUrl } from "../../../lib/constants";
import { useContext, useEffect } from "react";
import { RegistrationContext } from "../../../middleware/RegistrationContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import mixpanel from "mixpanel-browser";
import { MixpanelEvents } from "../../../lib/mixpanel";

const Services = ({ service, setStage, setService }) => {
  const handleServiceClick = (service) => {
    mixpanel.track(MixpanelEvents.USER_SELECTED_SERVICE, { service: service });
    setService(service);
  };

  const registrationContext = useContext(RegistrationContext);
  const { isUserEligibleForRequests, email, setIsUserEligibleForRequests } =
    registrationContext;

  const navigate = useNavigate();
  const handleViewCarpool = () => {
    navigate("/carpool");
  };

  useEffect(() => {
    const checkIsUserEligibleForRequests = async () => {
      const checkEligibilityBody = {
        token: localStorage.getItem("p2puserToken"),
        email: email,
      };
      try {
        const response = await axios.post(
          baseApiUrl + ENDPOINTS.POST_UserProfileComplete,
          checkEligibilityBody
        );

        setIsUserEligibleForRequests(response.data.eligible);
      } catch (error) {
        console.log(error);
      }
    };

    checkIsUserEligibleForRequests();
  }, [email, setIsUserEligibleForRequests]);

  return (
    <AnimatePresence>
      <motion.div
        className="flex flex-col items-center p-4"
        key="services-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
      >
        <div className="flex flex-row items-center p-4">
          Welcome to Pittsburgh. Let's take some weight off those shoulders. How
          can we help?
        </div>
        <div className="flex flex-col md:flex-row gap-4 p-4">
          <Button
            size={"large"}
            className={`${
              service === P2PServices.FIND_A_RIDE
                ? "text-cmu-red border-cmu-red"
                : "hover:text-cmu-red hover:border-cmu-red"
            }`}
            onClick={() => handleServiceClick(P2PServices.FIND_A_RIDE)}
          >
            <CarOutlined />
            Find a ride
          </Button>
          <Button
            size={"large"}
            className={`${
              service === P2PServices.REQUEST_A_UHAUL
                ? "text-cmu-red border-cmu-red"
                : "hover:text-cmu-red hover:border-cmu-red"
            }`}
            onClick={() => handleServiceClick(P2PServices.REQUEST_A_UHAUL)}
          >
            <TruckOutlined />
            Request a UHaul
          </Button>
          {isUserEligibleForRequests ? (
            <div className="border-t border-cmu-red pt-4">
              <Button
                size={"large"}
                className=""
                onClick={() => handleViewCarpool()}
              >
                <UsergroupAddOutlined />
                View Carpool Mates
              </Button>
            </div>
          ) : null}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Services;
