import React, { useState } from "react";
import {
  ENDPOINTS,
  LookingFor,
  P2PServices,
  navigation,
  stages,
} from "../lib/constants";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { baseApiUrl } from "../lib/constants";
import mixpanel from "mixpanel-browser";
import { MixpanelEvents } from "../lib/mixpanel";

const RegistrationContext = React.createContext();
export const P2PRegistrationContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [stage, setStage] = useState(stages.HOMEPAGE); // Where the flow starts
  const [selectedDate, setSelectedDate] = useState(""); // the date of arrival in Pitt // format - iii d LLL
  const [selectedTime, setSelectedTime] = useState(""); // the time of arrival in Pitt // format - hh:mm
  const [lookingFor, setLookingFor] = useState(LookingFor.RIDE); // Whether they are looking for a ride or for passengers
  const [numberOfPeople, setNumberOfPeople] = useState(null); // Number of people in the party
  const [numberOfTrolleys, setNumberOfTrolleys] = useState(null); // Number of trolleys in the party
  const [service, setService] = useState(null); // Whether the user wants a ride or UHaul
  const [name, setName] = useState(""); // User's name from google oauth
  const [email, setEmail] = useState(""); // User's email from google oauth
  const [picture, setPicture] = useState(""); // User's picture url from google oauth
  const [givenName, setGivenName] = useState(""); // User's given name from google oauth
  const [source, setSource] = useState(""); // Source location selected by the user
  const [destination, setDestination] = useState(""); // destination location picked by the user
  const [requireDriver, setRequireDriver] = useState(null); // whether the user needs a driver for the Uhaul
  const [phoneNumber, setPhoneNumber] = useState(""); // the user input phone number
  const [contactConsent, setContactConsent] = useState(true); // consent to share user data
  const [userToken, setUserToken] = useState(""); // token to make api calls provided by the backend
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [isUserEligibleForRequests, setIsUserEligibleForRequests] =
    useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleNext = () => {
    switch (stage) {
      case stages.CONTACT_INFO:
        if (service === P2PServices.FIND_A_RIDE) {
          registerUserRequest();
        } else {
          userUHaulRequest();
        }
        break;
      default:
        setStage(navigation[stage].next);
    }
  };

  const handlePrev = () => {
    setStage(navigation[stage].prev);
  };

  const onLookingForChange = (lookingFor) => {
    setLookingFor(lookingFor);
  };

  const userUHaulRequest = async () => {
    const uHaulRequestBody = {
      token: localStorage.getItem("p2puserToken"),
      email: email,
      date: new Date(
        new Date(selectedDate).setFullYear(new Date().getFullYear())
      ).toLocaleDateString("en-GB"),
      time: selectedTime,
      startLocation: source,
      endLocation: destination,
      driverRequired: requireDriver,
    };

    try {
      const response = await axios.put(
        baseApiUrl + ENDPOINTS.POST_UHaulRequest,
        uHaulRequestBody
      );

      const { errorCode } = response.data;
      const userMessage =
        errorCode === "0"
          ? "Succesfully raised a UHaul request"
          : "Error: Oops, something went wrong.";
      toast(userMessage);
      setStage(navigation[stage].next);
    } catch (error) {
      console.log(error);
    }
  };

  const registerUserRequest = async () => {
    const carpoolRequestBody = {
      token: localStorage.getItem("p2puserToken"),
      email: email,
      date: new Date(
        new Date(selectedDate).setFullYear(new Date().getFullYear())
      ).toLocaleDateString("en-GB"),
      time: selectedTime,
      noOfPassengers: numberOfPeople,
      noOfTrolleys: numberOfTrolleys,
      startLocation: source,
      endLocation: destination,
    };

    try {
      const response = await axios.put(
        baseApiUrl + ENDPOINTS.POST_CarPoolRequest,
        carpoolRequestBody
      );
      mixpanel.track(MixpanelEvents.USER_COMPLETED_REQUEST, {
        service: service,
      });
      const { errorCode } = response.data;
      const userMessage =
        errorCode === "0"
          ? "Succesfully raised a carpool request"
          : errorCode === "467"
          ? "Error: Request for this user already exists"
          : "Error: Oops, something went wrong.";
      toast(userMessage);
      setStage(navigation[stage].next);
    } catch (error) {
      console.error("Error during token generation:", error);
    }
  };

  return (
    <RegistrationContext.Provider
      value={{
        numberOfPeople,
        setNumberOfPeople,
        numberOfTrolleys,
        setNumberOfTrolleys,
        handleDateChange,
        handleTimeChange,
        handleNext,
        handlePrev,
        onLookingForChange,
        user,
        setUser,
        stage,
        setStage,
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        lookingFor,
        setLookingFor,
        service,
        setService,
        name,
        setName,
        email,
        setEmail,
        picture,
        setPicture,
        givenName,
        setGivenName,
        source,
        setSource,
        destination,
        setDestination,
        requireDriver,
        setRequireDriver,
        phoneNumber,
        setPhoneNumber,
        contactConsent,
        setContactConsent,
        userToken,
        setUserToken,
        matchedUsers,
        setMatchedUsers,
        isUserEligibleForRequests,
        setIsUserEligibleForRequests,
      }}
    >
      {children}
      <Toaster />
    </RegistrationContext.Provider>
  );
};

export default P2PRegistrationContext;
export { RegistrationContext };
