import {
  LeftOutlined as LeftArrow,
  RightOutlined as RightArrow,
} from "@ant-design/icons";
import { Button } from "antd";
import { AnimatePresence } from "framer-motion";
import { useContext, useEffect, useCallback } from "react";
import { P2PServices, stages } from "../../lib/constants";
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
  const validateArrivalDetails = () => {
    return false;
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
        return false;
      case stages.CONTACT_INFO:
        return false;
      case stages.CONFIRMATION:
        return false;
      default:
        return false;
    }
  };

  const renderStage = () => {
    switch (stage) {
      case stages.HOMEPAGE:
        return <Services setStage={setStage} setService={setService} />;
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
      //   case stages.ARRIVAL_DETAILS_TIME:
      //     return (
      //       <ArrivalTime
      //         selectedTime={selectedTime}
      //         handleTimeChange={handleTimeChange}
      //       />
      //     );
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
              <Button onClick={handlePrev} className="rounded-lg">
                <LeftArrow />
                Previous
              </Button>
            )}
            {stage !== stages.CONFIRMATION && (
              <Button
                onClick={handleNext}
                className="rounded-lg"
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