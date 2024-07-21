import {
  LeftOutlined as LeftArrow,
  RightOutlined as RightArrow,
} from "@ant-design/icons";
import { Button } from "antd";
import { AnimatePresence } from "framer-motion";
import { useContext, useEffect, useCallback } from "react";
import {
  ENDPOINTS,
  P2PServices,
  baseApiUrl,
  stages,
} from "../../lib/constants";
import { RegistrationContext } from "../../middleware/RegistrationContext";
import {
  ArrivalDetails,
  Confirmation,
  ContactInfo,
  FindARide,
  LookingFor,
  RequestDetails,
  Services,
  SourceDestinationSelect,
} from "./subpages";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import mixpanel from "mixpanel-browser";
import { MixpanelEvents } from "../../lib/mixpanel";

const Home = () => {
  const registrationContext = useContext(RegistrationContext);
  const {
    stage,
    setStage,
    onLookingForChange,
    selectedDate,
    handleDateChange,
    selectedTime,
    handleTimeChange,
    handlePrev,
    handleNext,
    service,
    setService,
    setPicture,
    setGivenName,
    setName,
    setEmail,
    numberOfPeople,
    numberOfTrolleys,
    source,
    requireDriver,
    destination,
    contactConsent,
    userToken,
    email,
    setIsUserEligibleForRequests,
  } = registrationContext || {};

  useEffect(() => {
    if (stage === stages.FIND_A_RIDE || stage === stages.REQUEST_A_UHAUL) {
      setTimeout(() => {
        setStage(stages.ARRIVAL_DETAILS);
      }, 2000);
    }
  }, [stage, setStage]);

  const validateServiceSelection = useCallback(() => {
    return !(
      service === P2PServices.FIND_A_RIDE ||
      service === P2PServices.REQUEST_A_UHAUL
    );
  }, [service]);

  useEffect(() => {
    validateServiceSelection();
  }, [service, validateServiceSelection]);

  useEffect(() => {
    const pittsburgh2peer = JSON.parse(localStorage.getItem("pittsburgh2peer"));
    if (pittsburgh2peer) {
      const decoded = jwtDecode(pittsburgh2peer.credential);
      const { name, email, picture, given_name } = decoded;
      setName(name);
      setEmail(email);
      setPicture(picture);
      setGivenName(given_name);
    }
  }, [setName, setEmail, setGivenName, setPicture]);

  useEffect(() => {
    checkIsUserEligibleForRequests();
  }, []);
  const validateArrivalDetails = () => {
    return false;
  };

  const validateRequestDetails = () => {
    mixpanel.track(MixpanelEvents.USER_SELECTED_REQUEST_DETAILS, {});
    const checkCarpoolFlowDisabled = !(numberOfPeople && numberOfTrolleys);
    const checkUHaulFlowDisabled = requireDriver === null;
    return checkCarpoolFlowDisabled && checkUHaulFlowDisabled;
  };

  const validateSourceDestination = () => {
    return !(source && destination);
  };

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

  const isNextDisabled = () => {
    switch (stage) {
      case stages.HOMEPAGE:
        return validateServiceSelection();
      case stages.FIND_A_RIDE:
        return false;
      case stages.REQUEST_A_UHAUL:
        return false;
      case stages.ARRIVAL_DETAILS:
        return validateArrivalDetails();
      case stages.ARRIVAL_DETAILS_TIME:
        return false;
      case stages.LOOKING_FOR:
        return false;
      case stages.REQUEST_DETAILS:
        return validateRequestDetails();
      case stages.SOURCE_DESTINATION:
        return validateSourceDestination();
      case stages.CONTACT_INFO:
        return !contactConsent;
      case stages.CONFIRMATION:
        return false;
      default:
        return false;
    }
  };

  const renderStage = () => {
    switch (stage) {
      case stages.HOMEPAGE:
        return (
          <Services
            service={service}
            setStage={setStage}
            setService={setService}
          />
        );
      case stages.FIND_A_RIDE:
      case stages.REQUEST_A_UHAUL:
        return <FindARide />;
      case stages.ARRIVAL_DETAILS:
        return (
          <ArrivalDetails
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
            selectedTime={selectedTime}
            handleTimeChange={handleTimeChange}
            service={service}
          />
        );
      case stages.LOOKING_FOR:
        return <LookingFor onLookingForChange={onLookingForChange} />;
      case stages.REQUEST_DETAILS:
        return <RequestDetails />;
      case stages.SOURCE_DESTINATION:
        return <SourceDestinationSelect />;
      case stages.CONTACT_INFO:
        return <ContactInfo />;
      case stages.CONFIRMATION:
        return <Confirmation />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-screen-lg w-full">
      <AnimatePresence>
        {renderStage()}
        {stage !== stages.FIND_A_RIDE && stage !== stages.REQUEST_A_UHAUL && (
          <div
            className={`flex flex-row max-w-screen-lg z-50 bg-white ${
              stage !== stages.HOMEPAGE ? "justify-between" : "justify-end"
            } rounded-lg w-full p-4 fixed bottom-8`}
            key={"homepage-container"}
          >
            {stage !== stages.HOMEPAGE && (
              <Button
                size={"large"}
                onClick={handlePrev}
                className="rounded-lg"
              >
                <LeftArrow />
                Previous
              </Button>
            )}
            {stage !== stages.CONFIRMATION && (
              <Button
                onClick={handleNext}
                size={"large"}
                className="rounded-lg bg-cmu-red text-white"
                disabled={isNextDisabled()}
              >
                Next <RightArrow />
              </Button>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
